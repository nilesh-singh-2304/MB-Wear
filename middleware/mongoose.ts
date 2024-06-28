import mongoose from "mongoose";

const connectDB = handler => async(Request,Response)=>{
    if(mongoose.connections[0].readyState){
        return handler(Request,Response)
    }
    await mongoose.connect(process.env.MONGO_URI)
    return handler(Request,Response)
}

export default connectDB