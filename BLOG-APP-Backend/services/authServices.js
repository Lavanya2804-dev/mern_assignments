import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {UserTypeModel} from "../models/UserModel.js";
import {config} from "dotenv"
config()
//register function
export const register = async (userObj) => {
    //create document
    const userDoc=new UserTypeModel(userObj);
    //validate for empty password
    await userDoc.validate();
    //hash and replace plain password
    userDoc.password=await bcrypt.hash(userDoc.password,10);
    //save
    const created = await userDoc.save();
    //convert document to object to remove password
    const newUserObj =  created.toObject();
    //remove password
    delete newUserObj.password;
    //return user obj without password
    return newUserObj;
};

//authenticate function
export const login = async ({email,password})=>{
    //check user with email & role
    const user=await UserTypeModel.findOne({email});
    if(!user) {
        const err = new Error("invalid email ");
        err.status=401;
        throw err;
    }
    //compare password
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        const err = new Error("invalid password");
        err.status=401;
        throw err;
    }
    //check isactive state
    if(user.isActive===false) {
        const err = new Error("you account is blocked");
        err.status=403;
        throw err;
    }

    //generete token
    const token=jwt.sign({userId:user._id,role:user.role,email:user.email},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });

    const userObj = user.toObject();
    delete userObj.password;

    return {token,user:userObj};
};