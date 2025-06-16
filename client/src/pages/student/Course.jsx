import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import React from "react";
import { Badge } from "@/components/ui/badge";

const Course = () => {
  return (
    <Card className="p-0 overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          alt="Next.js Course Thumbnail"
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-5 py-4 pt-3 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          Next.js Complete Course
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm ">Instructor</h1>
          </div>
          <Badge
            className={
              "bg-blue-600 text-white px-2 py-1 text-sm rounded-full ml-2"
            }
          >
            Advance
          </Badge>
        </div>
        <div className="text-lg font-bold">
          <span>Rs499</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
