import mongoose from "mongoose";
import moment from "moment";

const Schema = mongoose.Schema;

const questionViewsSchema = new Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "question" },
  questionName: { type: String },
  date: { type: String, default: moment().format("MM-DD-YYYY") },
  views: { type: Number, default: 0 },
});

const QuestionViews = mongoose.model("questionView", questionViewsSchema);

export default QuestionViews;
