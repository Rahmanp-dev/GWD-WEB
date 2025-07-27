import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gwd-web-db";

// A global cache for the Mongoose connection.
// This prevents creating a new connection on every serverless function invocation,
// which is inefficient and can lead to connection limit issues.
let cached: {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
} = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  // If a connection is already cached, return it immediately.
  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection");
    return cached.conn;
  }

  // If a connection promise is not already in progress, create one.
  if (!cached.promise) {
    console.log("🔍 Creating new MongoDB connection promise");
    const opts = {
      bufferCommands: false, // Disable buffering to throw errors immediately if connection fails
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("🎉 MongoDB connection successful");
      return mongooseInstance;
    }).catch(error => {
      console.error("❌ MongoDB connection failed:", error);
      // Set the promise to null so the next attempt can try to reconnect.
      cached.promise = null;
      throw error;
    });
  }

  try {
    // Await the connection promise to resolve.
    cached.conn = await cached.promise;
  } catch (e) {
    // If the promise rejects, throw the error to be handled by the calling function.
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

export default dbConnect;