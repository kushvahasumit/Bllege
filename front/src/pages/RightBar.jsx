import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RightBar = () => {
  const sponsored = [
    { title: "H&M", to: "/sponsored/h&m" },
    { title: "Jio Career", to: "/sponsored/jio" },
    { title: "Amazon", to: "/sponsored/amazon" },
    { title: "Google", to: "/sponsored/amazon" },
    { title: "Cars24", to: "/sponsored/amazon" },
    { title: "Woodland", to: "/sponsored/amazon" },
  ];

  const featuredContent = [
    { title: "Tech Innovations", to: "/featuredcontent" },
    { title: "Healthcare Revolution", to: "/featuredcontent" },
    { title: "E-Commerce Boom", to: "/featuredcontent" },
    { title: "AI Trends", to: "/featuredcontent" },
    { title: "Finance & Investment", to: "/featuredcontent" },
    { title: "Startups to Watch", to: "/featuredcontent" },
  ];

//   const [randomContent, setRandomContent] = useState([]);

//   useEffect(() => {
//     const shuffledContent = [...featuredContent].sort(
//       () => 0.5 - Math.random()
//     );
//     setRandomContent(shuffledContent.slice(0, 4));
//   }, []);

  const mostRead = [
    { title: "is IITian are good at DSA?", to: "/Blind-Thoughts/Tech" },
    {
      title: "Healthcare Revolution is a next wonderfull thing in US",
      to: "/Blind-Thoughts/Health",
    },
    {
      title: "in next 5 year E-Commerce Boom at 50%",
      to: "/Blind-Thoughts/E-Commerce",
    },
    { title: "AI Trends is hot now a days", to: "/Blind-Thoughts/AI-Trends" },
    { title: "Best startup for Placements?", to: "/Blind-Thoughts/startups" },
  ];

  const footerLinks = [
    { label: "Why Bllege", to: "/why-bllege-blog-carrer-news-faq" },
    { label: "Blog", to: "/why-bllege-blog-carrer-news-faq" },
    { label: "Career", to: "/why-bllege-blog-carrer-news-faq" },
    { label: "Terms", to: "/why-bllege-blog-carrer-news-faq" },
    { label: "Newsroom", to: "/why-bllege-blog-carrer-news-faq" },
    { label: "Updates", to: "/updates" },
    { label: "Privacy", to: "/why-bllege-blog-carrer-news-faq" },
    { label: "Community", to: "/why-bllege-blog-carrer-news-faq" },
    { label: "FAQs", to: "/why-bllege-blog-carrer-news-faq" },
  ];

  return (
    <div className="h-full w-full flex flex-col p-4  space-y-4 overflow-y-scroll custom-scrollbar mt-1">
      <div className="flex justify-between space-x-0 border border-stone-300 rounded-2xl h-full p-2">
        
        <ul className="">
          <h1 className="text-xl pl-1">Our Sponsored</h1>
          {sponsored &&
            sponsored.slice(0, 3).map((value, index) => (
              <li key={index} className="text-gray-700 hover:text-black p-1">
                <p>{value.title}</p>
              </li>
            ))}
        </ul>
        {/* <ul>
          {sponsored &&
            sponsored.slice(3).map((value, index) => (
              <li key={index} className="text-gray-700 hover:text-black p-1">
                <p>{value.title}</p>
              </li>
            ))}
        </ul> */}
      </div>

      <ul className="space-x-0 mt-3 border border-stone-300 rounded-2xl h-full p-2">
        <h2 className="text-xl p-1">Featured Content</h2>
        {featuredContent &&
          featuredContent.slice(0,4).map((content, index) => (
            <li key={index} className="text-gray-700 hover:text-black p-1">
              <Link to={content.to}>{content.title}</Link>
            </li>
          ))}
      </ul>

      <ul className="space-x-0 mt-3 border border-stone-300 rounded-2xl h-full p-2">
        <h2 className="text-xl p-1">Blind Thoughts</h2>
        {mostRead &&
          mostRead.map((content, index) => (
            <li key={index} className="text-gray-700 hover:text-black p-1">
              <Link to={content.to}>{content.title}</Link>
            </li>
          ))}
      </ul>

      <div className=" text-gray-600">
        {footerLinks.map((link, index) => (
          <span key={index}>
            <Link to={link.to} className="text-sm  hover:text-black">
              {link.label}
            </Link>
            {index < footerLinks.length - 1 && " · "}
          </span>
        ))}
        <p className="mt-2 mb-16">
          2024 Team <strong className="text-lostSouls">Bllege</strong> inc.
        </p>
      </div>
    </div>
  );
};

export default RightBar;
