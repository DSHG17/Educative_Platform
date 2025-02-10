import { validarCampos } from "./validar-campos.js";
import { body,param } from "express-validator";
import { courseExists } from "../helpers/db-validators.js";

export const createCourseValidator = [
    body("title").notEmpty().withMessage("El nombre del curso es requerido"),
    body("description").notEmpty().withMessage("La descripción del curso es requerida"),
    body("email").isEmail().withMessage("El correo del profesor es obligatorio"),
    validarCampos
]

export const getCoursesValidator = [
    param("email").isEmail().withMessage("El correo del profesor es invalido"),
    validarCampos
] 

export const updateCourseValidator = [
    body("uid").isMongoId().withMessage("No es un ID válido"),
    body("uid").custom(courseExists),
    body("title").notEmpty().withMessage("El nombre del curso es requerido"),
    body("description").notEmpty().withMessage("La descripcion del curso es requerida"),
    body("email").isEmail().withMessage("El correo del profesor es obligatorio"),
    validarCampos
]

export const deleteCourseValidator = [
    body("cid").isMongoId().withMessage("No es un ID válido"),
    body("cid").custom(courseExists),
    body("email").isEmail().withMessage("El correo del profesor tiene que tener un formato valido"),
    validarCampos,
]

export const assignStudentValidator = [
    body("cid").isMongoId().withMessage("No es un ID valido"),
    body("cid").custom(courseExists),
    body("email").isEmail().withMessage("El correo del alumno a asignar es obligatorio")
]
