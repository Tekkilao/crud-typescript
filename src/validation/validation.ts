import Joi from '@hapi/joi';

export const registerValidation = (data: string) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required(),
        password2: Joi.string().min(3).required(),
    });
    return schema.validate(data);
}

