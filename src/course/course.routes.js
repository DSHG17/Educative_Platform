import { Router } from "express";
import { saveCourse, getCoursesByTeacher,updateCourse,deleteCourse,assignStudentToCourse } from "./course.controller.js";
import { createCourseValidator, deleteCourseValidator, getCoursesValidator, updateCourseValidator} from "../middlewares/course-validators.js";


const router = Router()

router.post("/createCourse", createCourseValidator, saveCourse)
router.get("/getCoursesByTeacher/:email", getCoursesValidator,getCoursesByTeacher)
router.put("/updateCourse",updateCourseValidator, updateCourse)
router.delete("/deleteCourse", deleteCourseValidator,deleteCourse)
router.post("/assignStudent", assignStudentToCourse);


export default router