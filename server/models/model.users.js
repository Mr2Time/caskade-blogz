import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

/* Creating a new schema for the User model. */
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
  },
  blogs: {
    type: [],
    required: true,
  },

});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
}

const User = mongoose.model("User", userSchema);

export { User };
