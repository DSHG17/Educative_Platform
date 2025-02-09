import { Schema, model } from "mongoose";

courseSchema = Schema({
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
        ref: "User",
        default: [],
      },
})

export default model("Course", courseSchema)