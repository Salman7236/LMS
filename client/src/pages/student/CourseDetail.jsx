import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import BuyCourseButton from "@/components/BuyCourseButton";

const CourseDetail = () => {
  const purchasedCourse = true;
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg">Course Subtitle</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">Salman</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last Updated: 20-20-2020</p>
          </div>
          <p>Students enrolled: 10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            unde sunt dolorem obcaecati eaque ad, sequi dolore iusto officia
            veritatis exercitationem assumenda minima provident consequatur
            corrupti qui vel molestiae illum.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 Lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>Lecture Title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">react player video</div>
              <h1>Lecture Title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchasedCourse ? (
                <Button className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
