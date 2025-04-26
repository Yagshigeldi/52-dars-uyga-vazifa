import { User } from '../models/user.model.js';
import { catchError } from '../middlewares/error.middleware.js';
import { userValidator } from '../validations/user.validation.js';
import { decode, encode } from '../utils/hash.util.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.util.js';

export class UserController {
    async createAdmin(req, res) {
        try {
            const { error, value } = userValidator(req.body);

            if (error) {
                throw new Error(`Error on creating admin: ${error}`);
            }

            const { username, password } = value;
            const checkAdmin = await User.findOne({ role });

            if (checkAdmin && role === 'admin') {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Admin already exists'
                });
            }

            const hashedPassword = await decode(password, 7);
            const admin = await User.create({
                username, hashedPassword, role: 'admin'
            });

            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: admin
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async registerUser(req, res) {
        try {
            const { error, value } = userValidator(req.body);

            if (error) {
                throw new Error(`Error on creating user: ${error}`);
            }

            const { fullName, email, password } = value;
            const hashedPassword = await decode(password, 7);
            const newUser = await User.create({
                fullName, email, password: hashedPassword, role: 'user'
            });

            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newUser
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error("User not found");
            }

            const isMatchPassword = await encode(password, user.hashedPassword);

            if (!isMatchPassword) {
                throw new Error("Invalid password");
            }

            const payload = {
                id: user._id,
                role: user.role
            }

            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: accessToken
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id
            const user = await User.findById(id);

            if (!user) {
                throw new Error("User not found");
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'succcess',
                data: user
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async getAllUsers(_, res) {
        try {
            const users = await User.find();

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: users
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id
            const user = await User.findById(id);

            if (!user) {
                throw new Error("User not found");
            }

            const updatedUser = await User.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

            res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updatedUser
            });
        } catch (error) {
            catchError(error, res);
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await User.findById(id);

            if (!user) {
                throw new Error("User not found");
            }

            if (user.role === 'admin') {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Danggg'
                });
            }

            await User.findByIdAndDelete(id);

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}