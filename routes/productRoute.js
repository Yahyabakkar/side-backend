
import express from "express";
import controller from "../controllers/productController.js";
import uploadImage from "../middleware/image.js";
const router = express.Router();
router.get("/", controller.getAll);
router.get("/:name", controller.getByName);
router.get("/subcategory/:id", controller.getSubCategory);
router.get("/:id", controller.getById);
router.post("/",uploadImage,  controller.addProduct);
router.put("/:id", uploadImage,controller.editProduct);
 router.delete("/:id",  controller.deleteProduct);
export default router;


