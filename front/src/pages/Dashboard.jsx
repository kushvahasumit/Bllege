import React from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import LeftBar from "./LeftBar";


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

      <div className="flex w-full h-screen">
        <div className="w-1/5 h-full  flex justify-center items-center">
          <LeftBar />
        </div>

        <div className="w-3/5 h-full flex flex-col justify-center items-center bg-gray-100">
          <div className="flex justify-center items-center space-x-4">
            <div className="bg-black p-4 text-white">hello</div>
            <div className="bg-red-600 p-4 text-white">sumit</div>
          </div>

          <div className="w-28 mt-10 flex justify-center items-center">
            <button
              onClick={handleLogout}
              className="bg-lostSouls hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="w-1/5 h-full bg-gray-200 flex justify-center items-center">
          <p>Right Bar</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
