import {
  Award,
  Building2Icon,
  Flame,
  GalleryVerticalEndIcon,
  Shapes,
  Vote,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const LeftBar = () => {

  const [selectedLink, setSelectedLink] = useState("/feed"); 

  const upperLinks = [
    { name: "Feed", to: "/feed", icon: <GalleryVerticalEndIcon /> },
    { name: "My College", to: "/mycollege", icon: <Building2Icon /> },
    { name: "Polls", to: "/polls", icon: <Vote /> },
    { name: "Trending", to: "/trending", icon: <Flame /> },
    { name: "All Channels", to: "/channels", icon: <Shapes /> },
    { name: "Featured Content", to: "/featuredcontent", icon: <Award /> },
  ];

  const lowerSections = [
    {
      title: "INDUSTRIES",
      links: [
        { name: "Tech", to: "/industries/Tech" },
        { name: "Healthcare", to: "/industries/Health" },
        { name: "Cars", to: "/industries/Cars" },
      ],
    },
    {
      title: "JOB GROUPS",
      links: [
        { name: "Software Engineering", to: "/job-groups/software" },
        { name: "Product Management", to: "/job-groups/product" },
        { name: "Finance", to: "/job-groups/finance" },
      ],
    },
    {
      title: "GENERAL TOPICS",
      links: [
        { name: "Stock & Investment", to: "/general/stock-investment" },
        { name: "Artificial Intelligence", to: "/general/ai" },
        { name: "Politics", to: "/general/politics" },
      ],
    },
    {
      title: "USER LIKELY",
      links: [
        { name: "Daily Workout", to: "/user-likely/workout" },
        { name: "LGBTQ+", to: "/user-likely/lgbtq" },
        { name: "Elon Musk", to: "/user-likely/elon-musk" },
        { name: "Show more...", to: "/general/more" },
        { name: "Show more...", to: "/general/more" },
      ],
    },
  ];

  const handleLinkClick = (to) => {
    setSelectedLink(to);
  };

  return (
    <div className="h-full flex flex-col p-4 w-full">
      <ul className="space-y-4">
        {upperLinks.map((section, index) => (
          <li
            key={index}
            onClick={() => handleLinkClick(section.to)}
            className={`text-gray-700 w-full cursor-pointer hover:bg-slate-200 p-1 rounded-md flex ${
              selectedLink === section.to
                ? "bg-slate-200 text-black"
                : "text-gray-700"
            }`}
          >
            {section.icon}
            <Link className="ml-2 w-full" to={section.to}>
              {section.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="border border-solid border-stone-300 mt-3" />

      <ul className="space-y-4 overflow-y-scroll custom-scrollbar h-full mt-1">
        {lowerSections.map((section, index) => (
          <li
            key={index}
            className="text-gray-700 hover:text-black flex flex-col justify-center"
          >
            <div className="text-xl p-1">{section.title}</div>
            {section.links.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                to={link.to}
                className={`p-1 hover:bg-slate-200 ${
                  selectedLink === link.to
                    ? "bg-slate-200 text-black rounded-md"
                    : "text-gray-700"
                }`}
                onClick={() => handleLinkClick(link.to)}
              >
                {link.name}
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftBar;
