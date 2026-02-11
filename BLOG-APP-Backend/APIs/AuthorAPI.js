import exp from 'express'
import { register} from "../services/authServices.js";
export const authorRoute=exp.Router();
import {UserTypeModel} from "../models/UserModel.js";
import {ArticleModel} from "../models/ArticleModel.js";
import { checkAuthor } from "../middlewares/checkAuthor.js";
import { verifyToken } from "../middlewares/verifyTokens.js";

//resigter Author(public)
authorRoute.post('/author',async(req,res)=>{
    //get user obj from req
    let userObj=req.body;
    //call register
    const newUserObj=await register({...userObj,role:"AUTHOR"})
    //send res
    res.status(201).json({message:"author created",payload:newUserObj})
    //
})
//create article(protected)
authorRoute.post('/articles',verifyToken,checkAuthor,async(req,res)=>{
    //get article from req
    let article = req.body
    //check for the author
let author =await UserTypeModel.findById(article.author)
if(!author|| author.role!=="AUTHOR") {
    return res.status(401).json({message:"Invalid doc"})
}
    //create article document
let newArticleDoc=new ArticleModel(article)
    //save
    let createdArticleDoc=await newArticleDoc.save()
    //send res
    return res.status(201).json({message:"article created",payload:createdArticleDoc})
})
//read articles of author(protected)
authorRoute.get("/articles/:authorId",verifyToken,checkAuthor,async(req,res)=>{
    //get author Id
     let aid = req.params.authorId;
    //read articles by this author
    let articles=await ArticleModel.find({author:aid,isArticleActive:true}).populate("author","firstName email")
    //send res
    res.status(200).json({message:"article found",payload:articles});
})
//edit article(producted)
authorRoute.put("/articles/:authorId",verifyToken,checkAuthor,async(req,res)=>{
    //get modified article from req
    let {articleId,title,category,content,author}=req.body;
    //find article
    let articleOfDB=await ArticleModel.findOne({_id:articleId,author:author})
    if(!articleOfDB){
        return res.status(401).json({message:"Article not found"})
    }
   
    //update the article
    let updatedArticle =await ArticleModel.findByIdAndUpdate(articleId,
    {
        $set:{title,category,content},
    },
    {new:true},
    );
    //send res
    return res.status(200).json({message:"arcle updated",payload:updatedArticle})
})

//delete (soft delete)articles(protected)
authorRoute.delete(
  "/articles/:articleId",
  verifyToken,
  async (req, res) => {
    const { articleId } = req.params;
    const authorId = req.user.id;

    // allow only AUTHOR
    if (req.user.role !== "AUTHOR") {
      return res.status(403).json({
        message: "only authors can delete articles"
      });
    }

    // find article owned by author
    const article = await ArticleModel.findOne({
      _id: articleId,
      author: authorId,
      isArticleActive: true
    });

    if (!article) {
      return res.status(404).json({
        message: "article not found or not owned by you"
      });
    }

    // soft delete
    article.isArticleActive = false;
    await article.save();

    //fetch remaining articles of this author
    const remainingArticles = await ArticleModel.find({
      author: authorId,
      isArticleActive: true
    });

    res.status(200).json({
      message: "article deleted successfully",
      payload: remainingArticles
    });
  }
);
