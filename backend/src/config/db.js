import mongoose from "mongoose";

const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL)
         console.log("Connected database successfully");
    }
    catch(error){
        console.error("Error connecting to mongodb database",error);
    }
}
export default connectDB;