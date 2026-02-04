import {Schema,model} from 'mongoose'

const ProductSchema=new Schema({
    productname:{
        type:String,
        required:[true,"ProductName is required"],

    },
    price:{
        type:Number,
        required:[true,"age is required"],
    },
    brand:{
        type:String,
        required:[true,"product brand is required"],
    }
    
},{
    strict:"throw",
    timestamps:true,
   versionKey:false

});

export const ProductModel = model("Product", ProductSchema)