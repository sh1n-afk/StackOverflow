import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userActivitySchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "post" },
  activityType: { type: String, required: true },
  points: {type: Number, required: true},
  date: { type: Date, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "userDetails",
  },
});

const UserActivities = mongoose.model("userActivity", userActivitySchema);
export default UserActivities;