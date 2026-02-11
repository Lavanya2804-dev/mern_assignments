import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import cookieparser from "cookie-parser"
import {userRoute} from './APIs/UserAPI.js'
import {authorRoute} from './APIs/AuthorAPI.js'
import {adminRoute} from './APIs/AdminAPI.js'
import {commonRoute} from './APIs/commonAPI.js'
import cookieParser from 'cookie-parser'
config()//process .env

const app=exp()
//add body parser middleware
app.use(exp.json())
app.use(cookieParser())

// connect routes
app.use("/user-api", userRoute)
app.use("/author-api", authorRoute)
app.use("/admin-api", adminRoute)
app.use("/common-api",commonRoute)

//connect to the database
const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("DB connection successful")
    //start http server
    app.listen(process.env.PORT,()=>console.log("server started"))
    }catch{
        console.log("err  in DB connection", err)
    }
}
connectDB()


//dealing with  invalid path
app.use((req,res,next)=>{
    console.log(req.url)
    res.json({message: `${req.url} Is invalid path`});
});

//error handling middleware
app.use((err,req,res,next)=>{
    console.log("err:",err)
    res.json({message:"error",reason:err.message})
})