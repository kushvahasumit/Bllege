import React from "react";
// import { LucidLogo } from "lucid-react"; // Assuming you're using Lucid's logo component

const Nav = () => {
  return (
    <nav className="shadow-md px-6 py-4 flex items-center ">
      {/* Logo Section */}
      <div className="flex items-center">
        {/* <LucidLogo className="h-10 w-10" /> Lucid logo */}
        <span className="ml-3 text-xl font-semibold">Brand Name</span>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 px-4 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center space-x-6">
        <li className="text-gray-700 hover:text-black">
          <a href="/">Home</a>
        </li>
        <li className="text-gray-700 hover:text-black">
          <a href="/about">About</a>
        </li>
        <li className="text-gray-700 hover:text-black">
          <a href="/services">Services</a>
        </li>
        <li className="text-gray-700 hover:text-black">
          <a href="/contact">Contact</a>
        </li>
      </ul>

      {/* Sign In / Sign Up */}
      <div className="flex space-x-4">
        <button className="bg-transparent border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white">
          Sign In
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Nav;
