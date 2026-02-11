import exp from 'express'
import { login } from "../services/authServices.js";
import {UserTypeModel} from "../models/UserModel.js"; // adjust path if needed
import bcrypt from 'bcryptjs'

export const commonRoute=exp.Router()

//login
commonRoute.post("/login",async(req,res)=>{
    try{
    //get user cred object
        let userCred=req.body
        //call authentication
        let {token,user}=await login(userCred);
        //save token as httponly cookie
        res.cookie("token",token,{
            httpOnly:"true",
            sameSite:"lax",
            secure:false,
        });
        //send res
        res.status(200).json({
            message:"login success",payload:{token,user}
    })
}
catch(err){
    res.status(err.status||500).json({
        message:err.message||"login failed"
    });
} 
})

//logout
commonRoute.get("/logout",async(req,res)=>{

 //clear the cookie name 'token'
    res.clearCookie('token',{
        hhtpOnly:true, //must match original setttings
        secure:false, //must match original settings
        sameSite: 'lax' // must match original settings
    });
    res.status(200).json({message:"logged out successfully"})
})

//change password
commonRoute.put('/change-password',async(req,res)=>{
    //get current password and new password
    const { email, currentPassword, newPassword } = req.body;
    //check the current password
    const user = await UserTypeModel.findOne({email});

    const isMatch = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!isMatch) {
        return res.status(401).json({
            message: "Current password is incorrect"
        });
    }
    //replace the current password with new password
     const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save()
    //send res
     res.json({ message: "Password changed successfully" });
});
