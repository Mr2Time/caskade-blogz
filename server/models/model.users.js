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
    minlength: 7,
    maxlength: 250,
  },
});

const User = mongoose.model("User", userSchema);

export { User };
