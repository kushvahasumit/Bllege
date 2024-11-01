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
      image:
        "https://plus.unsplash.com/premium_photo-1682434403587-1313db01ed02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3N8ZW58MHx8MHx8fDA%3D",
      topic: "Story of my college life",
      writer: "Siddhant Khare",
      url: "https://siddhantkhare2694.medium.com/story-of-my-college-life-f7a5f4f5c4cf",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1681755915233-9acafb348a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxvZ3N8ZW58MHx8MHx8fDA%3D",
      topic: "How to Start a Career in Tech: A Complete Guide",
      writer: "Verve AI Interview Copilot",
      url: "https://medium.com/@verveaicopilot/how-to-start-a-career-in-tech-a-complete-guide-56271f04e855",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmluYW5jaWFsJTIwcGxhbnxlbnwwfHwwfHx8MA%3D%3D",
      topic: "Beginner’s Guide for A Proper Financial Plan",
      writer: "Bianca Adriennawati",
      url: "https://medium.com/life-at-tokopedia/beginners-guide-for-a-proper-financial-plan-ad70c3002457",
    },
    {
      image:
        "https://images.unsplash.com/photo-1468971050039-be99497410af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGpvYnMlMjBnb3Zlcm1lbnR8ZW58MHx8MHx8fDA%3D",
      topic: "Government Job Preparation in India",
      writer: "Blogger Pratham",
      url: "https://bloggerpratham.medium.com/government-job-preparation-in-india-20355711c000",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1682097238346-3f2a677ccfe6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJteXxlbnwwfHwwfHx8MA%3D%3D",
      topic: "Indian army is not just a career; it’s a way of life",
      writer: "MunnaPraWiN",
      url: "https://munna-prawin.medium.com/indian-army-is-not-just-a-career-its-a-way-of-life-59706f8d3475",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1681487464375-7cde580bf4ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      topic: "The authoritative guide to blockchain development",
      writer: "Haseeb Qureshi",
      url: "https://medium.com/free-code-camp/the-authoritative-guide-to-blockchain-development-855ab65b58bc",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1661371241897-3202947ace30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      topic: "Intraday market strategy for Indian Stock Market",
      writer: "Pawan Reddy Ulindala",
      url: "https://medium.com/@pawanreddy_u/intraday-market-strategy-for-indian-stock-market-7de767be95fb",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1689607810126-68dc3eed28f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D",
      topic: "Why Big Boss is a genius concept",
      writer: "Nishi",
      url: "https://medium.com/@nishi96.ti/why-big-boss-is-a-genius-concept-bae4a334887d",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1681755915233-9acafb348a7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxvZ3N8ZW58MHx8MHx8fDA%3D",
      topic: "The Psychology of Standup Comedy",
      writer: "Bency Goldman",
      url: "https://bency-goldman.medium.com/on-comedy-86df97903b36",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 mb-28 overflow-y-auto h-[calc(100vh-100px)] custom-scrollbar">
      <div className="mt-6 p-4 border rounded-lg">
        <h2 className="text-2xl font-bold">Featured Topics</h2>
        <div className="flex justify-between mt-4 ">
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
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 border p-4 rounded-lg shadow-sm transition-transform duration-200 transform hover:scale-100"
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllChannels;
