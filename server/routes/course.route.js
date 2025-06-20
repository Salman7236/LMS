import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseByID,
  getCourseLecture,
  getCreatorCourses,
  getLectureByID,
  removeLecture,
  togglePublishCourse,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router
  .route("/:courseID")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/:courseID").get(isAuthenticated, getCourseByID);
router.route("/:courseID/lecture").post(isAuthenticated, createLecture);
router.route("/:courseID/lecture").get(isAuthenticated, getCourseLecture);
router
  .route("/:courseID/lecture/:lectureID")
  .post(isAuthenticated, editLecture);
router.route("/lecture/:lectureID").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureID").get(isAuthenticated, getLectureByID);
router.route("/:courseID").patch(isAuthenticated, togglePublishCourse);

export default router;
