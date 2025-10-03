import mongoose from "mongoose";

const connectDB= async()=>{
    try{
        const connection= await mongoose.connect(process.env.MONGO_URL_LOCAL)
        console.log(`connected to mongodb  ${mongoose.connection.host}`)
    } catch(error){
        console.log("error is ",error)
    }
};
export default connectDB;