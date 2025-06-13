import React from "react";

const Courses = () => {
  const isLoading = true;
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        {isLoading ? "" : ""}
      </div>
    </div>
  );
};

export default Courses;
