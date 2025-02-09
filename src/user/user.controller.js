import User from "./user.model.js"
import { hash,verify } from "argon2"

export const getUsers = async(req, res) => {
    try{
        const { limits = 3, from = 0} = req.query
        const query = {status: true}


        const [ total, users ] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los usuarios",
            error: err.message
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
}


export const updatePassword = async (req, res) => {
    try{
        const { uid } = req.params
        const { newPassword } =  req.body

        const user = await User.findById(uid)

        const matchPassword = await verify(user.password, newPassword)

        if(matchPassword){
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }
        
        const encryptedPassword = await hash(newPassword)

        await User.findByIdAndUpdate(uid, {password: encryptedPassword})

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
} 

export const deleteUser = async (req, res) => {
    try{
        const { uid } = req. params

        const user =  await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario Eliminado",
            user
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

