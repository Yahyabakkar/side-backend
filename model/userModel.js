import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
     
    },
    phoneNum: {
      type: String,
      required: true,
      unique:"the phone number is already used"
    },
    email: {
      type: String,
      required: true,
      unique:"the email is already used"
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role:{
      type:Number,
      default:2
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
userSchema.pre("save", function (next) {
 
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(this.password, salt) )
    .then((hashPassword) => {
      this.password = hashPassword;
      next();
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
  
});
const user = model("user", userSchema);
export default user;
