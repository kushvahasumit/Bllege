import React, { useState } from "react";
import { usePostStore } from "../store/postStore";
import {useAuthStore} from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [section, setSection] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const { createPost } = usePostStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  console.log("this is post userid", user._id)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!section || !topic || !content) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await createPost(user._id, section, topic, content);
      navigate("/feed");
    } catch (error) {
      alert("Error creating post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="section"
            className="block font-medium text-gray-700 mb-1"
          >
            Section
          </label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          >
            <option value="">Select Section</option>
            <option value="Tech">Tech</option>
            <option value="Cars">Cars</option>
            <option value="HR">HR</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="topic"
            className="block font-medium text-gray-700 mb-1"
          >
            Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter the post topic"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Write your post content here"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
