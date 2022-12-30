import mongoose from "mongoose";


export default async function connectToDB() {
  let db = process.env.mdb;
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB .....");
  } catch (e) {
    console.error(`Failed To connect to MongoDB....`);
  }
}

