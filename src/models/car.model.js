import { Schema, model } from 'mongoose';

import { collections } from '../config/collections.js';

const carSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: collections.user,
            required: true
        },
        plateNumber: {
            type: String,
            trim: true,
            required: true
        },
        model: {
            type: String,
            trim: true,
            required: true
        },
        color: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Car = model(collections.car, carSchema);