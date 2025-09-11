import mongoose from "mongoose";

function encodeMongoURI(uri: string): string {
    const srv = uri.startsWith("mongodb+srv://");
    const protocol = srv ? "mongodb+srv://" : "mongodb://";
    const uriWithoutProtocol = uri.substring(protocol.length);

    const atIndex = uriWithoutProtocol.lastIndexOf('@');
    if (atIndex === -1) {
        // No credentials
        return uri;
    }

    const host = uriWithoutProtocol.substring(atIndex + 1);
    const credentials = uriWithoutProtocol.substring(0, atIndex);

    const colonIndex = credentials.indexOf(':');
    if (colonIndex === -1) {
        // Only username
        const encodedUser = encodeURIComponent(credentials);
        return `${protocol}${encodedUser}@${host}`;
    } else {
        const user = credentials.substring(0, colonIndex);
        const password = credentials.substring(colonIndex + 1);
        const encodedUser = encodeURIComponent(user);
        const encodedPassword = encodeURIComponent(password);
        return `${protocol}${encodedUser}:${encodedPassword}@${host}`;
    }
}

// Using a global variable to maintain a cached connection across hot reloads in development.
// This prevents connections from growing exponentially during API Route usage.
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found. Please define it in .env.local");
    console.error("Expected format: MONGODB_URI=mongodb://127.0.0.1:27017/gwd");
    throw new Error(
      "MONGODB_URI is not defined. Please check your environment variables."
    );
  }

  console.log("🔍 Checking MongoDB URI:", MONGODB_URI);

  if (cached.conn) {
    console.log("✅ Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    const encodedURI = encodeMongoURI(MONGODB_URI);

    console.log("⏳ Attempting to connect to MongoDB...");
    console.log("📍 Connection URI:", encodedURI);
    
    cached.promise = mongoose.connect(encodedURI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      console.log("📊 Database:", mongoose.connection.db?.databaseName || "Unknown");
      console.log("🔗 Connection state:", mongoose.connection.readyState);
      return mongoose;
    }).catch(err => {
      console.error("❌ MongoDB connection failed");
      console.error("🔍 Error details:", err.message);
      console.error("💡 Make sure MongoDB is running on your local machine");
      console.error("💡 Try: mongod --dbpath /path/to/data/directory");
      
      // Reset promise on failure to allow retries
      cached.promise = null; 
      throw err;
    });
  }
  
  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connection established and cached");
  } catch (e) {
    // If connection fails, reset the promise to allow future attempts.
    cached.promise = null;
    console.error("❌ Failed to establish MongoDB connection");
    throw e;
  }

  return cached.conn;
}
