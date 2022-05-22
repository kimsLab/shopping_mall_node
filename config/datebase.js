import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("connectDB")
    } catch (err) {
        console.log(err)
    }
}

export default connectDB