import express from 'express';
import {UserModel} from '../Schemas/UserSchema.js'
import {Types} from 'mongoose'
import {hash} from 'bcryptjs'
import {ProductModel} from '../Schemas/ProductSchema.js'
export const UserApp=express.Router();

//create User
UserApp.post('/users',async(req,res)=>{
    //get user from req
    let newUser=req.body;
    //run validator
    await new UserModel(newUser).validate()
    
    //hash the password
    let hashedPassword =await hash(newUser.password,12)
    //replace plain password with hashed password
    newUser.password=hashedPassword
    //create new user document
    let newUserDoc=new UserModel(newUser);
    //console.log(newUserDoc);
    //save
    await newUserDoc.save({validateBeforeSave:false});
    //res
    res.status(201).json({message:"user created"})

});

//Add product to users cart
UserApp.put("/user-cart/user-id/:uid/product-id/:pid",async(req,res)=>{

    //read uid and pid from url parameters
    let {uid,pid}=req.params; //{uid:"",pid:""}
    //console.log("pid",pid)
    //console.log("uid",uid)
    //perform the update
    //check user
    let user=await UserModel.findById(uid);
    if(!user){
            return res.status(401).json({message:"user not found"})
    }
    //check product
    let product=await ProductModel.findById(pid)
    if(!product){
        return res.status(401).json({message:"product not found"})
    }
    //Quantity code
    let productIndex = user.cart.findIndex(
        item => item.product.toString() === pid
    );

    if (productIndex !== -1) {
        // product already in cart → increment quantity
        user.cart[productIndex].quantity += 1;
    } else {
        // product not in cart → add with quantity = 1
        user.cart.push({
            product: pid,
            quantity: 1
        });
    }

    //  SAVE SAME USER (instead of findByIdAndUpdate)
    let modifiedUser = await user.save();
    await modifiedUser.populate("cart.product");

    res.status(200).json({
        message: "product added to the cart",
        payload: modifiedUser
    });
});

UserApp.get("/users/:uid",async(req,res)=>{
    let {uid}=req.params;
    //find user
    let userObj=await UserModel.findById(uid).populate("cart.product")
    //send res
    res.status(200).json({message:"user",payload:userObj})
})

UserApp.get("/compare/:pid",async(req,res)=>{
    let productId=new Types.ObjectId(req.params.pid);
    //get product
    let prod=await ProductModel.findById(productId)
    //compare ids
    if(productId===prod._id){
        console.log("equal")
    }else{
        console.log("not equal")
    }
});

//if(prod._id.equals(ProductId)){
//  console.log("eq")
//}else{
//    console.log("ne")
//}




let obj1={
    a:10
}

let obj2={
    a:10
}

obj1===obj2