import React from "react";

const OverviewPage = () => {
  return (
    <div className="mt-6 border overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
      <header className="bg-lostSouls text-white p-6 text-center">
        <h1 className="text-4xl font-bold">Welcome to Bllege</h1>
        <p className="mt-2 text-lg">
          Your Safe Space for Anonymous College Discussions
        </p>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">What is Bllege?</h2>
          <p className="text-gray-700">
            Bllege is an anonymous social networking platform designed
            specifically for college students. It allows verified students to
            engage in discussions, share insights, and address critical topics
            without revealing their identities.
          </p>
          <img
            src="../src/images/bllegeLogo.png"
            alt="Bllege Overview"
            className="w-full h-72 object-cover mt-4 rounded-lg"
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Why Join Bllege?</h2>
          <p className="text-gray-700">
            By joining Bllege, you gain access to a secure and supportive
            community where you can freely express your thoughts and connect
            with peers across different campuses.
          </p>
          <img
            src="https://images.unsplash.com/photo-1609415032095-4c119e77a971?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHF1ZXN0aW9ufGVufDB8fDB8fHww"
            alt="Reasons to Join Bllege"
            className="w-full h-64 object-cover mt-4 rounded-lg"
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Anonymous Posting: Engage in open discussions on sensitive topics.
            </li>
            <li>
              College Channels: Join discussions specific to your college.
            </li>
            <li>
              Community Interaction: Share insights on job searches, interview
              tips, and market trends.
            </li>
            <li>
              Polls and Surveys: Create and participate in polls for valuable
              feedback.
            </li>
            <li>
              Placement Board: Discover job opportunities and insider
              information.
            </li>
          </ul>
          <img
            src="https://images.unsplash.com/photo-1550527882-b71dea5f8089?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2V5JTIwZmVhdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Bllege Features"
            className="w-full h-64 object-cover mt-4 rounded-lg"
          />
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">News & Updates</h2>
          <p className="text-gray-700">
            Stay informed with the latest updates from Bllege. Join our
            community to access valuable insights and news about college life
            and career opportunities.
          </p>
          <img
            src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3cyUyMCUyNiUyMHVwZGF0ZXN8ZW58MHx8MHx8fDA%3D"
            alt="News and Updates"
            className="w-full h-64 object-cover mt-4 rounded-lg"
          />
        </section>

        <section className="mb-1">
          <h2 className="text-3xl font-semibold mb-4">FAQs</h2>
          <p className="text-gray-700">
            Have questions? Check out our FAQs to learn more about using Bllege
            and how it can benefit you as a college student.
          </p>
          <img
            src="https://media.istockphoto.com/id/148124096/photo/ransom-note-alphabets-xxxl.webp?a=1&b=1&s=612x612&w=0&k=20&c=ndgMmvYTSo9l8Vw6lXV9SFfPVVqOLdnpuJXiTap1_Gc="
            alt="FAQs"
            className="w-full h-64 object-cover mt-4 rounded-lg"
          />
        </section>
      </main>

      <footer className="bg-white py-6">
        <div className="text-center mt-4 mb-10 text-gray-500">
          &copy; {new Date().getFullYear()} Bllege. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default OverviewPage;
