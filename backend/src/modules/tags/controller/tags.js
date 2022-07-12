import Tags from "../../../db/models/mongo/tags.js";

class TagController {
  checkHealth = async (req, res) => {
    res.status(200).send("Up and Running");
  };

  addTag = async (req, res) => {
    console.log("Add tag");
    try {
      // todo Check if user is admin
      const newTag = new Tags({
        name: req.body.name,
        description: req.body.description,
      });
      const response = await newTag.save();
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };

  getTagsByTagId = async (req, res) => {
    const { tagId } = req.params;
    try {
      const response = await Tags.find({ _id: tagId });
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };

  getTags = async (req, res) => {
    try {
      const response = await Tags.find();
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };
}

export default TagController;
