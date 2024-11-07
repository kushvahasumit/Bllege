import React, { useState } from "react";
import { usePostStore } from "../store/postStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [section, setSection] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [isPoll, setIsPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([
    { optionText: "", votes: 0 },
    { optionText: "", votes: 0 },
  ]);

  const { createPost } = usePostStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsPoll((prev) => !prev);
    setTopic("");
    setContent("");
    setPollQuestion("");
    setPollOptions([
      { optionText: "", votes: 0 },
      { optionText: "", votes: 0 },
    ]);
  };

  const handleAddOption = () => {
    setPollOptions([...pollOptions, { optionText: "", votes: 0 }]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index].optionText = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPoll) {
      if (
        !section ||
        !pollQuestion ||
        pollOptions.some((opt) => !opt.optionText)
      ) {
        alert("Please fill in all fields for the poll.");
        return;
      }
    } else {
      if (!section || !topic || !content) {
        alert("Please fill in all fields for the post.");
        return;
      }
    }

    try {
      const postData = {
        userId: user._id,
        section,
        isPoll,
        pollQuestion,
        pollOptions,
        topic,
        content,
      };

      await createPost(postData);
      navigate("/feed");
    } catch (error) {
      alert("Error creating post");
    }
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = pollOptions.filter((_, i) => i !== index);
    setPollOptions(updatedOptions);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl p-4 bg-white shadow-lg rounded-lg h-[calc(100vh-50px)] overflow-y-auto custom-scrollbar">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {isPoll ? "Create a Bllege Poll" : "Create a Bllege Post"}
        </h2>

        <div className="flex justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500 pl-1">
              I am{" "}
              <strong className="text-lostSouls text-xl">{user.name}</strong>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 pr-1">
              Anonymous User from{" "}
              <strong className="text-lostSouls text-xl">
                {user?.college || "Unknown College"}
              </strong>
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <button
            onClick={handleToggle}
            className={`px-6 py-2 rounded-l-lg ${
              !isPoll ? "bg-lostSouls text-white" : "bg-slate-200"
            }`}
          >
            Post
          </button>
          <button
            onClick={handleToggle}
            className={`px-6 py-2 rounded-r-lg ${
              isPoll ? "bg-lostSouls text-white" : "bg-slate-200"
            }`}
          >
            Poll
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-20">
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
              className="w-full border border-gray-300 rounded-lg p-3"
              required
            >
              <option value="">Select Section</option>
              <option value="Tech">Tech</option>
              <option value="Cars">Cars</option>
              <option value="College">College</option>
              <option value="AI-Trends">AI Trends</option>
              <option value="Start-Ups">Start-Ups</option>
              <option value="Software-Engineering">Software Engineering</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Stock-Investment">Stock & Investment</option>
              <option value="Artificial-Intelligence">
                Artificial Intelligence
              </option>
              <option value="Politics">Politics</option>
              <option value="LGBTQ+">LGBTQ+</option>
              <option value="Elon-Musk">Elon Musk</option>
            </select>
          </div>

          {!isPoll ? (
            <>
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
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-2">
                <label
                  htmlFor="pollQuestion"
                  className="block font-medium text-gray-700 mb-2"
                >
                  Poll Question
                </label>
                <input
                  id="pollQuestion"
                  type="text"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Enter the poll question"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium text-gray-700 mb-2">
                  Poll Options
                </label>
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={option.optionText}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-3"
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="ml-2 text-lostSouls hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="text-lostSouls text-sm mt-2 hover:underline"
                >
                  + Add another option
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-lostSouls text-white rounded-lg py-3 px-6 mt-4 hover:bg-opacity-90"
          >
            {isPoll ? "Create Poll" : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
