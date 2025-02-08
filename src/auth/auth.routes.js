import { Router } from "express"
import { register} from "./auth.controller.js"
import { uploadProfilePicture } from "../middlewares/multer-upload.js";

const router = Router()

router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"), 
    register
)

export default router