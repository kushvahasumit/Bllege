import React from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";


const Dashboard = () => {
  const {user,logOut} = useAuthStore();
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
    
  };
  return (
    <div className="w-full h-full ">
      <Nav />
      <div className=" w-28 mt-10 flex justify-center items-center">
        {" "}
        <button
          onClick={handleLogout}
          className="bg-lostSouls hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
