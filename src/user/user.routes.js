import { Router } from "express";
import { getUsers,deleteUser,updatePassword,updateUser } from "./user.controller.js";
import { deleteUserValidator,updatePasswordValidator,updateUserValidator } from "../middlewares/user-validators.js";

const router = Router();

router.get("/", getUsers)

router.delete("/deleteUser/:uid",
    deleteUserValidator,
    deleteUser)

    router.put("/updateUser/:uid", 
        updateUserValidator,
         updateUser)

    router.patch("/updatePassword/:uid", 
        updatePasswordValidator, 
        updatePassword)

export default router