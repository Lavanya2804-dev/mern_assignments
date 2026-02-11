import {UserTypeModel} from "../models/UserModel.js";
export const checkAuthor=async(req,res,next)=>{
    //get author id
    let aid = req.body?.author ||req.params.authorId;
    //verify author
    let author=await UserTypeModel.findById(aid)
    if(!author)
    {
        return res.status(401).json({message:"invalid author"})
    }
    //if author found but role is different
    if(author.role!=='AUTHOR'){
        return res.status(403).json({message:"user is not an author"});
    }
    //if author is blocked
    if(!author.isActive){
        return res.status(403).json({message:"author is not exist"})
    }
    next();
}


export const checkUser = async (req, res, next) => {
    //get author id
  let uid = req.body?.user ||req.params.userId;

  let user = await UserTypeModel.findById(uid);

  if (!user) {
    return res.status(401).json({ message: "invalid user" });
  }

  if (user.role !== "USER") {
    return res.status(403).json({ message: "not a user" });
  }

  if (!user.isActive) {
    return res.status(403).json({ message: "user inactive" });
  }

  next();
};
