import { body } from "express-validator";
import { existeEmail, existeUsername } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidator = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("username","El username es obligatorio").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty(),
    body("email", "Ingrese un correo válido").isEmail(),
    body("email").custom(existeEmail),
    body("username").custom(existeUsername),
    body("password", "Ingrese una contraseña valida").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    }),
    validarCampos,
    deleteFileOnError
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingrese un correo válido"),
    body("username").optional().isString().withMessage("Ingrese un username válido"),
    body("password").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError
]