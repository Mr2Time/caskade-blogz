// controller files are used to divide code up, this file divides the code for user.route.js

import bcrypt, { hashSync } from "bcrypt";
import { User } from "../models/model.users.js";

import { signupUserVal } from "../validation/validation.user.js";

export const userSignup = async (req,res) => {

  try {
    const { error } = signupUserVal(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) return res.status(409).send({ message: "User's already registered. Use a different E-mail." });

    const hashedPass = bcrypt.hashSync(password, 10);
    
    const newUser = new User({email,  password: hashedPass});
    await newUser.save();

    res.status(201).send({ message: "User's registered successfully." });

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};
