import dotenv from "dotenv";
import express from "express"
import routesworkout from "./routes/workouts.js"
import routesAdmin from "./routes/adminRoute.js"
import routesUser from "./routes/userRoute.js"
import routesProduct from "./routes/productRoute.js"
import mongoose from "mongoose";
//express app
const app = express()
//middleware
app.use(express.json())
app.use ((req,res,next) =>{
    console.log(req.path , req.method)
    next()
})
dotenv.config()
//routes
app.use ('/api/workouts',routesworkout)
app.use ('/api/admin',routesAdmin)
app.use ('/api/user',routesUser)
app.use ('/api/product',routesProduct)

//connect to db
mongoose.connect(process.env.MONG_URI)
.then(() => {
    
//listen for request
app.listen(process.env.PORT, ()=> {
    console.log(' connected to db ,listening on port',process.env.PORT)
})
process.env
})
.catch((error)=> {
    console.log(error)
})

