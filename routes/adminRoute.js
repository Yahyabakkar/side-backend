import express from "express";
const router = express.Router();
import controller from "../controllers/adminController.js"
import { verifyToken,isSuperAdmin} from "../middleware/auth.js";

router.post("/register",verifyToken,isSuperAdmin,controller.register)
router.post("/login",controller.login)
router.put("/upgrade/:id",verifyToken,isSuperAdmin,controller.upgradeRole)
router.delete("/delete/:id",verifyToken,isSuperAdmin,controller.deleteAdmin)
router.get("/",verifyToken,isSuperAdmin,controller.getallAdmin)
router.put("/update/:id",verifyToken,isSuperAdmin,controller.updateAdmin)
export default router;

