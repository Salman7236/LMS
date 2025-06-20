import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useGetLectureByIDQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const MEDIA_API = "http://localhost:8080/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseID, lectureID } = params;

  const { data: lectureData } = useGetLectureByIDQuery(lectureID);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      // setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          console.log(res);

          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicID: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed.");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    {
      data: removeData,
      isLoading: removeIsLoading,
      isSuccess: removeIsSuccess,
    },
  ] = useRemoveLectureMutation();

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      courseID,
      lectureID,
      isPreviewFree: isFree,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureID);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeIsSuccess) {
      toast.success(removeData.message);
    }
    if (error) {
      toast.error(error.removeData.message);
    }
  }, [removeIsSuccess]);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes to your lecture. Click save when you are done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={removeIsLoading}
            variant="destructive"
            onClick={removeLectureHandler}
          >
            {removeIsLoading ? (
              <>
                <Loader2 className="mr-2 h-2 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Remove lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="e.g., Introduction to JavaScript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="e.g., Introduction to JavaScript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            id="video-free"
          />
          <Label htmlFor="video-free">Is this video free</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="mt-4 text-left">
          <Button disabled={isLoading} onClick={editLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-2 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Update lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
