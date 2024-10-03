import React from "react";
import { Briefcase, ChartArea, ChartBar, ChartBarIncreasingIcon, ChartNoAxesCombined, Home, Star } from "lucide-react";

const Nav = () => {
  return (
    <nav className="shadow-md px-6 py-2 flex items-center space-x-4">
      <div className="flex items-center">
        <img
          src="./src/images/bgrsm.png"
          alt="BllegeLogo"
          className="h-12 w-14"
        />
      </div>

      <div className="hidden md:flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-52 py-2 px-4 border border-gray-300 rounded-3xl focus:outline-none  focus:ring-0 focus:border-gray-300"
        /> 
      </div>

      <ul className="flex-grow hidden md:flex items-center justify-center space-x-8">
        <li className="text-gray-700 hover:text-black flex flex-col justify-center items-center">
          <Home className="" />
          <a href="/" className="text-center">
            Community
          </a>
        </li>
        <li className="text-gray-700 pl-3 hover:text-black flex flex-col justify-center items-center">
          <Briefcase className="" />
          <a href="/" className="text-center">
            Placements
          </a>
        </li>
        <li className="text-gray-700 pl-3 hover:text-black flex flex-col justify-center items-center">
          <Star className="" />
          <a href="/" className="text-center">
            Reviews
          </a>
        </li>

        <li className="text-gray-700 pl-3 hover:text-black flex flex-col justify-center items-center">
          <ChartNoAxesCombined className="" />
          <a href="/" className="text-center">
            Trends
          </a>
        </li>
      </ul>

      <div className="flex space-x-4">
        <button className="bg-transparent border border-lostSouls text-lostSouls px-4 py-2 rounded-lg hover:bg-lostSouls hover:text-white">
          Sign In
        </button>
        <button className="bg-lostSouls text-white px-4 py-2 rounded-lg hover:bg-lostSouls">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Nav;
