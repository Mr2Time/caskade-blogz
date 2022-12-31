import { Blog } from "../models/model.blog.js";
import { User } from "../models/model.users.js";
import { blogVal } from "../validation/validation.blog.js";

export const postBlog = async (req, res) => {
  try {
    const { error } = blogVal(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checks if user sent email/username & checks password, sends over info
    console.log(req.body)
    const user = await User.findOne({ _id: req.body.userId });
    console.log("USER: ",user)

    if (!user)
      return res.send({
        status: 401,
        message: "Invalid account.",
      });

    // checks if post already exists
    let content = await Blog.findOne({ content: req.body.content });
    let title = await Blog.findOne({ title: req.body.title });

    if (!content && !title) {
      const blog = await new Blog(req.body);
      await blog.save();

      res.json({
        status: 200,
        message: "Post saved succesfully.",
        blog: blog,
      });
    } else {
      res.json({
        status: 400,
        message: "Another post with the same title or content exists.",
      });
    }
  } catch (er) {
    res.send({
      status: 400,
      message: `Error ${er}`,
    });
  }
};

// test get

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.find();
    res.json(blog);
  } catch (er) {
    res.send({
      status: 400,
      message: `Error ${er}`,
    });
  }
}
