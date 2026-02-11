import  jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config()
export const verifyToken=async(req,res,next)=>{
    //read token from req
    let token=req.cookies?.token; //{token:" "}
    console.log("token is:",token)
    if(!token){
        return res.status(401).json({message:"unauthorized req. plz login"})
    }
    //verify the validity of the token( decodding the token)
    let decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    
    req.user = {
    id: decodedToken.userId,
    role: decodedToken.role,
    email: decodedToken.email
  };
    //forword req to next middleware/route
    next()
}
