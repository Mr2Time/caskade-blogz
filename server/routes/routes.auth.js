import bcrypt, {compareSync}from "bcrypt";

import { User } from "../models/model.users.js";
import { loginUserVal } from "../validation/validation.user.js";

export const userAuth = async (req, res) => {
  try {
    const { error } = loginUserVal(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checks if user sent email/username & checks password, sends over info
    const user = await User.findOne({ email: req.body.email});

    if (!user)
      return res.send({
        status: 401,
        message: "Invalid credentials.",
      });
    const validatePassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!validatePassword)
      return res.send({
        status: 401,
        message: "Invalid credentials.",
      });

      res.json({
        status: 200,
        message: "login success",
        user: user,
      });
  } catch (er) {
    res.send({
      status: 400,
      message: `Error ${er}`,
    });
  }
};