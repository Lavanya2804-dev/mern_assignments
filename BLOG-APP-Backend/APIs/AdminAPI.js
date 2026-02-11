import exp from 'express'
export const adminRoute=exp.Router();
import {UserTypeModel} from "../models/UserModel.js";   // adjust path


//read all articles(optional)
//block
//unblock user roles

//Block user roles
adminRoute.put("/users/:userId",async(req,res)=>{
    //get user id
    let userId=req.params.userId;
    //block user
    let user = await UserTypeModel.findByIdAndUpdate(
        userId,
        {isActive:false},
        {new:true})
    //send res
    res.status(200).json({message:"User Blocked",payload:user})
})
//unblock user roles 
adminRoute.put("/users/unblock/:userId",async(req,res)=>{
    //get user id
    let userId=req.params.userId;
    //unblock user
    let user = await UserTypeModel.findByIdAndUpdate(
        userId,
        {isActive:true},
        {new:true})
    //send res
    res.status(200).json({message:"User Unblocked",payload:user})
})