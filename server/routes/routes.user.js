// controller files are used to divide code up, this file divides the code for user.route.js

import bcrypt, { hashSync } from "bcrypt";
import { User } from "../models/model.users.js";

import { signupUserVal } from "../validation/validation.user.js";

export const userSignup = async (req,res) => {
    const { error } = signupUserVal(req.body);
    if (error) return res.status(406).send({ message: error.details[0].message });
    try {
      const { email, password } =
        req.body;
      const user = await new User({
        email: email,
        password,
      });
  
      user.password = bcrypt.hashSync(user.password, 10);
      const result = await user.save();
  
      let sendData = { ...result._doc };
      // delete sendData.password;
      delete sendData.__v;
  
      res.send({
        status: 200,
        message: "User Registered Successfully",
        userInfo: sendData,
      });
    } catch (er) {
      res.send({
        status: 400,
        message: `Error with registration: ${er}`,
      });
    }
};
