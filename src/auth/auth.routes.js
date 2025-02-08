import { Router } from "express"
import { register} from "./auth.controller.js"
import { uploadProfilePicture } from "../middlewares/multer-upload.js";
import { registerValidator } from "../middlewares/check-validators.js";

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator,
    register,
)

export default router