import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
    process.exit(1);
  }
};

export default dbConnect;
