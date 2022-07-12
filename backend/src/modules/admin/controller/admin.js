import Posts from "../../../db/models/mongo/posts.js";
import Tags from "../../../db/models/mongo/tags.js";

class AdminController {
  checkHealth = async (req, res) => {
    res.status(200).send("Up and Running");
  };

  updateQuestionStatus = async (req, res) => {
    const { postId } = req.body;
    let time = new Date();
    console.log("update question status",req.body)

    try {
      const response = await Posts.findByIdAndUpdate(
        { _id: postId },
        {
          $set: {
            status : "APPROVED"
          }
        },
      );
     
      console.log("updated question status",response)
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  top10MostViewedQuestions = async (req, res) => {
    try {
      const response = await Posts.find({postType : "question"}, {views : 1, questionTitle: 1 }).sort({views:-1}).limit(10)
      console.log("top 10 most viewed",response)
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  }

  top10MostUsedTags = async (req, res) => {
   
  }
}

export default AdminController;
