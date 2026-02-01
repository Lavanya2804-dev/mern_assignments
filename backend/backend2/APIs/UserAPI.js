import exp from 'express'
import {UserModel} from '../schemas/UserSchema.js'
export const userApp=exp.Router()

//usetr Api router

//create User
userApp.post('/users',async(req,res)=>{
    let newUser=req.body;
    let newUserDoc=new UserModel(newUser);
    console.log(newUserDoc);
    await newUserDoc.save();
    res.status(201).json({message:"user created"})

})
//read user
userApp.get('/users',async(req,res)=>{
    //read users 
    let usersList=await UserModel.find()
    res.status(200).json({message:"users",payload:usersList})
})

//read user by ObjectId
userApp.get("/users/:id",async(req,res)=>{
    //get user id from req params
    let objId=req.params.id;
    //fetch user from db by id
    let userObj=await UserModel.findById(objId)
    //send res
    res.status(200).json({message:"user",payload:userObj})
})

//update user
userApp.put("/users/:id",async(req,res)=>{
    //get objectId from the url params
    let objId=req.params.id
    //get modified user from req
    let modifiedUser=req.body
    //make update
    let latestUser = await UserModel.findByIdAndUpdate(objId,{$set:{...modifiedUser}},{new:true})
    //send res
    res.status(200).json({message:'user updated',payload:'latestUser'});
})

//delete user
userApp.delete("/users/:id",async(req,res)=>{
    //get objectid from url params
    let objId = req.params.id;
    //delete user from db by id
    let deleteUser=await UserModel.findByIdAndDelete(objId);
    //send re
    res.status(200).json({message:"user deleted sucessully",payload:deleteUser})
})