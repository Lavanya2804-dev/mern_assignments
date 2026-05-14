import { Schema, model } from "mongoose";

// ✅ reply schema
const replySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ comment schema (UPDATED)
const userCommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    comment: {
      type: String,
    },
    replies: [replySchema], // 👈 THIS IS THE KEY CHANGE
  },
  { timestamps: true }
);

// ✅ article schema
const articleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "author is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    comments: [userCommentSchema],
    isArticleActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    strict: "throw",
    versionKey: false,
  }
);

export const ArticleModel = model("article", articleSchema);