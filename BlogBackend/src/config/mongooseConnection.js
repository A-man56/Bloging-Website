import mongoose from "mongoose";

const connectToMongoose = () => {
  const url = process.env.URL;
  mongoose
    .connect(url)
    .then(() => {
      console.log("Mongoose is connected Successfully!");
    })
    .catch((err) => {
      console.log("Something went wrong while connecting Mongoose!");
    });
};
export default connectToMongoose;
