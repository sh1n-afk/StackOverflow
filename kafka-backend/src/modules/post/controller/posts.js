// import client from "../../../db/config/redis.config.js";
import Posts from "../../../db/models/mongo/posts.js";
import QuestionViews from "../../../db/models/mongo/questionViews.js";
import UserDetails from "../../../db/models/mongo/userDetails.js";
import Votes from "../../../db/models/mongo/votes.js"
import moment from "moment";

class QuestionController {
  responseGenerator = (statusCode, message) => ({
    status: statusCode,
    response: message,
  });

  fetchAllQuestions = async () => {
    let results = [];

    try {
      let questions = await Posts.find({ postType: "question" });

      questions.map((question) =>
        results.push({
          questionId: question._id,
          questionTitle: question.questionTitle,
          tags: question.questionTags,
          votes: question.votes,
          numberOfAnswers: question.numberOfAnswers,
          views: question.views,
          userId: question.userId,
          // username: question.username,
          addedAt: question.addedAt,
        })
      );

      return this.responseGenerator(200, results);
    } catch (err) {
      console.error(err);
      return this.responseGenerator(
        404,
        "Error when fetching question details"
      );
    }
  }

  fetch10kQuestions = async () => {
    try {
      let questions = await Posts.find({ postType: "question" });
      client.set("test-questions", JSON.stringify(questions));
      return this.responseGenerator(200, questions);
    } catch (err) {
      console.error(err);
      return this.responseGenerator(
        404,
        "Error when fetching question details"
      );
    }
  }


  fetchQuestionDetails = async (data) => {
      console.log(data);
  
      const { questionId, userId } = data;
      const tempUserID = userId
      console.log("data", questionId, userId);
      try {
        const questionDetails = await Posts.findById({ _id: questionId });
        // console.log("questionDetails",questionDetails);
  
        let answers = await Posts.find({ parentId: questionId });
        let question = await Posts.find({ _id: questionId });
  
        const userDetailsQuestionPoster = UserDetails.find({ _id: question.userId });
  
        // const votes = Votes.find({postId : questionId}).aggregate([
        //   {"$group" : {_id:{postId: "$postId", voteType: "$voteType"}, count:{$sum:1}}}
        // ]);
  
        // for await(const doc of votes){
        //     if(doc._id.voteType == "Upvote")
        //     {
        //         upvotes = doc.count;
        //     }
        //     if(doc._id.voteType == "Downvote" )
        //     {
        //         downvotes = doc.count
        //     }
        //     console.log("votes", doc.count, doc._id.voteType);
        //   }
  
        // console.log("answers",answers);
        let answersModified = [];
        if (answers && answers.length > 0) {
          for (var answer of answers) {
            var userArray = await Votes.find({ postId: answer._id });
            console.log("userarray", userArray)
            var userArray1 = userArray.filter(array => array.voteType === 'Upvote');
            var userArray12 = userArray.filter(array => array.voteType === 'Downvote');
            // console.log("asdsadsadsa", userArray1)
             console.log("asdsadsadsa222", userArray12)
            // console.log("asdsadsadsa", tempUserID)
            var found = false;
            for (var i = 0; i < userArray1.length; i++) {
              if (userArray1[i].userId == tempUserID) {
                found = true;
                break;
              }
            }
            var found2 = false;
            for (var i = 0; i < userArray12.length; i++) {
              if (userArray12[i].userId == tempUserID) {
                found2 = true;
                break;
              }
            }
            let { questionTitle, postType, parentId, description, shortdesc, votes, _id,
              views, numberOfAnswers,
              addedAt, modifiedAt, isAcceptedAnswerId, status, isAccepted, userId, comments, questionTags } = answer;
            let userDetails = await UserDetails.findById({ _id: userId });
  
            const obj = {
              _id: _id,
              questionTitle: questionTitle,
              postType: postType,
              parentId: parentId,
              description: description,
              shortdesc: shortdesc,
              upvotes: userArray1.length,//(await this.fetchVoteCount(answer._id, "Upvote")),
              downvotes: userArray12.length,//(await this.fetchVoteCount(answer._id, "Downvote")),
              votes: userArray1.length - userArray12.length,
              upvoteFlag:found ,//userId.length == 0 ? false : (await this.fetchVoteFlag(answer._id, "Upvote", userId)),
              downvoteFlag: found2,//userId.length == 0 ? false : (await this.fetchVoteFlag(answer._id, "Downvote", userId)),
              views: views,
              numberOfAnswers: numberOfAnswers,
              addedAt: addedAt,
              modifiedAt: modifiedAt,
              isAcceptedAnswerId: isAcceptedAnswerId,
              status: status,
              isAccepted: isAccepted,
              userId: userId,
              comments: comments,
              questionTags: questionTags,
              username: userDetails.username,
              profilePicture: userDetails.profilePicture,
              badges: userDetails.badges,
              reputation: userDetails.reputation,
            }
            answersModified.push(obj);
          }
        }
  
        var userArray = await Votes.find({ postId: questionDetails._id });
        console.log("userarray", userArray)
        var userArray1 = userArray.filter(array => array.voteType === 'Upvote');
        var userArray12 = userArray.filter(array => array.voteType === 'Downvote');
        var found = false;
        for (var i = 0; i < userArray1.length; i++) {
          if (userArray1[i].userId == tempUserID) {
            found = true;
            break;
          }
        }
        var found2 = false;
        for (var i = 0; i < userArray12.length; i++) {
          if (userArray12[i].userId == tempUserID) {
            found2 = true;
            break;
          }
        }
        const result = {
          questionId: questionDetails._id,
          questionTitle: questionDetails.questionTitle,
          views: questionDetails.views,
          description: questionDetails.description,
          createdTime: questionDetails.addedAt,
          modifiedAt: questionDetails.modifiedAt,
          tags: questionDetails.questionTags,
          votes: userArray1.length - userArray12.length,
          upvotes: userArray1.length,//(await this.fetchVoteCount(answer._id, "Upvote")),
          downvotes: userArray12.length,//(await this.fetchVoteCount(answer._id, "Downvote")),
          upvoteFlag:found ,//userId.length == 0 ? false : (await this.fetchVoteFlag(answer._id, "Upvote", userId)),
          downvoteFlag: found2,
          // upvotes: //(await this.fetchVoteCount(questionId, "Upvote")),
          // downvotes: (await this.fetchVoteCount(questionId, "Downvote")),
          // upvoteFlag: (await this.fetchVoteFlag(questionId, "Upvote", userId)),
          // downvoteFlag: (await this.fetchVoteFlag(questionId, "Downvote", userId)),
          comments: questionDetails.comments,
          numberOfAnswers: questionDetails.numberOfAnswers,
          answers: questionDetails.answers,
          isAcceptedAnswerId: questionDetails.isAcceptedAnswerId,
          questionComments: questionDetails.questionComments,
          username: userDetailsQuestionPoster.username,
          profilePicture: userDetailsQuestionPoster.profilePicture,
          badges: userDetailsQuestionPoster.badges,
          userId: questionDetails.userId,
          reputation: userDetailsQuestionPoster.reputation,
          answers: answersModified
        };
        return this.responseGenerator(200, result);
      } catch (err) {
        console.error("Error when fetching question details ", err);
        return this.responseGenerator(
          404,
          "Error when fetching question details"
        );
      }
    };


