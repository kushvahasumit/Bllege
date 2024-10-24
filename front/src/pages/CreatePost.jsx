import React, { useState } from "react";
import { usePostStore } from "../store/postStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [section, setSection] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const { createPost } = usePostStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  console.log("this is post userid", user._id);

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
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg h-[calc(100vh-50px)] overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-semibold mb- text-center">
          Create a Blind Post
        </h2>

        <div className="flex justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500 pl-1">
              I am <strong>{user.name}</strong>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 pr-1">
              Anonymous User from{" "}
              <strong>{user?.college || "Unknown College"}</strong>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="section"
              className="block font-medium text-gray-700 mb-2"
            >
              Section
            </label>
            <select
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 max-h-12 overflow-y-auto"
              style={{ maxHeight: "150px", overflowY: "auto" }}
              required
            >
              <option value="">Select Section</option>
              <option value="Tech">Tech</option>
              <option value="Cars">Cars</option>
              <option value="HR">HR</option>
              <option value="E-Commerce">Ecom</option>
              <option value="AI-Trends">AI Trends</option>
              <option value="Start-Ups">Startups</option>
              <option value="Health">Health</option>
              <option value="User-Likely">User Likely</option>
            </select>
          </div>

          <div className="mb-2">
            <label
              htmlFor="topic"
              className="block font-medium text-gray-700 mb-2"
            >
              Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Enter the post topic"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="content"
              className="block font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 border border-gray-300 rounded-lg p-3"
              placeholder="Write your post content here"
              autoComplete="off"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lostSouls text-white rounded-lg py-3 px-6 mb-20"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
