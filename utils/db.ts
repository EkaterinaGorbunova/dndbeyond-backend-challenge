// MongoDB connection setup
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}
