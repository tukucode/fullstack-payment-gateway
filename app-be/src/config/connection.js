import mongoose from "mongoose";

try {
  await mongoose.connect("mongodb://127.0.0.1:27017/db_tokopulsa");
  console.log("Connection db success");
} catch (error) {
  console.log("Connection db failed", error);
}
