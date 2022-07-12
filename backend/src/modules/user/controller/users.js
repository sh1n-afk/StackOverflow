import conn from "../../../db/config/mysql.config.js";
import UserDetails from "../../../db/models/mongo/userDetails.js";
import User from "../../../db/models/sql/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserActivities from "../../../db/models/mongo/userActivity.js";
import Posts from "../../../db/models/mongo/posts.js";

export class UserController {
  login = async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({ where: { emailId: emailId } });
      console.log(user);

      if (user === null) {
        return res
          .status(400)
          .send({ errorMsg: "Email not registered with us" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(400)
          .send({ errorMsg: "Incorrect password. Please try again!" });
      }

      try {
        const response = await UserDetails.findOne({ emailId: emailId });
        res.status(200).send(response);
      } catch (err) {
        console.error(err);
        res.status(400).send(err);
      }
      let response = response;
      return res.status(200).send(response);
    } catch (error) {
      console.error(error);
    }
  };

  signup = async (req, res) => {
    const { emailId, username, password, accountType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let time = new Date();

    const userObj = await User.findOne({ where: { emailId: emailId } });

    console.log(userObj);
    if (userObj !== null) {
      return res
        .status(400)
        .send({ errorMsg: "Email is already registered with us" });
    }

    const user = new UserDetails({
      emailId: emailId,
      username: username,
      accountType: accountType,
      joiningDate: time.toISOString(),
      visitedTime: time.toISOString(),
    });

    // console.log(user._id.toISOString());
    console.log(user);
    user
      .save()
      .then(() => {
        console.log(emailId),
          console.log(hashedPassword),
          console.log(username),
          console.log(accountType);
        // console.log(emailId),
        let userObject = {
          emailId: emailId,
          password: hashedPassword,
          username: username,
          accountType: accountType,
          userId: user._id.toString(),
        };
        const newMember = new User(userObject).save();

        const jwtPayload = { userObject };
        jwt.sign(jwtPayload, "virag02865490", (err, token) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          }

          userObject.token = token;
          delete userObject.password;
          return res.status(200).send(userObject);
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  };

  getAllUsers = async (req, res) => {
    try {
      const response = await UserDetails.find({});
      console.log(response);
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };

  getuser = async (req, res) => {
    const { userId } = req.params;
    try {
      const response = await UserDetails.find({ _id: userId });
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };

  editUser = async (req, res) => {
    const { _id, about, city, country, image } = req.body;
    const data = { city: city, country: country };
    console.log(data);
    try {
      const response = await UserDetails.findByIdAndUpdate(_id, {
        location: data,
        about: about,
        profilePicture: image,
      });
      console.log("user profile updated", response);
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send("Profile not updated");
    }
  };

  updatelastVisitedTime = async (req, res) => {
    const { _id, visitedTime } = req.body;
    let time = new Date();
    try {
      const response = await UserDetails.findByIdAndUpdate(_id, {
        visitedTime: time.toISOString(),
      });
      console.log("last visited time updated", response);
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send("last visited time not updated");
    }
  };

  bookmarkQuestion = async (req, res) => {
    const { userId, questionId } = req.body;
    try {
      const response = await UserDetails.findByIdAndUpdate(
        userId,
        {
          $push: { bookmarkedQuestions: questionId },
        },
        {
          upsert: true,
          new: true,
        }
      );
      console.log("bookmark questions added", response);
      res.status(200).send("bookmark added");
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };

  removeBookmarkQuestion = async (req, res) => {
    const { userId, questionId } = req.body;
    try {
      const response = await UserDetails.findByIdAndUpdate(
        userId,
        {
          $pull: { bookmarkedQuestions: questionId },
        },
        {
          upsert: true,
          new: true,
        }
      );
      console.log("bookmark questions removed", response);
      res.status(200).send(response);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };

  fetchUserActivity = async (req, res) => {
    const { userId } = req.params;
    let results = [];
    try {
      const activities = await UserActivities.find({ userId: userId });
      console.log("activites", activities);

      let user = await UserDetails.findById({ _id: userId });
      let all = [];

      for (var act of activities) {
        let post = await Posts.find({ _id: act.postId });
        let activity = {
          postId:
            post[0].postType == "question" ? post[0]._id : post[0].parentId,
          questionTitle: post[0].questionTitle,
          activityType: act.activityType,
          points: act.points,
          date: act.date,
        };
        all.push(activity);
      }

      results.push({ reputation: user.reputation, activities: all });

      console.log("user activity", results);
      res.status(200).send(results);
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  };

  fetchTagBadges = async (req, res) => {
    const { userId } = req.params;
    let user = await UserDetails.findById({ _id: userId });
    let tagBadges = [];

    try {
        const tags = user.tags;
        let tagBadge;
        for(var tag of tags)
        {
           if(tag.score < 10)
           {
              tagBadge = {
                name: tag.name,
                type: "bronze",
                tagBased: true
              }
           }
           else if(tag.score > 10 && tag.score < 15)
           {
              tagBadge = {
                name: tag.name,
                type: "silver",
                tagBased: true
              }
           }
           else if(tag.score > 20)
           {
              tagBadge = {
                name: tag.name,
                type: "gold",
                tagBased: true
              }
           }
           tagBadges.push(tagBadge);
        }
        res.status(200).send(tagBadges);
    } catch (error) {
      console.error(err);
      res.status(400).send(err);
    }
  }
}

export default UserController;
