import exp from 'express'
import {UserModel} from '../schemas/UserSchema.js'
import {hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {verifyToken} from  '../middleware/verifyToken.js'

export const userApp=exp.Router()

//use Api router

//create User
userApp.post('/users',async(req,res)=>{
    let newUser=req.body;
    //hash the password
    let hashedPassword =await hash(newUser.password,12)
    //replaceplain password with hashed password
    newUser.password=hashedPassword
    //create new user document
    let newUserDoc=new UserModel(newUser);
    //console.log(newUserDoc);
    await newUserDoc.save();
    res.status(201).json({message:"user created"})

})
//read user
userApp.get('/users',async(req,res)=>{
    //read users from Db
    let usersList=await UserModel.find()
    //send res
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


//user API routers
//create user
//user authentication(login) route
userApp.post('/auth',async(req,res)=>{
    //get usetr cred obj
    let userCred=req.body;
    //check for the username
    let userOfDB = await UserModel.findOne({username:userCred.username})

    if(userOfDB===null){
        return res.status(404).json({message:"invalid username"})
    }
    //compare passwords
    let status=await compare(userCred.password,userOfDB.password)
    //if password not matched
    if(status===false){
        return res.status(404).json({message:"authentication failed"})
    }
//create signed token
let signedToken=jwt.sign({username:userCred.username},'abcdef',{expiresIn:30})
//save token as httponly cookie
res.cookie('token',signedToken,{
    httpOnly:true,//it is only httponly cookie
    secure: false,
    samesite:"lax"
});
//send res
res.status(200).json({message:"login success"})
});


//test router
userApp.get("/test",verifyToken,(req,res)=>{
    res.json({message:"test route",user:req.user})
})