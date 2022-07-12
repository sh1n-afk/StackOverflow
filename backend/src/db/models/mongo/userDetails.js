import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
  username: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  profilePicture: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/etsy-lab1.appspot.com/o/userdefault.png?alt=media&token=d8869205-3aff-41db-b84d-cc57b92d4e50",
  },
  accountType: { type: String, required: true },
  reputation: { type: Number, default: 1 },
  location: {
    city: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  tags: [
    {
      tagId: { type: Schema.Types.ObjectId },
      name: { type: String },
      score: { type: Number, default: 0 },
      posts: { type: Number , default: 0},
    },
  ],
  badges: [
    {
      name: { type: String },
      type: { type: String },
      tagBased: { type: Boolean },
    },
  ],
  bookmarkedQuestions: [{ type: Schema.Types.ObjectId, ref: "post" }],
  joiningDate: { type: Date, required: true },
  visitedTime: { type: Date, required: true },
  questionsAskedCount: { type: Number, default: 0 },
  questionsAnsweredCount: { type: Number, default: 0 },
  upvotesCount: { type: Number, default: 0 },
  downvotesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  questionsViewCount: { type: Number, default: 0 },
  about: { type: String, default: "" },
});

const UserDetails = mongoose.model("userDetails", userDetailsSchema);

export default UserDetails;
