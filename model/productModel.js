import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    packaging: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      require: true,
    },

    quantity: {
      type: Number,

      require: true,
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
  },
  { collection: "Product", timestamps: true }
);
productSchema.pre(['find','findOne'],function(){
    this.populate('subCategory')
  })
const Product = model("product", productSchema);
export default Product;
