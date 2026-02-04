import cookieparser from "cookie-parser"
import jwt from 'jsonwebtoken'
export function verifyToken(req,res,next){
    //token verification logic

    //1.get token from req()
    let signedToken=req.cookies.token;//{token:""}
    if(!signedToken){
        return res.status(401).json({message:"please login first"})
    }

    //2. verify the token
    let decodedtoken=jwt.verify(signedToken,'abcdef');
    console.log("decode token :", decodedtoken);
    next()
}