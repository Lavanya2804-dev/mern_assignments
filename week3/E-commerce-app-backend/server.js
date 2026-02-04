import exp from 'express'
import {UserApp} from './APIs/UserAPI.js';
import {ProductApp} from './APIs/ProductAPI.js';
import {connect} from 'mongoose'



//create Http server
const app=exp();
const port=4000;
//connect to mongoDB datbase
async function connectDB(){
    try{
     await connect("mongodb://localhost:27017/EcomDB");
    console.log(" db connection success");
    app.listen(port,()=>console.log("server listening on port 4000..."))
    }catch(err){
    console.log("error in connecting to db",err)
    }
}
connectDB()
//use body parser middleware
app.use(exp.json())
//forward req to specific APIs

app.use('/user-api',UserApp)
app.use('/product-api',ProductApp)

//error handling middleware
function errorHandler(err,req,res,next){
    res.json({message:"error",reason:err.message})
}
app.use(errorHandler)


