import mongoose from "mongoose";

export default async function connectToDB() {
  let db = process.env.mdb;
  try {
    mongoose.connect(db);
    console.log("Connected to MongoDB .....");
  } catch (e) {
    console.error(`Failed To connect to MongoDB....`);
  }
}

