import Joi from "joi";
import JoiObjectId from "joi-objectid";

// __USER__
//validation for login

const myJoiObjectId = JoiObjectId(Joi);
export const signupUserVal = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(5).max(250).required(),
      });
      return schema.validate(user);
};

//validation for login
export const loginUserVal = (user) => {
    const schema = Joi.object({
      email: Joi.string().email().label('Email'),
      password: Joi.string().alphanum().min(5).max(250).required().label('Password'),
    });
    return schema.validate(user);
};

