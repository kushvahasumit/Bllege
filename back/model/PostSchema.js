import mongoose from "mongoose";

// const pollOptionSchema = new mongoose.Schema({
//   optionText: String,
//   votes: {
//     type: Number,
//     default: 0,
//   },
// });

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    section: {
      type: String,
      enum: [
        "Tech",
        "Cars",
        "HR",
        "Health",
        "AI-Trends",
        "Start-Ups",
        "User-Likely",
        "E-Commerce",
      ],
      required: true,
    },
    topic: {
      type: String,
      required: function () {
        return !this.isPoll;
      },
    },
    content: {
      type: String,
      required: function () {
        return !this.isPoll;
      },
    },

    isPoll: {
      type: Boolean,
      default: false,
    },

    pollQuestion: String,

    pollOptions: [
      {
        optionText: {
          type: String,
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],

    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        createdAt: { type: Date, default: Date.now },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
