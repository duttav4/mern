import mongoose from "mongoose";

const mongoDB = async()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO)
        console.log(`Connected to MongoDB ${con.connection.host}`);
    } catch (error) {
        console.log(error)
    }
}

export default mongoDB;