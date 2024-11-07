import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const MyCollege = () => {
  const { user, updateCollege} = useAuthStore();
  const [college, setCollege] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if(!user){
      navigate("/login")
    }
    if (user.college !== "New") {
      navigate("/chik-chat");
    }
  };

  const handleCollegeSelect = (e) => {
    const selectedCollege = e.target.value;
    console.log(selectedCollege);
    setCollege(selectedCollege);
  };

  const handleCollegeUpdate = () => {
    if (user && user.email) {
      const emailDomain = user.email.split("@")[1].split(".")[0];

      if (college.toLowerCase() === emailDomain.toLowerCase()) {
        updateCollege(user._id,college);
      } else {
        alert("Selected college does not match email domain.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col border rounded-lg items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1664303228186-a61e7dc91597?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fHww)",
      }}
    >
      <div className="absolute inset-0 bg-offWhite border rounded-lg opacity-40"></div>

      <div className="relative z-10 w-full max-w-lg p-6 rounded-lg shadow-lg bg-white bg-opacity-90 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Join Your College Discussion
        </h2>

        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          { user.college === "New"
            ? "Select Your College to Start"
            : `Join your batchmates in ${user.college || "new" } internal discussion`}
        </h1>

        {user && user.college === "New" ? (
          <div>
            <label
              htmlFor="college"
              className="block font-medium text-gray-700 mb-2"
            >
              Select Your College
            </label>
            <select
              id="college"
              value={college}
              onChange={handleCollegeSelect}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4"
              required
            >
              <option value="">Select Your College</option>
              <option value="sitp">Seemant Engineering Institute</option>
              <option value="gehu">Graphic Era</option>
              <option value="dtu">DTU</option>
            </select>

            <button
              onClick={handleCollegeUpdate}
              className="w-full bg-lostSouls text-white rounded-lg py-2 transition-transform transform hover:scale-105 shadow-md"
            >
              Update College
            </button>
          </div>
        ) : (
          <div>
            <button
              className="w-full bg-lostSouls text-white rounded-lg py-3 mt-4 transition-transform transform hover:scale-105 shadow-md"
              onClick={handleJoinRoom}
            >
              JOIN ROOM
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollege;
