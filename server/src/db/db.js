import mongoose from "mongoose";

const uri = process.env.DATABASE_URL;
const connectDB = async () => {
  await mongoose.connect(uri);
  console.log("Mongoose connected to Atlas");
};

export default connectDB;
