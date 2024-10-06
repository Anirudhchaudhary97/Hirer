import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <>
      <div className="p-4 md:p-6 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer hover:bg-gradient-to-r hover:from-[#E5F4F7] hover:to-[#FFFFFF] w-full max-w-md md:max-w-lg mx-auto">
        {/* Company Info */}
        <div className="mb-3">
          <h1 className="font-semibold text-lg md:text-xl text-[#053B48]">SoftTect</h1>
          <p className="text-xs md:text-sm text-gray-500">Nepal</p>
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <h1 className="font-bold text-lg md:text-xl text-green-700">Fullstack Developer</h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
            excepturi deserunt. Enim minus consectetur rerum.
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-4">
          <Badge className="text-[#053B48] bg-[#E5F4F7] font-semibold text-xs md:text-sm" variant="ghost">
            Positions
          </Badge>
          <Badge className="text-green-700 bg-green-100 font-semibold text-xs md:text-sm" variant="ghost">
            Job Type
          </Badge>
          <Badge className="text-[#7209b7] bg-purple-100 font-semibold text-xs md:text-sm" variant="ghost">
            Salary
          </Badge>
        </div>
      </div>
    </>
  );
};

export default LatestJobCards;
