import mongoose from "mongoose";

export default async function dbConfig() {
  try {
    const connect = await mongoose.connect(
      `${process.env.MONGODB_URI}/coloralchemy`
    );
    console.log("Connection established", connect.connection.name);
    
  } catch (e: any) {
    console.log("Connection failed");
    console.log(e.message);
  }
}
