import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const CourseTab = () => {
  const isPublished = false;
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you are done
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="e.g., Full-stack Development"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subtitle"
              placeholder="e.g., Become a full-stack developer"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Write a description of your course here." />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
