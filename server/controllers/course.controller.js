import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category are required",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating course",
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userID = req.id;
    const courses = await Course.find({ creator: userID });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "No courses found.",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating course",
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseID = req.params.courseID;
    const {
      courseTitle,
      subtitle,
      description,
      category,
      coursePrice,
      courseLevel,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseID);
    if (!course) {
      return res.status(404).json({
        message: "Course not found.",
      });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicID = course.courseThumbnail.split("/").pop().split(".")[0];
        // await delete from cloudinary (publicID)
      }
      // courseThumbnail = await upload media(thumbnail.path)
    }

    const updateData = {
      courseTitle,
      subtitle,
      description,
      category,
      coursePrice,
      courseLevel,
      courseThumbnail,
    };

    course = await Course.findByIdAndUpdate(courseID, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: "Course updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update course details :(",
    });
  }
};

export const getCourseByID = async (req, res) => {
  try {
    const { courseID } = req.params;

    const course = await Course.findById(courseID);

    if (!course) {
      return res.status(404).json({
        message: "Course not found:(",
      });
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course by ID :(",
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseID } = req.params;

    if (!lectureTitle || !courseID) {
      return res.status(400).json({
        message: "Lecture title is required!",
      });
    }

    // Create Lecture
    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseID);

    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(201).json({
      lecture,
      message: "Lecture created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture :(",
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseID } = req.params;
    const course = await Course.findById(courseID).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found.",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures :(",
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseID, lectureID } = req.params;
    const lecture = await Lecture.findById(lectureID);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found.",
      });
    }

    // Update Lecture
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    // if (videoInfo.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    // if (videoInfo.publicID) lecture.publicID = videoInfo.publicID;
    if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure the course still has the lecture ID if it was not already added
    const course = await Course.findById(courseID);
    if (course && course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update lecture :(",
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureID } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureID);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found.",
      });
    }
    // Delete lecture from cloudinary
    // if(lecture.publicID){
    //   await deleteVideofromcloudina(lecture.publicID);
    // }

    // Remove the lecture reference from the related course
    await Course.updateOne(
      { lectures: lectureID }, // finds the course that contains the lecture
      { $pull: { lectures: lectureID } } // remove the lecture id from the lectures array
    );

    return res.status(200).json({
      message: "Lecture removed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture :(",
    });
  }
};

export const getLectureByID = async (req, res) => {
  try {
    const { lectureID } = req.params;
    const lecture = await Lecture.findById(lectureID);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found.",
      });
    }

    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lecture by ID :(",
    });
  }
};
