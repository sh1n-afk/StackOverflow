import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userActivitySchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "post" },
  postTitle: {type: String, required: true},//check with utkarsh
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