import { Schema, model } from 'mongoose';

import { collections } from '../config/collections.js';

const parkingSchema = new Schema(
    {
        location: {
            type: String,
            trim: true,
            required: true
        },
        slotNumber: {
            type: Number,
            required: true
        },
        isBooked: {
            type: Boolean,
            required: true,
            default: false
        },
        bookedBy: {
            type: Schema.Types.ObjectId,
            ref: collections.user,
            required: true
        },
        car: {
            type: Schema.Types.ObjectId,
            ref: collections.car,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Parking = model(collections.parking, parkingSchema);