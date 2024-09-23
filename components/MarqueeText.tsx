import React from "react";

const MarqueeText = () => {
  return (
    <div className="marquee-container overflow-hidden whitespace-nowrap bg-black py-4 mt-4">
      <div className="animate-marquee inline-block text-white text-2xl font-bold">
        <span className="mx-4">
          {Array(20).fill("STREETWEAR").join("   •   ")}
        </span>
        <span className="mx-4">
          {Array(20).fill("STREETWEAR").join("   •   ")}
        </span>
      </div>
    </div>
  );
};

export default MarqueeText;