  fetchVoteCount = async (id, type) => {
    let count = 0;
    let votes = await Votes.find({ postId: id });
    for (var vote of votes) {
      if (vote.voteType == type) count++;
    }
    return count;
  }

  fetchVoteFlag = async (id, type, userId) => {
    let flag = false;
    let votes;
    if (userId == "") {
      votes = await Votes.find({ postId: id });
    }
    else {
      votes = await Votes.find({ postId: id, userId: userId });
    }
    console.log("votes", votes);
    for (var vote of votes) {
      console.log(vote.voteType, "equals", type);
      if (vote.voteType == type) flag = true;
    }
    return flag;
  }

  addView = async (data) => {
    console.log(data);
    const questionId = data.questionId;
    console.log("qid", questionId);
    const date = moment().format("MM-DD-YYYY");
    try {
      const result = await Posts.updateOne(
        { _id: questionId },
        { $inc: { views: 1 } }
      );
      console.log(result);

      const res = await QuestionViews.updateOne(
        { questionId: questionId, date: date },
        {
          $set: {
            questionId: questionId,
            date: date,
          },
          $inc: { views: 1 },
        },
        { upsert: true }
      );
      console.log(res);
      return this.responseGenerator(200, res);
    } catch (err) {
      console.error("Error when adding view count to question view ", err);
    }
  };

  postAnswer = async (data) => {
    console.log("Add answer");
    let time = new Date();
    let type = data.type;
    var modifiedAt = {
      type: type,
      date: time.toISOString()
    }
    var modifiedAt2 = {
      type: "answered",
      date: time.toISOString()
    }
    try {
      const newPost = new Posts({
        questionTitle: data.questionTitle,
        postType: "answer",
        parentId: data.questionId,
        description: data.description,
        shortdesc: data.shortdesc,
        questionTags: data.questionTags,
        addedAt: time.toISOString(),
        modifiedAt: modifiedAt,
        userId: data.userId,
      });
      const response = await newPost.save();
      const response2 = await Posts.findByIdAndUpdate(data.questionId,{$inc:{numberOfAnswers:1},modifiedAt:modifiedAt2});
       console.log(response2)
      return this.responseGenerator(200, response);
    } catch (err) {
      console.error("Error when posting answer ", err);
    }
  };

  postCommentToAnswer = async (data) => {
    const { answerId, description, userId, username } = data;
    let time = new Date();

    const comment = {
      description: description,
      userId: userId,
      username: username,
      postedOn: time.toISOString(),
    };

    try {
      const response = await Posts.findByIdAndUpdate(answerId, {
        $push: { comments: comment },
      }, {
        upsert: true, new: true
      });

      await UserDetails.updateOne({ _id: userId }, { $inc: { commentsCount: 1 } });
      console.log("comment successfully added to answer", answerId)
      res.status(200).send(response.comments);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };
}

export default QuestionController;
