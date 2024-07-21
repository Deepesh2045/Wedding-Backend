import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbName: string | undefined = process.env.DB_NAME;
const dbUserName: string | undefined = process.env.DB_USER_NAME;
const dbPassword: string | undefined = process.env.DB_PASSWORD;

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.71vcmho.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Connection Failed");
    console.log((error as Error).message);
  }
};

export default connectDb;
