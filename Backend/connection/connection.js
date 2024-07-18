import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.DATABASE_URL;
const connect = mongoose.connect(url).then(()=>{
    console.log("connection successful ");
}).catch((error)=>{
    console.log("error while connection : ",error);
});

export default connect;