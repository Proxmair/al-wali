import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
  await mongoose.connect(MONGODB_URI);

  isConnected = true;

  console.log("MongoDB Connected");
}