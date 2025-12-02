import express from "express";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import connect from "./db/connect.js";
import "dotenv/config"

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api",userRouter)

async function start(){
    try {
        await connect()
        const port = process.env.PORT || 5000
        app.listen(port,()=>{
            console.log("listening on port 5000")
        })
    } catch (error) {
        console.log(error)
    }
}

start()