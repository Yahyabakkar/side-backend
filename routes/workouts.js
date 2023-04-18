import express from "express"

const router = express.Router()
//get all workouts
router.get ('/' , (req , res )=>{
    res.json ({mssg: 'get all workouts'})
})

//get workout by id     
router.get ('/:id' , (req , res )=>{
    res.json ({mssg: 'get by id'})
})
//create a new workout 
router.post ('/' , (req , res )=>{
    res.json ({mssg: 'create new workout'})
})
//Delete workout
router.delete ('/:id' , (req , res )=>{
    res.json ({mssg: 'delete  workout'})
})
//Edit workout
router.patch ('/:id' , (req , res )=>{
    res.json ({mssg: 'edit workout'})
})

export default router