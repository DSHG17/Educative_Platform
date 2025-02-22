import { Router } from "express"
import { register, login} from "./auth.controller.js"
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
import { registerValidator, loginValidator } from "../middlewares/user-validators.js";

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator,
    register,
)

router.post("/login",
     loginValidator,
      login)

export default router