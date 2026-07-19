import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI! || "mongodb+srv://alwalistore3_db_user:ewqstE02d6N1RZVu@cluster0.bpaklnp.mongodb.net/";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(MONGODB_URI);

  isConnected = true;

  console.log("MongoDB Connected");
}