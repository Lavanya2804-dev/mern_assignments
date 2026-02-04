import exp from 'express'
import {userApp} from './APIs/UserAPI.js';
import {ProductApp} from './APIs/ProductAPI.js';
import {connect } from 'mongoose'
import cookieparser from "cookie-parser"
const app=exp();
const port =4000;

app.use(cookieparser())
app.use(exp.json())
app.use('/user-api',userApp)
app.use('/product-api',ProductApp)


//connect to the db server
async function connectDB(){
    try{
     await connect("mongodb://localhost:27017/anuragdb2");
    console.log(" db connection success");
    app.listen(port,()=>console.log("server listening on port 4000..."))
    }catch(err){
    console.log("error in connecting to db",err)
    }
}
connectDB()

//error handling middleware
function errorHandler(err,req,res,next){
    res.json({message:"error",reason:err.message})
}
app.use(errorHandler)