import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URI;
if (!MONGODB_URL) {
  throw new Error("Provide mongodb url");
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function DBConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGODB_URL, {
        bufferCommands: false,
        dbName: "boostMe",
      });
      cached.conn = await cached.promise;
    } catch (error) {
   
      throw new Error("Connection to mongoDb failed");
    }

    return cached.conn;
  }
}
