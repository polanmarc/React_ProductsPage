import mongoose from "mongoose";
mongoose.set("sanitizeFilter", true);
mongoose.set('strictQuery', false);

console.log(process.env)

const { MONGODB_USER, MONGODB_HOST, MONGODB_PASSWORD, MONGODB_LOCAL_PORT, MONGODB_DB } = process.env;

// const url = "mongodb://root:P%2540ssw0rd@mongodb:27017";
// const url = `mongodb://${MONGODB_USER}:P%2540ssw0rd@$mongodb:${MONGODB_LOCAL_PORT}?authSource=admin`;

const url = `mongodb://root:P%252540ssw0rd@mongodb:27017`;

mongoose.connect(url);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database is connected");
});