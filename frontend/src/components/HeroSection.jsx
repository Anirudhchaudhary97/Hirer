import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10 justify-center items-center">
        <span className=" mx-auto px-4 py-2 text-[#053B48] font-semibold rounded-full bg-slate-100 text-xl">
          No.1 Job Searching Website
        </span>
        <h1 className="text-4xl font-bold">
          Search, Apply & <br />{" "}
          <span className="text-green-700">Get Your Dream Jobs</span>
        </h1>
        <p className="text-2xl font-semibold">
          Explore thousands of job listings from top companies around the globe.
        </p>
        <div
          className="flex items-center gap-4 pl-3 w-[40%] 
        shadow-lg border border-gray-200 mx-auto rounded-full"
        >
          <input
            className="outline-none border-none w-full text-xl"
            type="text"
            placeholder="search jobs"
          />
          <Button className="rounded-r-full bg-[#053B48]">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
