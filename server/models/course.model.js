import moongose from "mongoose";

const courseSchema = new moongose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advance"],
    },
    coursePrice: {
      type: Number,
    },
    courseThumbnail: {
      type: String,
    },
    enrolledStudents: [
      {
        type: moongose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lectures: [
      {
        type: moongose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    creator: {
      type: moongose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Course = moongose.model("Course", courseSchema);
