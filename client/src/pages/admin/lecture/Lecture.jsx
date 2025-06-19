import React from "react";

const Lecture = ({ lecture, courseID, index }) => {
  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-medium my-2">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        {lecture.lectureTitle}
      </h1>
    </div>
  );
};

export default Lecture;
