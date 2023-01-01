import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
    minlength: 2,
  },
  content: {
      type: String,
      required: true,
      unique: true,
      maxlength: 5000,
      minlength: 5,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 5,
  },
  tags: {
    type: Array,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, {
  timestamps: true,
  unique: ['userId', 'title']
});

const Blog = mongoose.model("Blog", blogSchema);

export { Blog };
