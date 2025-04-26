import { catchError } from "../middlewares/error.middleware.js";

export const adminGuard = (req, res, next) => {
    try {
        const user = req?.user;

        if (!user || user.role != 'admin') {
            return res.status(403).json({
                statusCode: 403,
                message: 'Forbidden user'
            });
        }

        next();
    } catch (error) {
        catchError(error, res);
    }
}