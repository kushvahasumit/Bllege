import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RightBar = () => {
  const sponsored = [
    { title: "H&M", to: "/sponsored/h&m" },
    { title: "Jio Career", to: "/sponsored/jio" },
    { title: "Amazon", to: "/sponsored/amazon" },
  ];

  const featuredContent = [
    { title: "Tech Innovations", to: "/featured/tech-innovations" },
    { title: "Healthcare Revolution", to: "/featured/healthcare-revolution" },
    { title: "E-Commerce Boom", to: "/featured/ecommerce-boom" },
    { title: "AI Trends", to: "/featured/ai-trends" },
    { title: "Finance & Investment", to: "/featured/finance-investment" },
    { title: "Startups to Watch", to: "/featured/startups" },
  ];

//   const [randomContent, setRandomContent] = useState([]);

//   useEffect(() => {
//     const shuffledContent = [...featuredContent].sort(
//       () => 0.5 - Math.random()
//     );
//     setRandomContent(shuffledContent.slice(0, 4));
//   }, []);

  const mostRead = [
    { title: "is IITian are good at DSA?", to: "/featured/tech-innovations" },
    { title: "Healthcare Revolution is a next wonderfull thing in US", to: "/featured/healthcare-revolution" },
    { title: "in next 5 year E-Commerce Boom at 50%", to: "/featured/ecommerce-boom" },
    { title: "AI Trends is hot now a days", to: "/featured/ai-trends" },
    { title: "Best startup for Placements?", to: "/featured/startups" },
  ];

  const footerLinks = [
    { label: "Why College", to: "/why-college" },
    { label: "Blog", to: "/blog" },
    { label: "Career", to: "/career" },
    { label: "Terms", to: "/terms" },
    { label: "Newsroom", to: "/newsroom" },
    { label: "Updates", to: "/updates" },
    { label: "Privacy", to: "/privacy" },
    { label: "Community", to: "/community" },
    { label: "FAQs", to: "/faq" },
  ];

  return (
    <div className="h-full w-full flex flex-col p-4  space-y-4 overflow-y-scroll custom-scrollbar mt-1">
      <ul className="space-x-0 border border-stone-300 rounded-2xl h-full p-2">
        <h1 className="text-xl pl-1">Our Sponsored</h1>
        {sponsored &&
          sponsored.map((value, index) => (
            <li key={index} className="text-gray-700 hover:text-black p-1">
              <Link to={value.to}>{value.title}</Link>
            </li>
          ))}
      </ul>

      <ul className="space-x-0 mt-3 border border-stone-300 rounded-2xl h-full p-2">
        <h2 className="text-xl p-1">Featured Content</h2>
        {featuredContent &&
          featuredContent.map((content, index) => (
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

      <div className=" pt-3 text-gray-600">
        {footerLinks.map((link, index) => (
          <span key={index}>
            <Link to={link.to} className="text-sm  hover:text-black">
              {link.label}
            </Link>
            {index < footerLinks.length - 1 && " · "}
          </span>
        ))}
        <p className="mt-2 mb-10">
        2024 Team <strong className="text-lostSouls">Bllege</strong> inc.
      </p>
      </div>
    </div>
  );
};

export default RightBar;
