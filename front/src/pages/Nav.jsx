import React, { useState, useEffect } from "react";
import {
  Briefcase,
  ChartNoAxesCombined,
  Home,
  LogOut,
  SquarePen,
  Star,
  UserCircle,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Nav = ({ user, logOut }) => {

  const navLinks = [
    { name: "Community", to: "/", icon: <Home /> },
    { name: "Placements", to: "/placements", icon: <Briefcase /> },
    { name: "Reviews", to: "/reviews", icon: <Star /> },
    { name: "Trends", to: "/trends", icon: <ChartNoAxesCombined /> },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPage,setSelectedPage] = useState("/");
  const navigate = useNavigate();

  const handleClickPage = (to) => {
    setSelectedPage(to);
    navigate(to); 
  };
   
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

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
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={`flex flex-col justify-center items-center ${
              selectedPage === link.to
                ? "text-black border-b-2 border-lostSouls p-1"
                : "text-gray-700"
            }`}
            onClick={() => handleClickPage(link.to)} 
          >
            {link.icon}
            <Link to={link.to} className="text-center">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex space-x-4 relative">
        {user ? (
          <div className="flex space-x-4 relative dropdown">
            <button className="bg-lostSouls flex text-white px-4 py-2 rounded-lg hover:bg-lostSouls" onClick={()=> navigate("/createpost")} >
              <SquarePen className="mr-2" />
              Bleege Post
            </button>

            <UserCircle
              className="h-10 w-10 text-gray-700 cursor-pointer"
              onClick={toggleDropdown}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  className="flex items-center px-4 py-2 w-full text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button className="bg-transparent border border-lostSouls text-lostSouls px-4 py-2 rounded-lg hover:bg-lostSouls hover:text-white">
              <Link to="/login">Sign In</Link>
            </button>

            <button className="bg-lostSouls text-white px-4 py-2 rounded-lg hover:bg-lostSouls">
              <Link to="/sign-up">Sign Up</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
