import React from "react";

const AllChannels = () => {
  const featuredTopics = [
    "Finance v. Tech Careers",
    "Getting into Finance",
    "Interview Tips",
    "Management Consulting Careers",
    "Working at Amazon",
    "Working at Google",
  ];

  const blogPosts = [
    {
      image: "https://via.placeholder.com/100",
      topic: "How to Succeed in Tech Careers",
      writer: "Jane Doe",
    },
    {
      image: "https://via.placeholder.com/100",
      topic: "Financial Strategies for Newcomers",
      writer: "John Smith",
    },
    {
      image: "https://via.placeholder.com/100",
      topic: "Consulting for Beginners",
      writer: "Mary Johnson",
    },
    {
      image: "https://via.placeholder.com/100",
      topic: "Consulting for Beginners",
      writer: "Mary Johnson",
    },
    {
      image: "https://via.placeholder.com/100",
      topic: "Consulting for Beginners",
      writer: "Mary Johnson",
    },
    {
      image: "https://via.placeholder.com/100",
      topic: "Consulting for Beginners",
      writer: "Mary Johnson",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 mb-28 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Featured Topics</h2>
        <div className="flex justify-between mt-4">
          <ul className="list-disc pl-6 space-y-2 w-1/2">
            {featuredTopics.slice(0, 3).map((topic, index) => (
              <li key={index} className="text-lg">
                {topic}
              </li>
            ))}
          </ul>

          <ul className="list-disc pl-6 space-y-2 w-1/2">
            {featuredTopics.slice(3).map((topic, index) => (
              <li key={index} className="text-lg">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <div className="mt-4 space-y-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border p-4 rounded-lg shadow-sm"
            >
              <img
                src={post.image}
                alt={post.topic}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">{post.topic}</h3>
                <p className="text-gray-500">by {post.writer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllChannels;
