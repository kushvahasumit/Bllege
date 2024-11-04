import React from "react";

const Trends = () => {
  // Sample trending topics
  const trendingTopics = [
    { id: 1, topic: "#TechInternships", popularity: 95 },
    { id: 2, topic: "#RemoteLearning", popularity: 80 },
    { id: 3, topic: "#AIInEducation", popularity: 90 },
    { id: 4, topic: "#JobFair2024", popularity: 85 },
    { id: 5, topic: "#CodingBootcamps", popularity: 75 },
  ];

  return (
    <div className="p-4 md:p-8 mt-6 mb-16 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
      <div
        className="relative w-full h-[40vh] bg-cover bg-center mb-4"
        style={{
          backgroundImage:
            'url("https://media.istockphoto.com/id/1016963808/photo/customer-service-evaluation-concept.jpg?s=612x612&w=0&k=20&c=7rkm88NWs6-iyRGPIcFNGTMICMGyPUD111YOdKe5gao=")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <h1 className="relative px-4 z-10 text-5xl font-bold text-white pt-10">
          Stay Ahead of the Curve —
        </h1>
        <h2 className="relative px-4 z-10 text-xl font-bold text-white pt-2">
          Discover the Latest Trends in College Life and Career Opportunities!
        </h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl text-lostSouls font-semibold mb-4">Trending Topics</h3>
        <ul className="space-y-2">
          {trendingTopics.map((topic) => (
            <li
              key={topic.id}
              className="flex justify-between items-center p-2 border-b border-gray-200"
            >
              <span className="text-lg font-medium">{topic.topic}</span>
              <span className="text-gray-500">
                {topic.popularity}% Popularity
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-lostSouls">Recent Discussions</h3>
        <p className="text-gray-700">
          Stay tuned for the latest discussions happening in your college
          community! join your college chat room for Anonymous talks and
          gossip...
        </p>
      </div>
    </div>
  );
};

export default Trends;
