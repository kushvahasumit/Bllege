import React from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";


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
    <div className="flex justify-center items-center w-full">
      <h1>Hello Dev</h1>
      <div>
        {" "}
        <button
          onClick={handleLogout}
          className="bg-black hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
