import {Schema,model} from 'mongoose'

//create Product schema (pid,productname,price)
const ProductSchema=new Schema({
    pid:{
        type:String,
        required:[true,"pid is required"] //required is used for field should be empty
    },
    productname:{
        type:String,
        required:[true,"ProductName is required"],
        minLength:[4,"min length should be 4"],
        maxLength:[6,"Max length exceeded"]

    },
    price:{
        type:Number,
        required:[true,"age is required"],
        min:[10000,"price should be above 10000"],
        max:[100000,"price should be less than 100000"]
    }
//},{
    //strict:"throw",
   // timestamps:true

//
});


export const ProductModel = model("Product", ProductSchema)