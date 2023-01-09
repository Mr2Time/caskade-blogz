import Joi from "joi";
import JoiObjectId from "joi-objectid";

const myJoiObjectId = JoiObjectId(Joi);
export const blogVal = (blog) => {
    const schema = Joi.object({
      title: Joi.string().min(2).max(50).required(),
      content: Joi.string().min(5).max(10000).required(),
      description: Joi.string().min(5).max(500).required(),
      tags: Joi.array().items(Joi.string()).required(),
      userId: myJoiObjectId,
    });
    return schema.validate(blog);
};