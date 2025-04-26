import { Car } from "../models/car.model.js";

export const carController = {
    getAll: async (req, res, next) => {
        try {
            const allCars = await Car.find();

            return res.status(200).json({ message: "ok", parkings: allCars });
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

            const car = await Car.findById(id);

            if (!car) {
                return res.status(404).json({ message: "Car by id not found" });
            }

            return res.status(200).json({ message: "ok", car: car });
        } catch (error) {
            next(error);
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body;

            const newCar = new Car({
                ...body,
            });

            await newCar.save();
            return res.status(201).json({ message: "ok", parking: newCar });
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

            const updatedCar = await Car.findByIdAndUpdate(id, { body });

            return res.status(200).json({ message: "ok", car: updatedCar });
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

            await Car.findByIdAndDelete(id);

            return res.status(200).json({ message: "ok", data: {} });
        } catch (error) {
            next(error);
        }
    },
};