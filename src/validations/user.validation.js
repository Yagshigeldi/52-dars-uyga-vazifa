import Joi from 'joi';

const user = Joi.object({
    fullName: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(20).required(),
    role: Joi.string().valid('user', 'admin').required().default('user')
});

export const userValidator = (data) => {
    return user.validate(data);
}