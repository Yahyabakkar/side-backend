import user from "../model/userModel.js";

import bcrypt from 'bcryptjs'

import jwt from "jsonwebtoken";
export function createuser(req, res, next) {
  const user = new user(req.body);
  user
    .save()
    .then((response) => {
      res.status(201).send({ status: 201, message: response });
    })
    .catch((err) => {
      next(err);
      console.log(err);
    });
}
export function getuser(req, res, next) {
  const { id } = req.params;
  user.find({ _id: id })
    .then((offer) => {
      res.status(200).send({ status: 200, message: offer });
    })
    .catch((err) => {
      next(err);
    });
}

export function getusers(req, res, next) {
  user.find({})
    .then((offers) => {
      res.status(200).send({ status: 200, message: offers });
    })
    .catch((err) => {
      next(err);
    });
}

export function edituser(req, res, next) {
  const { id } = req.params;
  user.findOneAndUpdate({ _id: id }, req.body)
    .then((offer) => {
      res.status(200).send({ status: 200, message: offer });
    })
    .catch((err) => {
      next(err);
    });
}

export function deleteuser(req, res, next) {
  const { id } = req.params;
  user.findOneAndDelete({ _id: id })
    .then((offer) => {
      res.status(200).send({ status: 200, message: `Successfully deleted` });
    })
    .catch((error) => {
      next(error);
    });
}

export function loginuser(req, res, next) {
 const userLoggingIn=req.body;
  user.findOne({email: userLoggingIn.email})
  .then((user) => {
    if(!user){
      res.send({message:"invalid user"})

    }
    bcrypt.compare(userLoggingIn.password,user.password)
    .then((isCorrect)=>{
      if(isCorrect){
        const payload={
          id:user.id,
          email:user.email,
          role:user.role,
        }
        jwt.sign(
          payload,
          process.env.JWT_KEY,
          {expiresIn:86400},
          (err,token)=>{
            if(err) res.send({message:err})
            res.send({message:"success",token:token})
          }
        )
      }else{
        res.status(403).send({message:"invalid_token"})
      }
    })
  })

  
}
