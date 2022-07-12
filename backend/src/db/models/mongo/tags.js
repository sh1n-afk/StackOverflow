import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tagsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "post", default: [] }],
});

const Tags = mongoose.model("tag", tagsSchema);

export default Tags;
