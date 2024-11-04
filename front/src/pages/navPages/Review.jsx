import React from "react";

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "iit Bombay",
      text: "Great college with excellent faculty and placements!",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Graphic Era Hill University",
      text: "The campus life is vibrant, but academics can be challenging.",
      rating: 3.8,
    },
    {
      id: 3,
      name: "Uttarakhand Technical University",
      text: "Good infrastructure, but needs improvement in administration.",
      rating: 3.0,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-${i <= roundedRating ? "gold" : "gray-400"} text-lg`}
        >
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="p-4 md:p-8 mt-6 mb-8 overflow-y-auto h-[calc(100vh-80px)] custom-scrollbar">
      <div
        className="relative w-full h-[40vh] bg-cover bg-center mb-4"
        style={{
          backgroundImage:
            'url("https://media.istockphoto.com/id/1016963808/photo/customer-service-evaluation-concept.jpg?s=612x612&w=0&k=20&c=7rkm88NWs6-iyRGPIcFNGTMICMGyPUD111YOdKe5gao=")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <h1 className="relative px-4 z-10 text-5xl font-bold text-white pt-10">
          Anonymous and Verified Student Reviews —
        </h1>
        <h2 className="relative px-4 z-10 text-xl font-bold text-white pt-2">
          {" "}
          No Names Needed Discover how students rate and review their college!
        </h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-lostSouls font-bold mb-4">Student Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 mb-4">
            <h1 className="text-lg font-bold">{review.name}</h1>
            <div className="flex items-center mb-2">
              <div className="flex">{renderStars(review.rating)}</div>
              <span className="ml-2 text-gray-600">{review.rating}</span>
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
