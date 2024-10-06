import React from "react";
import LatestJobCards from "./LatestJobCards";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto my-20 px-4">
        {/* Title Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          <span className="text-green-700">Latest & Top</span> Job Openings
        </h1>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10">
          {randomJobs.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            randomJobs.slice(0, 8).map((job, index) => (
              <LatestJobCards key={index} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LatestJobs;
