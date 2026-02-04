import {Schema,model} from 'mongoose'
//create cart schema
const cartSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref: 'Product' , //name of product model
    },
    quantity:{
        type:Number,
        default:1,
    }
});

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"Email required"],
        unique:true //add to index
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    cart:{
        type:[cartSchema],
    },
});
export const UserModel=model("user",userSchema)
