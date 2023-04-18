import express from "express";
const router = express.Router();
import {
  createuser,
  getuser,
  getusers,
  edituser,
  deleteuser,
  loginuser
} from "../controllers/userController.js";

router.post("/", createuser);
router.get("/:id", getuser);
router.get("/", getusers);
router.patch("/:id", edituser);
router.delete("/:id", deleteuser);
router.post("/login",loginuser)
export default router;
