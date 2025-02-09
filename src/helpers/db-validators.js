import User from "../user/user.model.js"
import Course from "../course/course.model.js"

export const existeEmail = async(email = '') =>{
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}

export const existeUsername = async(username = '') =>{
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El nombre de usuario ${username} ya fue registrado previamente`)
    }
}

export const userExists = async(uid = '') =>{
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("El usuario no existe")
    }
}

export const courseExists = async(cid = '') =>{
    const existe = await Course.findById(cid)
    if(!existe){
        throw new Error("El curso no existe");
    }
}
