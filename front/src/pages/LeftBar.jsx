import { Award, Building2Icon, Flame,GalleryVerticalEndIcon, Shapes, Vote } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import '../index.css';


const LeftBar = () => {
    const upperLinks = [
      { name: "Feed", to: "/feed", icon: <GalleryVerticalEndIcon /> },
      { name: "My College", to: "/my-college", icon: <Building2Icon /> },
      { name: "Polls", to: "/polls", icon: <Vote /> },
      { name: "All Channels", to: "/all-channels", icon: <Shapes /> },
      { name: "Featured Content", to: "/featured-content", icon: <Award /> },
      { name: "Trending", to: "/trending", icon: <Flame /> },
    ];

    const lowerSections = [
      {
        title: "INDUSTRIES",
        links: [
          { name: "Tech", to: "/industries/tech" },
          { name: "Healthcare", to: "/industries/healthcare" },
          { name: "Commerce", to: "/industries/commerce" },
        ],
       },
      {
        title: "JOB GROUPS",
        links: [
          { name: "Software Engineering", to: "/job-groups/software" },
          { name: "Product Management", to: "/job-groups/product" },
          { name: "Finance", to: "/job-groups/finance" },
          { name: "Show more...", to: "/job-groups/more" },
        ],
      },
      {
        title: "GENERAL TOPICS",
        links: [
          { name: "Stock & Investment", to: "/general/stock-investment" },
          { name: "Artificial Intelligence", to: "/general/ai" },
          { name: "Politics", to: "/general/politics" },
          { name: "Show more...", to: "/general/more" },
        ],
      },
      {
        title: "USER LIKELY",
        links: [
          { name: "Daily Workout", to: "/user-likely/workout" },
          { name: "LGBTQ+", to: "/user-likely/lgbtq" },
          { name: "Elon Musk", to: "/user-likely/elon-musk" },
          { name: "Show more...", to: "/user-likely/more" },
        ],
      },
    ];

  return (
    <div className="h-full flex flex-col p-4 w-full">
      <ul className="space-y-4">
        {upperLinks && upperLinks.map((section,index)=>(
            <li key={index} className="text-gray-700 hover:bg-slate-400 p-1 rounded-md hover:text-black flex ">
                {section.icon}
                <Link className="ml-2" to={section.to}>{section.name}</Link>
            </li>
        ))}
      </ul>

      <div className="border border-solid border-stone-300 mt-3" />

      <ul className="space-y-4 overflow-y-scroll custom-scrollbar h-full mt-1">
        {lowerSections &&
          lowerSections.map((section, index) => (
            <li
              key={index}
              className="text-gray-700 hover:text-black flex flex-col justify-center"
            >
              <div className="text-xl p-1">{section.title}</div>
              {section.links &&
                section.links.map((link, linkIndex) => (
                  <Link key={linkIndex} to={link.to} className="p-1">
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
