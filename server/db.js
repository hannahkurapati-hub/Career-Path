import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB(uri) {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn('⚠️ MONGODB_URI not found. Running in local JSON storage mode.');
    return false;
  }

  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(`🍃 Connected to MongoDB Atlas (${conn.connection.host}/${conn.connection.name})`);
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    isConnected = false;
    return false;
  }
}

export function isMongoConnected() {
  return mongoose.connection.readyState === 1;
}
