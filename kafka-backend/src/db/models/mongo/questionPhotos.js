import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionPhotosSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "question",
  },
  photoTitle: { type: String },
  questionPhotoUrl: { type: String },
  isPhotoApprovedByAdmin: { type: String, default: "PENDING" },
});

const QuestionPhotos = mongoose.model("questionPhoto", questionPhotosSchema);

export default QuestionPhotos;
