import Product from "../model/productModel.js";
import fs from "fs";
class Controller {
  // get one Product by id
  async  getByName(req, res, next) {
    let { name } = req.params;
    try {
      const product = await Product.findOne({ name: name });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ success: "Product found", product});
    } catch (err) {
      next(err);
    }
  }
  // getAllProduct have the same subCategory
  async  getSubCategory(req, res, next) {
    let { id} = req.params;
    try {
      const product = await Product.find({ subCategory: id });
      if (!product) {
        return res.status(404).json({ error: "Not Product found in this subcategory  " });
      }
      res.status(200).json({ success: "Product found in this subcategory", product});
    } catch (err) {
      next(err);
    }
  }
  // get Product using ID 
  async  getById(req, res, next) {
    let { id} = req.params;
    try {
      const product = await Product.findOne({ _id : id });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ success: "Product found", product});
    } catch (err) {
      next(err);
    }
  }
  // get all Product
  async getAll(req, res, next) {
    try {
      const response = await Product.find({});
      res
        .status(200)
        .json({ success: "All product getting successfully", response });
    } catch (err) {
      next(err);
    }
  }
  // edit product
  async editProduct(req, res, next) {
    const { id } = req.params;
    await Product.findOneAndUpdate({ _id: id }, req.body)
      .then((product) => {
        if (req.body.image) fs.unlinkSync(product.image);
        res.status(200).send({ status: 200, message: product });
      })
      .catch((err) => {
        next(err);
      });
  }
  //   delete product by id
  async deleteProduct(req, res, next) {
    const { id } = req.params;
    await Product.findOneAndDelete({ _id: id })
      .then((product) => {
        fs.unlinkSync(product.image);
        res.status(200).json({ status: 200, message: `Successfully deleted` });
      })
      .catch((error) => {
        next(error);
      });
  }
  // create Product

  async addProduct(req, res, next) {
    const product = await new Product(req.body);
    product
      .save()
      .then((response) => {
        res.status(201).send({ status: 201, message: response });
      })
      .catch((err) => {
        next(err);
        console.log(err);
      });
  }
}

const controller = new Controller();
export default controller;
