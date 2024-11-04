import React, { useState } from "react";

const PlacementPage = () => {
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const collegeStats = {
    "All Colleges": [
      { name: "Overall Placement Rate", value: "85%" },
      { name: "Average Package", value: "₹7.5 LPA" },
      { name: "Top Recruiters", value: "Amazon, TCS, Infosys" },
    ],
    iitB: [
      { name: "Placement Rate", value: "90%" },
      { name: "Average Package", value: "₹8 LPA" },
      { name: "Top Recruiters", value: "Google, Microsoft, Amazon" },
    ],
    Gehu: [
      { name: "Placement Rate", value: "80%" },
      { name: "Average Package", value: "₹6.5 LPA" },
      { name: "Top Recruiters", value: "Wipro, Cognizant, TCS" },
    ],
    UTU: [
      { name: "Placement Rate", value: "78%" },
      { name: "Average Package", value: "₹3 LPA" },
      { name: "Top Recruiters", value: "Infosys, Accenture, IBM" },
    ],
  };

  return (
    <div className="placement-page text-gray-800 mt-6 mb-16 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
      <div
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbGxlZ2V8ZW58MHx8MHx8fDA%3D")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>

        <div className="relative z-10 flex flex-col justify-center  h-full text-white px-4">
          <h1 className="text-5xl font-extrabold mb-4 px-4 leading-tight tracking-wide">
            Explore Placement Stats
          </h1>

          <p className="text-xl font-medium max-w-xl mb-8 px-4 leading-relaxed text-gray-200">
            Dive into insights and stats to help you prepare for campus
            placements, and discover the top companies actively hiring from
            colleges nationwide.
          </p>

          <div className="flex flex-col w-52 px-4 gap-2 mt-4">
            <label className="text-xl font-semibold tracking-wide">
              Select College
            </label>

            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg text-gray-800 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-lostSouls transition duration-200"
            >
              <option value="All Colleges">All Colleges</option>
              <option value="iitB">IIT Bombay</option>
              <option value="Gehu">GEHU</option>
              <option value="UTU">UTU</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {selectedCollege} Placement Stats
          </h2>

          <div className="flex flex-wrap gap-6 justify-around mb-6">
            {collegeStats[selectedCollege].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 w-full md:w-1/3 lg:w-1/4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md"
              >
                <span className="text-xl font-semibold text-gray-700">
                  {stat.name}
                </span>
                <span className="text-2xl font-bold text-lostSouls">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-sm border-t-4 border-lostSouls">
            <h3 className="text-xl font-semibold mb-4 text-lostSouls">
              Top Recruiters
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {collegeStats[selectedCollege]
                .find((stat) => stat.name === "Top Recruiters")
                ?.value.split(", ")
                .map((recruiter, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-lostSouls">•</span> {recruiter}
                  </li>
                ))}
            </ul>
          </div>

          <div className="mt-10 text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Explore More Placement Topics
            </h4>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-lostSouls text-white py-2 px-4 rounded-lg shadow-md transition">
                Interview Preparation
              </button>
              <button className="bg-lostSouls text-white py-2 px-4 rounded-lg shadow-md transition">
                Company Insights
              </button>
              <button className="bg-lostSouls text-white py-2 px-4 rounded-lg shadow-md transition">
                Resume Building
              </button>
              <button className="bg-lostSouls text-white py-2 px-4 rounded-lg shadow-md transition">
                Mock Interviews
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4 text-lostSouls">
            Placement Preparation Tips
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li className="flex items-center">
              <span className="text-lostSouls mr-2">✔️</span>
              Practice aptitude and reasoning tests.
            </li>
            <li className="flex items-center">
              <span className="text-lostSouls mr-2">✔️</span>
              Review technical subjects relevant to your field.
            </li>
            <li className="flex items-center">
              <span className="text-lostSouls mr-2">✔️</span>
              Participate in mock interviews and coding challenges.
            </li>
            <li className="flex items-center">
              <span className="text-lostSouls mr-2">✔️</span>
              Build a strong resume and LinkedIn profile.
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mt-8 duration-200">
          <h2 className="text-2xl font-bold mb-4 text-lostSouls">
            Top Companies Hiring
          </h2>
          <ul className="space-y-2 text-gray-800">
            <li className="flex items-center">
              <span className="text-lostSouls mr-2">🏢</span>
              Amazon - Known for challenging interviews and growth
              opportunities.
            </li>
            <li className="flex items-center">
              <span className="text-lostSouls mr-2">🏢</span>
              TCS - Offers a structured training program and good work-life
              balance.
            </li>
            <li className="flex items-center">
              <span className="text-lostSouls mr-2">🏢</span>
              Google - Focuses on innovation and offers high packages for tech
              roles.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlacementPage;
