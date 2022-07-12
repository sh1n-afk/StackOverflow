import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postActivitySchema = new Schema({
  activityType: { type: String, required: true },
  activityTypeDescription: {type: String},
  userId: { type: Schema.Types.ObjectId, ref: "userDetails" },
  license: { type: String },
  comment: { type: String },
  time: { type: Date, required: true },
  postId: { type: Schema.Types.ObjectId, ref: "post" },
});

const PostActivities = mongoose.model("postActivity", postActivitySchema);
export default PostActivities;
