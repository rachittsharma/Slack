import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);

    console.log(
      " MongoDB connected successfully:",
      mongoose.connection.host,
      "DB:",
      mongoose.connection.name
    );
  } catch (error) {
    console.error(" Error in connecting to MongoDB:", error.message);
    process.exit(1); // status code 1 indicates error
  }
};
