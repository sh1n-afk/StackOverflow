import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import { stringAvatar } from "../../utils/Avatar";
import ReactQuill from "react-quill";
import Comments from "./Comments";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import HistoryIcon from "@material-ui/icons/History";
import Author from "./Author";
import TagList from "./TagList";
import { useSelector } from "react-redux";
import STRINGS from "../../constant";
import { useNavigate } from "react-router";
export default function Question(props) {
  const { question } = props;
  const [aksedQuestionUser, setAksedQuestionUser] = useState();
  const [isBookmarked, SetIsBookmarked] = useState(false);
  const [downvoteFlag, setdownvoteFlag] = useState(false);
  const [upvoteFlag, setupvoteFlag] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const LoggedInUser = useSelector((state) => state.LoggedInUser);
  //const [arrayofUpvotes, setarrayofUpvotes] = useState(["62763e6cbfe0a2faeddf0272","62763e62bfe0a2faeddf0270"]);
  //const [arrayofDownvotes, setarrayofDownvotes] = useState(["62763e54bfe0a2faeddf026e"]);
  const [voteCount, setvoteCount] = useState(
    parseInt(question?.upvotes) - parseInt(question?.downvotes)
  );
  const [text, setText] = useState(props.question.description);
  const userId = "62763e6cbfe0a2faeddf0272";
  var arrayofUpvotes = ["62763e6cbfe0a2faeddf0272", "62763e62bfe0a2faeddf0270"];
  var arrayofDownvotes = ["62763e54bfe0a2faeddf026e"];
  //const [voteCount, setvoteCount] = useState(parseInt(arrayofUpvotes.length) - parseInt(arrayofDownvotes.length));
  const history = useNavigate();

  useEffect(() => {
    if (question.userId) {
      axios
        .get(STRINGS.url + `/user/${question.userId}`)
        .then((res) => {
          console.log(res.data[0]);
          setAksedQuestionUser(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (isLoggedIn) {
      axios
        .get(STRINGS.url + `/user/${LoggedInUser?._id}`)
        .then((res) => {
          console.log(res.data[0]);
          if (res.data[0].bookmarkedQuestions.includes(question.questionId)) {
            SetIsBookmarked(true);
          }
          // setAksedQuestionUser(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [question]);

  useEffect(() => {
    setText(question.description);
    setupvoteFlag(question.upvoteFlag);
    setdownvoteFlag(question.downvoteFlag);
  }, [props.question, question, question.description]);

  const votePost = async (e) => {
    console.log("vote", e.target.id);

    const body = {
      postId: question.questionId,
      userId: LoggedInUser ? LoggedInUser._id : "",
      postType: "question",
      voteType: e.target.id,
    };
    if (!isLoggedIn) {
      console.log("insidde login");
      history("/login");
    } else {
      await axios
        .put(STRINGS.url + `/votePost`, body)
        .then((res) => {
          console.log(res.data);
          if (e.target.id === "Upvote") {
            setvoteCount(voteCount + 1);
            setdownvoteFlag(false);
            setupvoteFlag(true);
          } else {
            setvoteCount(voteCount - 1);
            setupvoteFlag(false);
            setdownvoteFlag(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const addBookmark = async () => {
    const body = {
      questionId: question.questionId,
      userId: LoggedInUser._id, //localStorage.getItem("userId")
    };
    if (!isLoggedIn) {
      console.log("insidde login");
      history("/login");
    } else {
      await axios
        .put(STRINGS.url + `/user/question/bookmark`, body)
        .then((res) => {
          console.log(res.data);
          SetIsBookmarked(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const removeBookmark = async () => {
    const body = {
      questionId: question.questionId,
      userId: LoggedInUser._id, //localStorage.getItem("userId")
    };
    if (!isLoggedIn) {
      console.log("insidde login");
      history("/login");
    } else {
      await axios
        .put(STRINGS.url + `/user/question/removebookmark`, body)
        .then((res) => {
          console.log(res.data);
          SetIsBookmarked(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const gotoactivity = () => {
    history(`/activity/${question.questionId}`);
  };
  return (
    <>
      <div
        style={{
          borderBottom: "1px solid #eee",
        }}
        key={question.question_id}
        className="all-questions-container"
      >
        <div className="all-questions-left">
          <div className="all-options">
            {question.userId !== LoggedInUser?._id ? (
              !upvoteFlag ? (
                <p className="arrow votes" id="Upvote" onClick={votePost}>
                  ▲
                </p>
              ) : (
                <p className="arrow" id="Upvote" style={{ color: "#cea81c" }}>
                  ▲
                </p>
              )
            ) : (
              <p className="arrow" id="Upvote">
                ▲
              </p>
            )}

            {/* <p className="arrow" style={{ "fontSize": "1.3rem" }}>{question?.upvotes === 0 ? 0 : parseInt(question?.upvotes) - parseInt(question?.downvotes)}</p> */}
            <p className="arrow" style={{ fontSize: "1.3rem" }}>
              {voteCount}
            </p>
            {question.userId !== LoggedInUser?._id ? (
              !downvoteFlag ? (
                <p className="arrow votes" id="Downvote" onClick={votePost}>
                  ▼
                </p>
              ) : (
                <p
                  className="arrow "
                  id="Downvote"
                  style={{ color: "#cea81c" }}
                >
                  ▼
                </p>
              )
            ) : (
              <p className="arrow " id="Downvote">
                ▼
              </p>
            )}

            {/* {!arrayofDownvotes.includes(userId)?<p className="arrow votes" id="Downvote" onClick={votePost}>▼</p>:""} */}

            {isBookmarked ? (
              <BookmarkIcon
                className="votes"
                onClick={removeBookmark}
                style={{ color: "cea81c" }}
              />
            ) : (
              <BookmarkIcon className="votes" onClick={addBookmark} />
            )}

            <HistoryIcon
              className="votes"
              style={{ fontSize: "1.5rem" }}
              onClick={gotoactivity}
            />
          </div>
        </div>
        <div className="question-answer" style={{ marginBottom: "10px" }}>
          {/* <div dangerouslySetInnerHTML={{__html: text}}></div> */}
          <ReactQuill value={text} readOnly={true} theme={"bubble"} />
          <div style={{ width: "100%", textAlign: "left", padding: "10px" }}>
            {question?.tags &&
              question?.tags.map((tag) => <TagList tag={tag} />)}
          </div>
          <Author
            answer={aksedQuestionUser}
            createdTime={question?.createdTime}
            isQuestion={true}
          />

          <Comments
            comments={question?.comments}
            isQuestionComment={true}
            question_id={question.questionId}
            answer_id={question.questionId}
          />

          {/* <div className="author">
            <small>
              asked {new Date(question?.createdTime).toLocaleString()}
            </small>
            <div className="auth-details">
              <Avatar {...stringAvatar(question?.user?.displayName)} />
              <p>
                {aksedQuestionUser?.username
                  ? aksedQuestionUser?.username
                  : "Virag B"}
              </p>
              {
                aksedQuestionUser?.badges.length > 0 ?
                  <span class="userBadges_queans" title="badges" aria-hidden="true">
                    {aksedQuestionUser?.badges?.gold !== 0 ? <><span class="badge1"></span><span class="badgecount">{aksedQuestionUser.badges.gold}</span></> : ""}
                    {aksedQuestionUser?.badges?.gold !== 0 ? <><span class="badge2"></span><span class="badgecount">{aksedQuestionUser.badges.silver}</span></> : ""}
                    {aksedQuestionUser?.badges?.gold !== 0 ? <><span class="badge3"></span><span class="badgecount">{aksedQuestionUser.badges.bronze}</span></> : ""}
                  </span>
                  : ""
              }
              <span class="userBadges_queans" title="badges" aria-hidden="true">
                <span class="badge1"></span><span class="badgecount">8</span>
                <span class="badge2"></span><span class="badgecount">10</span>
                <span class="badge3"></span><span class="badgecount">11</span>
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
