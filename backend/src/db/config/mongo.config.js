import mongoose from "mongoose";
import app from "../../../app.js";

const mongoInit = () => {
  let mongoUri =
    "mongodb+srv://root:hPchUowqPX2iz2t9@stackoverflow-cluster.mic5y.mongodb.net/stackoverflow?retryWrites=true&w=majority";
  try {
    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // maxPoolSize: 500,
    });
    console.log("Mongoose is connected!");
    // app.listen(3001, () => {
    //   console.log("Server listening on port 3001");
    // });
  } catch (err) {
    console.error("Could not connect Mongoose => ", err);
  }
};

export default mongoInit;
