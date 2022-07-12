import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import STRINGS from "../../constant";

export default function Comments(props) {
  const { answer_id, question_id, isQuestionComment } = props;
  const [showCommentBox, setshowCommentBox] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const LoggedInUser = useSelector((state) => state.LoggedInUser);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const history = useNavigate();

  useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);

  const handleComment = async () => {
    if (!isLoggedIn) {
      console.log("insidde login");
      history("/login");
    } else {
      if (commentText !== "") {
        const body = {
          questionId: question_id,
          answer_id: answer_id,
          description: commentText,
          isQuestionComment: isQuestionComment,
          username: LoggedInUser.username,
          userId: LoggedInUser._id,
          // user: user,
        };
        await axios
          .put(STRINGS.url + `/question/postComment`, body)
          .then((res) => {
            setCommentText("");
            setshowCommentBox("");
            setComments(res.data);
            console.log(res);
          });
      }
    }
  };
  return (
    <div>
      <div className="comments">
        <div className="comment">
          {comments &&
            comments.map((comment) => (
              <p key={comment?.answer_id}>
                {comment.description} -
                <span>
                  {comment.username ? comment.username : "Nate Eldredge"}
                </span>{" "}
                {"    "}
                <small>{new Date(comment.postedOn).toLocaleString()}</small>
              </p>
            ))}
        </div>
        {!showCommentBox ? (
          <p id={answer_id} onClick={() => setshowCommentBox(answer_id)}>
            Add a comment
          </p>
        ) : (
          <p id={answer_id} onClick={() => setshowCommentBox("")}>
            Add a comment
          </p>
        )}
        {showCommentBox && showCommentBox === answer_id && (
          <div className="title">
            <textarea
              style={{
                margin: "5px 0px",
                padding: "10px",
                border: "1px solid rgba(0, 0, 0, 0.2)",
                borderRadius: "3px",
                outline: "none",
              }}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              type="text"
              placeholder="Add your comment..."
              rows={5}
            />
            <button
              onClick={handleComment}
              style={{
                maxWidth: "fit-content",
              }}
            >
              Add comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
