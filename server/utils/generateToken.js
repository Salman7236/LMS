import JWT from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  // Generate a JWT token with user information
  const token = JWT.sign(
    {
      userID: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET, // Ensure you have a JWT secret in your environment variables
    {
      expiresIn: "30d", // Token expiration time
    }
  );

  // Set the token in the response header
  // res.setHeader("Authorization", `Bearer ${token}`);

  // Optionally, you can also send a cookie with the token
  res.cookie("token", token, {
    httpOnly: true,
    samesite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration time (30 days)
    // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  });

  // Send a success message along with the user data
  res.status(200).json({
    success: true,
    message,
    user,
    //message: message || "Operation successful",
    // user: {
    // id: user._id,
    //name: user.name,
    //email: user.email,,
  });
};
