// Create mini-express app
import exp from "express";
import { UserModel } from "../Models/UserModel.js";
export const UserApp = exp.Router();

//USER API ROUTES

// Create User
UserApp.post("/users", async (req, res) => {
  try {
    const newUser = req.body;

    const newUserDocument = new UserModel(newUser);

    let user = await newUserDocument.save();

    res.status(201).json({
      message: "User created",
      payload: user,
    });

  } catch (err) {
  console.log("POST ERROR:", err);

  if (err.code === 11000) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  res.status(500).json({
    message: err.message,
  });
}

// Read all Users
UserApp.get("/users", async (req, res) => {
  //read all users
  let usersList = await UserModel.find({ status: true });
  //send res
  res.status(200).json({ message: "users", payload: usersList });
});

// Read a User by ID
UserApp.get("/users/:id", async (req, res) => {
  //get user if from url
  let uid = req.params.id;
  //find user by id
  let user = await UserModel.findOne({ _id: uid, status: true });
  //check user
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  //send res
  res.status(200).json({ message: "user found", payload: user });
});

// Delete a User by ID
UserApp.delete("/users/:id", async (req, res) => {
  //get user if from url
  let uid = req.params.id;
  //find user and chage status to false
  let user = await UserModel.findByIdAndUpdate(uid, { $set: { status: false } });
  //check user
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  //send res
  res.status(200).json({ message: "User removed" });
});

//Activate User(change status to true)
UserApp.patch("/users/:id", async (req, res) => {
  //get user if from url
  let uid = req.params.id;
  //find user and chage status to false
  let user = await UserModel.findByIdAndUpdate(uid, { $set: { status: true } }, { new: true });

  //send res
  res.status(200).json({ message: "User activated", payload: user });
});
//PUT(complete change) & PATCH(partial changes)

// Update user by ID

export default UserApp;