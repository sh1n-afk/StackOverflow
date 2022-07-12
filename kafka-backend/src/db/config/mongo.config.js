import mongoose from "mongoose";

const mongoInit = () => {
  let mongoUri =
    "mongodb+srv://root:hPchUowqPX2iz2t9@stackoverflow-cluster.mic5y.mongodb.net/stackoverflow?retryWrites=true&w=majority";
  try {
    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 500,
    });
    console.log("Mongoose is connected!");
  } catch (err) {
    console.error("Could not connect Mongoose => ", err);
  }
};

export default mongoInit;
