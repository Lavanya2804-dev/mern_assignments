import exp from 'express';
import { register } from "../services/authServices.js";
export const userRoute=exp.Router();
import {ArticleModel} from "../models/ArticleModel.js";
import { checkUser } from "../middlewares/checkAuthor.js";
import { verifyToken } from "../middlewares/verifyTokens.js";
import upload from "../config/multer.js";
import {uploadToCloudinary} from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js"

//register user
userRoute.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );
//read all user
// View all active articles
// View all articles written by authors
userRoute.get("/articles",async (req, res) => {
    const articles = await ArticleModel
      .find({ isArticleActive: true })
      .populate("author", "firstName email")
       .populate("comments.user", "firstName role");

    res.status(200).json({
      message: "articles found",
      payload: articles
    });
  }
);



// Add comment to an article
// User adds comment under an article

userRoute.put("/articles", async (req, res) => {
  const { articleId, comment } = req.body;
  const user = req.user.userId;

  let articleWithComment = await ArticleModel.findOneAndUpdate(
    { _id: articleId, isArticleActive: true },
    { $push: { comments: { user, comment } } },
    { new: true, runValidators: true }
  ).populate("comments.user", "firstName role"); // 🔥 IMPORTANT

  if (!articleWithComment) {
    return res.status(404).json({ message: "article not found" });
  }

  const newComment =
    articleWithComment.comments[articleWithComment.comments.length - 1];

  res.status(200).json({
    message: "comment added successfully",
    payload: newComment   // ✅ SEND THIS
  });
});

// ✅ GET SINGLE ARTICLE BY ID (VERY IMPORTANT)
userRoute.get("/article/:id", verifyToken("USER"), async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id)
      .populate("author", "firstName email")
      .populate("comments.user", "firstName role"); // 🔥 THIS FIXES YOUR UI

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({
      message: "article found",
      payload: article
    });

  } catch (err) {
    res.status(500).json({ message: "error", payload: err.message });
  }
});