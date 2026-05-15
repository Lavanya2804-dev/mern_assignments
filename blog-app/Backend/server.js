import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import {userRoute} from './APIs/UserAPI.js'
import {authorRoute} from './APIs/AuthorAPI.js'
import {adminRoute} from './APIs/AdminAPI.js'
import {commonRoute} from './APIs/commonAPI.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
config()//process .env

const app=exp()

//add body parser middleware
app.use(exp.json())
app.use(cookieParser())
app.use(cors({
  origin: [
  "http://localhost:5173",
  'https://mern-assignments-emt9.vercel.app'
  ],// Allow only your frontend
  credentials: true                // This is the key part you are missing!
}));

// connect routes
app.use("/user-api", userRoute)
app.use("/author-api", authorRoute)
app.use("/admin-api", adminRoute)
app.use("/common-api",commonRoute)

//connect to the database
const connectDB = async () => {
    try {
        // 1. Check if DB_URL exists
        if (!process.env.DB_URL) {
            console.error("❌ DB_URL is missing in .env file");
            process.exit(1); 
        }

        await connect(process.env.DB_URL);
        console.log("✅ DB connection successful");

        // 2. Start the server ONLY after DB is connected
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });

    } catch (error) { // <--- Added 'error' variable name here
        console.error("❌ ERROR during startup:", error.message);
        // If DB fails, the process ends so you know why
        process.exit(1); 
    }
};

connectDB();


app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});