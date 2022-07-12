import mongoose from "mongoose";

const Schema = mongoose.Schema;

const votesSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "userDetails"},
    voteType: {type: String, required: true},
    postId: { type: Schema.Types.ObjectId, ref: "post" },
    creationDate : {type: Date, required : true}
});

const Votes = mongoose.model("vote", votesSchema);

export default Votes;
