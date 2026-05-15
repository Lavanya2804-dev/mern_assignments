import exp from "express";
import { register } from "../services/authServices.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { checkAuthor } from "../middlewares/checkAuthor.js";
import { verifyToken } from "../middlewares/verifyTokens.js";
import upload from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

export const authorRoute = exp.Router();

//Register author(public)
authorRoute.post(
  "/users",
  upload.single("profileImageUrl"), // ✅ ADD THIS
  async (req, res, next) => {
    let cloudinaryResult;

    try {
      let userObj = req.body;

      console.log("BODY:", req.body);   // 🔍 debug
      console.log("FILE:", req.file);   // 🔍 debug

      // upload image
      if (req.file) {
        cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      }

      const newUserObj = await register({
        ...userObj,
        role: "AUTHOR",
        profileImageUrl: cloudinaryResult?.secure_url,
      });

      res.status(201).json({
        message: "author created",
        payload: newUserObj,
      });

    } catch (err) {
      // rollback
      if (cloudinaryResult?.public_id) {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      }

      next(err);
    }
  }
);
//Create article(protected route)
authorRoute.post("/articles", verifyToken("AUTHOR"), async (req, res) => {
  //get article from req
  let article = req.body;

  //create article document
  let newArticleDoc = new ArticleModel(article);
  //save
  let createdArticleDoc = await newArticleDoc.save();
  //send res
  res.status(201).json({ message: "article created", payload: createdArticleDoc });
});

//Read artiles of author(protected route)
authorRoute.get("/articles/:authorId", verifyToken("AUTHOR"), async (req, res) => {
  //get author id
  let aid = req.params.authorId;

  //read atricles by this author which are acticve
  let articles = await ArticleModel.find({ author: aid, isArticleActive: true }).populate("author", "firstName email") .populate("comments.user", "firstName role").populate("comments.replies.user", "firstName role");
  //send res
  res.status(200).json({ message: "articles", payload: articles });
});

//edit article(protected route)
authorRoute.put("/articles/:id", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content } = req.body;

    const article = await ArticleModel.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // ensure author edits only their own article
    if (article.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Forbidden. You can only edit your own articles",
      });
    }

    article.title = title;
    article.category = category;
    article.content = content;

    await article.save();

    res.status(200).json({
      message: "article updated",
      payload: article,
    });

  } catch (err) {
    res.status(500).json({ message: "update failed" });
  }
});

// add comment to article
authorRoute.post(
  "/comment/:articleId",
  verifyToken("AUTHOR"),
  async (req, res) => {
    try {
      const article = await ArticleModel.findByIdAndUpdate(
        req.params.articleId,
        {
          $push: {
            comments: {
              user: req.user.userId,
              comment: req.body.comment
            }
          }
        },
        { new: true }
      ).populate("comments.user", "firstName role"); // ✅ FIX

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      const latestComment =
        article.comments[article.comments.length - 1];

      res.status(200).json({
        message: "comment added",
        payload: latestComment
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// DELETE comment
authorRoute.delete(
  "/comment/:articleId/:commentId",
  verifyToken("AUTHOR", "USER", "ADMIN"),
  async (req, res) => {
    try {
      const { articleId, commentId } = req.params;

      const article = await ArticleModel.findById(articleId);

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      // find comment
      const comment = article.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // 🔐 permission check
      if (
        comment.user.toString() !== req.user.userId &&
        article.author.toString() !== req.user.userId
      ) {
        return res.status(403).json({
          message: "You can delete only your comment",
        });
      }

      // 🧹 remove comment
      comment.deleteOne();

      await article.save();

      res.status(200).json({
        message: "comment deleted",
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// EDIT comment
authorRoute.put(
  "/comment/:articleId/:commentId",
  verifyToken("AUTHOR", "USER", "ADMIN"),
  async (req, res) => {
    try {
      const { articleId, commentId } = req.params;

      const article = await ArticleModel.findById(articleId);

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      const comment = article.comments.id(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // 🔐 only owner can edit
      if (comment.user.toString() !== req.user.userId) {
        return res.status(403).json({
          message: "You can edit only your comment",
        });
      }

      comment.comment = req.body.comment;

      await article.save();

      res.status(200).json({
        message: "comment updated",
        payload: comment,
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

authorRoute.post(
  "/reply/:articleId/:commentId",
  verifyToken("AUTHOR", "USER", "ADMIN"),
  async (req, res) => {
    try {
      const { articleId, commentId } = req.params;

      const article = await ArticleModel.findById(articleId);

      const comment = article.comments.id(commentId);

      comment.replies.push({
        user: req.user.userId,
        comment: req.body.comment,
      });

      await article.save();

      res.status(200).json({
        message: "reply added",
        payload: comment.replies[comment.replies.length - 1],
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

authorRoute.patch(
  "/articles/:articleId/status",
  verifyToken("AUTHOR"),
  async (req, res) => {

    try {

      const { articleId } = req.params;

      const article = await ArticleModel.findById(articleId);

      if (!article) {
        return res.status(404).json({
          message: "Article not found",
        });
      }

      // allow only owner
      if (article.author.toString() !== req.user.userId) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }

      article.isArticleActive = false;

      await article.save();

      res.status(200).json({
        message: "Article deleted",
        payload: article,
      });

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }
  }
);