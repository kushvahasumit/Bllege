import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const MyCollege = () => {
  const { user, updateCollege} = useAuthStore();
  const [college, setCollege] = useState("");
  const navigate = useNavigate();

  const handleCollegeSelect = (e) => {
    const selectedCollege = e.target.value;
    console.log(selectedCollege);
    setCollege(selectedCollege);
  };

  const handleJoinRoom = () => {
    if (user.college !== "New") {
      navigate("/chik-chat");
    }
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
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My College</h1>

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
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          >
            <option value="">Select Your College</option>
            <option value="sitp">SITP</option>
            <option value="gehu">GEHU</option>
            <option value="dtu">DTU</option>
          </select>

          <button
            onClick={handleCollegeUpdate}
            className="w-full mt-4 bg-lostSouls text-white rounded-lg py-2"
          >
            Update College
          </button>
        </div>
      ) : (
        <div>
          <p>Your college: {user.college}</p>
            <button
              className="w-full mt-4 bg-lostSouls text-white rounded-lg py-2"
              onClick={handleJoinRoom}
            >
              Join Room
            </button>
        </div>
      )}
    </div>
  );
};

export default MyCollege;
