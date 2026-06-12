import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4  // ← forces IPv4, fixes many ECONNREFUSED errors
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log("Connection error:", error);
    process.exit(1);
  }
};

export default connectDB;