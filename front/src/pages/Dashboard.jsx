import React from "react";
import { Outlet } from "react-router-dom";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";


const Dashboard = () => {

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex w-full h-full">
        <div className="hidden md:flex md:w-1/5 justify-center items-center">
          <LeftBar />
        </div>

        <div className=" md:w-3/5 flex-col pt-8">
          <div className=" flex-grow">
            <Outlet />
          </div>
        </div>

        <div className="hidden md:flex md:w-1/5  justify-center items-center">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
