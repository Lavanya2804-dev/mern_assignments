// create HTTP server

import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import UserApp from "./APIs/UserAPI.js"
import cors from 'cors'
//Read environment variables
config();
//create HTTp server
const app = exp();


app.use(cors({
  origin:["http://localhost:5173",
    "https://mern-assignments-q35q.vercel.app"
  ],
  credentials: true
}))
// Body parser middleware
app.use(exp.json());
// Forward request to userApi
 app.use("/user-api", UserApp)


// Connect to Database
async function connectDB() {
  try {
    await connect(process.env.DB_URL);
    console.log("Connected to DB");

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {
    console.log("Error in DB connection:", err.message);
  }
}

connectDB();

// Error handling middleware

app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});
