import { MongoClient } from "mongodb";

const { MONGO_URI } = process.env;

const connectToDB = async () => {
  try {
    const client = await MongoClient.connect(MONGO_URI);
    console.log("Connected to DB");
    return client;
  } catch {
    return null;
  }
};

export default connectToDB;
