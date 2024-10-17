import mongoose from "mongoose";
import { Post } from "../model/PostSchema.js";
import { User } from "../model/User.js";

export const createPost = async (req, res) => {
  const { userId, section, topic, content } = req.body;

  try {
    const user = await User.findById(userId);
    console.log("this is post user", user);
    if (!user || !user.isVerified) {
      return res.status(403).json({ message: "User not verified" });
    }

    const post = new Post({
      user: user._id,
      section,
      topic,
      content,
    });
    console.log(post);
    await post.save();
    res.status(201).json({
      message: "Post created successfully!",
      post,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const AllPost = await Post.find().populate("user").sort({ createdAt: -1 });
    res.status(200).json(AllPost);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getUserPost = async (req, res) => {
  const { userId } = req.params;

  try {
    const userPosts = await Post.find({ user: userId })
      .populate("user")
      .sort({ createdAt: -1 });

    if (!userPosts.length) {
      return res.status(404).json({ message: "No Posts Available! Post Now." });
    }

    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const getSectionPosts = async (req, res) => {
  const { section } = req.params;

  try {
    const specificSectionPosts = await Post.find({ section })
      .populate("user")
      .sort({ createdAt: -1 });

    if (!specificSectionPosts.length) {
      return res.status(404).json({
        message: `No posts found for user in the ${section} section`,
      });
    }

    res.status(200).json(specificSectionPosts);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const like = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });

    req.io.emit("postLiked", post); 

    res.status(200).json({ message: "Post liked!", post });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const comment = async (req, res) => {
    const { postId } = req.params;
    console.log(postId);
   const { userId, comment } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: userId, comment });
    await post.save();

    req.io.emit("commentAdded", post);

    res.status(200).json({ message: "Comment added!", post });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
