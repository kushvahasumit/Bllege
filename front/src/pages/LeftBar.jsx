import {
  Award,
  Building2Icon,
  Flame,
  GalleryVerticalEndIcon,
  Shapes,
  Vote,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useAuthStore } from "../store/authStore";

const LeftBar = () => {
  const {isAuthenticated} = useAuthStore();
  const [selectedLink, setSelectedLink] = useState("/feed");
   const navigate = useNavigate(); 

  const upperLinks = [
    { name: "Feed", to: "/feed", icon: <GalleryVerticalEndIcon /> },
    { name: "Polls", to: "/polls", icon: <Vote /> },
    { name: "Trending", to: "/trending", icon: <Flame /> },
    { name: "My College", to: "/mycollege", icon: <Building2Icon /> },
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
        {
          name: "Software-Engineering",
          to: "/job-groups/Software-Engineering",
        },
        { name: "Product-Management", to: "/job-groups/Product-Management" },
        { name: "Finance", to: "/job-groups/Finance" },
      ],
    },
    {
      title: "GENERAL TOPICS",
      links: [
        { name: "Stock-Investment", to: "/general/Stock-Investment" },
        {
          name: "Artificial-Intelligence",
          to: "/general/Artificial-Intelligence",
        },
        { name: "Politics", to: "/general/Politics" },
        { name: "College", to: "/general/College" },
      ],
    },
    {
      title: "USER LIKELY",
      links: [
        { name: "LGBTQ+", to: "/user-likely/LGBTQ+" },
        { name: "Elon-Musk", to: "/user-likely/Elon-Musk" },
        { name: "Show more...", to: "/general/more" },
        { name: "Show more...", to: "/general/more" },
      ],
    },
  ];

  const handleLinkClick = (to) => {
    if (to === "/mycollege" && !isAuthenticated) {
      navigate("/login");
    } else {
      setSelectedLink(to);
    }
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
