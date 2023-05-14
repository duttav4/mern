import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/db.js";
import authRouter from "./routes/AuthRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import cors from "cors";

//dotenc config
dotenv.config()

//Database Connection
mongoDB();

// rest object
const app = express();

//middlewares
app.use(express.json())
app.use(cors())

//routing
app.use("/api/medi/auth", authRouter);
app.use("/api/medi/user", userRouter);
app.use("/api/medi/hospital", hospitalRouter);

// rest api
app.get("/", (req, res)=>{
    res.send({
        message:"welcome to MediRehab"
    })
})

//port
const Port = process.env.Port 

app.listen(Port, ()=>{
    console.log(`Server Running on Port ${Port}`)
})