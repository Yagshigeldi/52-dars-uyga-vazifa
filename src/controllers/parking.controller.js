import { Parking } from "../models/parking.model.js";

export const parkingController = {
    getAll: async (req, res, next) => {
        try {
            const allParkings = await Parking.find();

            return res.status(200).json({ message: "ok", parkings: allParkings });
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({ message: "ID not found" });
            }

            const parking = await Parking.findById(id);

            if (!parking) {
                return res.status(404).json({ message: "Parking by id not found" });
            }

            return res.status(200).json({ message: "ok", parking: parking });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;

            const newParking = new Parking({
                ...body,
            });

            await newParking.save();
            return res.status(201).json({ message: "ok", parking: newParking });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({ message: "ID not found" });
            }

            const body = req.body;

            const updatedParking = await Parking.findByIdAndUpdate(id, { body });

            return res.status(200).json({ message: "ok", parking: updatedParking });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({ message: "ID not found" });
            }

            await Parking.findByIdAndDelete(id);

            return res.status(200).json({ message: "ok", data: {} });
        } catch (error) {
            next(error);
        }
    },
};