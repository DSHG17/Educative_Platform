import { Schema, model } from "mongoose";

const courseSchema = Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    teacher:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: [],
      },
    status:{
        type: Boolean,
        default: true
    },
    status:{
        type:Boolean,
        default: true
    }
})

export default model("Course", courseSchema)