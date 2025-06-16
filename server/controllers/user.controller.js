import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    // Log the error for debugging purposes
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Here you would typically generate a JWT token and send it back

    generateToken(res, user, `Welcome back, ${user.name}!`);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to login user",
      error: error.message,
    });
  }
};

export const logoutUser = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out succesfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout user",
      error: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userID = req.id;
    const user = await User.findById(userID).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "Profile not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userID = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const updatedData = {name, photoUrl}

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update Profile",
    });
  }
};
