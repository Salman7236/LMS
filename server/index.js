import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";

dotenv.config({});

// call database connection
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

// Default Middleware

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// APIs
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
