import { connect } from "mongoose";
import { config } from '../config/index.js';

export const connectDB = async () => {
    try {
        await connect(config.db.mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(`MongoDB connection failed: ${error}`);
        process.exit(1);
    }
}