import {Schema , model} from 'mongoose'

const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,"first name required"]
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"first name required"],
        unique:[true,"email is already exists"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    profileImageUrl:{
        type:String,
    },
    role:{
        type:String,
        enum:['AUTHOR','USER','ADMIN'],
        required:[true,"{value} is an Invalid role"],
    },
    isActive:{
        type:Boolean,
        default:true,
    },
},{
    timestamps:true,
    strict:"throw",
    versionKey:false
});

export const UserTypeModel=model("user",userSchema)