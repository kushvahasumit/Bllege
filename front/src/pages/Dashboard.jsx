import React from "react";
import { useAuthStore } from "../store/authStore";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";


const Dashboard = () => {
  const {user,logOut} = useAuthStore();

  return (
    <div className="w-full h-full ">
      <Nav user={user} logOut={logOut} />

      <div className="flex w-full h-screen">
        <div className="w-1/5 h-full  flex justify-center items-center">
          <LeftBar />
        </div>

        <div className="w-3/5 h-full pt-8">
          <div className=" ">
            <Outlet />
          </div>
        </div>

        <div className="w-1/5 h-full flex justify-center items-center">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
