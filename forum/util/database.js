import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://admin:930209@next-test.9mvl1pm.mongodb.net/?retryWrites=true&w=majority&appName=next-test";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
