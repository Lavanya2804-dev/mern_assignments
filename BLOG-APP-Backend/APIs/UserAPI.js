import exp from 'express';
import { register } from "../services/authServices.js";
export const userRoute=exp.Router();
import {ArticleModel} from "../models/ArticleModel.js";
import { checkUser } from "../middlewares/checkAuthor.js";
import { verifyToken } from "../middlewares/verifyTokens.js";

//register user
userRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body;
    //call register
    const newUserObj=await register({...userObj,role:"USER"})
    //send res
    res.status(201).json({message:"user created",payload:newUserObj})
    //
})
//read all user
// View all active articles
// View all articles written by authors
userRoute.get("/articles",verifyToken,async (req, res) => {
    const articles = await ArticleModel
      .find({ isArticleActive: true })
      .populate("author", "firstName email");

    res.status(200).json({
      message: "articles found",
      payload: articles
    });
  }
);



// Add comment to an article
// User adds comment under an article
userRoute.post(
  "/articles/:articleId/comments",
  verifyToken,
  async (req, res) => {
    const { articleId } = req.params;
    const { comment } = req.body;

    // validation
    if (!comment || comment.trim() === "") {
      return res.status(400).json({
        message: "comment cannot be empty"
      });
    }

    // find active article
    const article = await ArticleModel.findOne({
      _id: articleId,
      isArticleActive: true
    });

    if (!article) {
      return res.status(404).json({
        message: "article not found"
      });
    }

    // add comment
    article.comments.push({
      user: req.user.id,   // from verifyToken
      comment: comment.trim()
    });

    await article.save();

    res.status(201).json({
      message: "comment added successfully"
    });
  }
);

//get article+comment
userRoute.get("/articles", verifyToken, async (req, res) => {
  const articles = await ArticleModel
    .find({ isArticleActive: true })
    .populate("author", "firstName email")
    .populate("comments.user", "firstName email");

  res.status(200).json({
    message: "articles found",
    payload: articles
  });
});
