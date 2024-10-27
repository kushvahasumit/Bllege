import React from "react";
import { useAuthStore } from "../store/authStore";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";


const Dashboard = () => {
  const {user,logOut} = useAuthStore();

  return (
    <div className="w-full h-screen flex flex-col">
      <Nav user={user} logOut={logOut} />

      <div className="flex w-full h-full">
        <div className="w-1/5 flex justify-center items-center">
          <LeftBar />
        </div>

        <div className="w-3/5 flex flex-col pt-8">
          <div className=" flex-grow">
            <Outlet />
          </div>
        </div>

        <div className="w-1/5 flex justify-center items-center">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
