import express from 'express';
import router from "./routes/testRoute.js"
import userRouter from "./routes/userRoute.js"
import todoRoute from "./routes/todoRoute.js"
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config()
connectDB()

const app=express()
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

app.get("/test", (req, res) => {
  res.send("Headers check");
});


app.use("/api/v1/user",userRouter);
app.use("/api/v1/todo",todoRoute);
app.use("/api/v1/test",router);


const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("server is running on nodemon")
});