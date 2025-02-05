import {Schema, model} from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Name is required"],
        maxLength:[25, "Name cannot exceed 25 characters"]
    },
    username:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    profilePicture:{
        type: String,
    },
    phone:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("User", userSchema)