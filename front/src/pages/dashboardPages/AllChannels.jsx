import React from "react";
import { usePostStore } from "../../store/postStore";

const AllChannels = () => {
  const { following, toggleFollow } = usePostStore();

  const lowerSections = [
    {
      title: "INDUSTRIES",
      links: [
        { name: "Tech", to: "/industries/Tech", id: "tech" },
        { name: "Healthcare", to: "/industries/Health", id: "healthcare" },
        { name: "Cars", to: "/industries/Cars", id: "cars" },
      ],
    },
    {
      title: "JOB GROUPS",
      links: [
        {
          name: "Software Engineering",
          to: "/job-groups/software",
          id: "software",
        },
        {
          name: "Product Management",
          to: "/job-groups/product",
          id: "product",
        },
        { name: "Finance", to: "/job-groups/finance", id: "finance" },
      ],
    },
    {
      title: "GENERAL TOPICS",
      links: [
        {
          name: "Stock & Investment",
          to: "/general/stock-investment",
          id: "stock",
        },
        { name: "Artificial Intelligence", to: "/general/ai", id: "ai" },
        { name: "Politics", to: "/general/politics", id: "politics" },
      ],
    },
    {
      title: "USER LIKELY",
      links: [
        { name: "Daily Workout", to: "/user-likely/workout", id: "workout" },
        { name: "LGBTQ+", to: "/user-likely/lgbtq", id: "lgbtq" },
        { name: "Elon Musk", to: "/user-likely/elon-musk", id: "elon" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 mb-16 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
      <h1 className="h-28 flex-col justify-center bg-teal-100 text-left text-3xl font-semibold mb-8">
        <strong className="mt-8">Discover and Follow Channels</strong>
        <p> You Can Tailor Your Home Feed To Align With Interests</p>
      </h1>

      {lowerSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-lg font-bold mb-4">{section.title}</h2>
          {section.links.map((link) => {
            const isFollowing =
              Array.isArray(following) && following.includes(link.id);

            return (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 border-b border-gray-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center"></div>
                  <div>
                    <h3 className="text-lg font-semibold">{link.name}</h3>
                    <p className="text-sm text-gray-500">{link.name.length} Followers</p>
                  </div>
                </div>

                <button
                  className={`py-2 px-4 rounded-2xl font-medium ${
                    isFollowing
                      ? "bg-red-300 text-black hover:bg-red-400"
                      : "bg-lostSouls text-white hover:bg-lostSouls"
                  }`}
                  onClick={() => toggleFollow(link.id)}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default AllChannels;
