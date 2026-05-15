import exp from "express";
import { login } from "../services/authServices.js";
import { UserTypeModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middlewares/verifyTokens.js";

export const commonRoute = exp.Router();


// LOGIN
commonRoute.post("/login", async (req, res) => {
  try {
    let userCred = req.body;

    let { token, user } = await login(userCred);

    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  path: "/",
});

    res.status(200).json({
      message: "login success",
      payload: { token, user },
    });

    console.log("TOKEN:", token);

  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || "login failed",
    });
  }
});


// LOGOUT
commonRoute.get("/logout", async (req, res) => {

 res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? "none"
      : "lax",
  path: "/",
});

  res.status(200).json({
    message: "logged out successfully",
  });
});


// CHECK AUTH  (needed for frontend checkAuth)
commonRoute.get(
  "/check-auth",
  verifyToken("USER", "AUTHOR", "ADMIN"),
  async (req, res) => {
  try {
    const user = await UserTypeModel
      .findById(req.user.userId)
      .select("-password");

    res.status(200).json({
      message: "user authenticated",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to fetch user",
    });
  }
}
);


// CHANGE PASSWORD
commonRoute.put("/change-password", async (req, res) => {

  const { email, currentPassword, newPassword } = req.body;

  const user = await UserTypeModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Current password is incorrect",
    });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);

  await user.save();

  res.json({
    message: "Password changed successfully",
  });
});

