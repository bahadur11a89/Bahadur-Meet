import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  try {
    if (!env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    console.log('Connecting to MongoDB...');

    const connection = await mongoose.connect(env.MONGO_URI);

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );

    console.log(
      `MongoDB Database: ${connection.connection.name}`
    );

    return connection;
  } catch (error) {
    console.error('MongoDB Connection Failed');
    console.error(error.message);

    throw error;
  }
};