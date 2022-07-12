import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Editor from "react-quill/lib/toolbar";
import { bestAnswerUpdated } from "../../actions/index";
import axios from "axios";
import { useNavigate } from "react-router";
import STRINGS from "../../constant";

// import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import "./index.css";
// import { useSelector } from "react-redux";
//import { selectUser } from "../../feature/userSlice";
import { stringAvatar } from "../../utils/Avatar";
import questions from "../../dummydata/questions.json";
import "./AllQuestions.css";
import "./Main.css";
import QuillEditor from "../Questions/Editor";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Answer from "./AnswerSection";
import Question from "./QuestionSection";
import { useDispatch, useSelector } from "react-redux";

function MainQuestion() {
  //let search = window.location.search;
  //const params = new URLSearchParams(search);
  // const id = "627456028ee4459e04591bb0"//params.get("q");
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isSameUser, SetisSameUser] = useState(false); // this will use for indentify to user has permission to check accepted answer or not
  const [questionData, setQuestionData] = useState("");
  const [isAcceptedAnswerId, setisAcceptedAnswerId] = useState(
    questionData.isAcceptedAnswerId
  );
  const [answer, setAnswer] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const bestAnswerUpdated1 = useSelector((state) => state.bestAnswerUpdated);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const LoggedInUser = useSelector((state) => state.LoggedInUser);
  const history = useNavigate();
  const [isAdmin, setisAdmin] = useState(false);
  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    console.log("inside");
    // const userId=LoggedInUser?LoggedInUser?.userId:""
    //var url=`http://localhost:3001/questions/${id}/${userId}`;
    var body = {
      questionId: id,
      userId: LoggedInUser?._id ? LoggedInUser._id : "",
    };
    axios
      .post(STRINGS.url + `/fetch/questions`, body)
      //.get(`${ur}`)
      .then((res) => {
        console.log(res.data.response);
        setQuestionData(res.data.response);
        setAllAnswers(res.data.response.answers);
        if (res.data.response.userId === LoggedInUser._id) {
          SetisSameUser(true);
        }
      })
      .catch((err) => console.log(err));
    // console.log("data",questionData)
    //Change this code for Owner of the question

    // SetisSameUser(true)
    if (LoggedInUser?.accountType === "admin") {
      setisAdmin(true);
    }
    //setisAdmin(true)
  }, [id]);
  // useEffect(() => {
  //   console.log("inside")
  //   const body={
  //     questionId:id
  //   }
  //         axios
  //          .post(`http://localhost:3001/question/addView`,body)
  //          .then((res) => {
  //            console.log(res)
  //         })
  //          .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    // console.log("inside dispatch")
    // var body = {
    //   questionId: id,
    //   userId: LoggedInUser?.userId ? LoggedInUser.userId : ""
    // }
    // axios
    //   .post(`http://localhost:3001/fetch/questions`, body)
    //   .then((res) => {
    //     console.log(res.data.response);
    //     //  setQuestionData(res.data.response)
    //     setAllAnswers(res.data.response.answers)
    //     dispatch(bestAnswerUpdated(false))
    //     setQuestionData(res.data.response)
    //     if (res.data.response.userId === LoggedInUser.userId) {
    //       SetisSameUser(true)
    //     }
    //   })
    //   .catch((err) => console.log(err));
    // console.log("data",questionData)
  }, [bestAnswerUpdated1]);
  // useEffect(() => {
  //   async function getFunctionDetails() {
  //     await axios
  //       .get(`/api/question/${id}`)
  //       .then((res) => setQuestionData(res.data[0]))
  //       .catch((err) => console.log(err));
  //   }
  //   getFunctionDetails();
  // }, [id]);
  // useEffect(() => {
  //   setQuestionData(questions.questions[0])
  //   console.log("data",questionData)
  //   console.log("dawwwta",questions[0])
  // }, [questionData, comments,id]);

  // useEffect(() => {
  //   setQuestionData(questions.questions[0])
  //   console.log("data",questionData)
  // }, []);
  useEffect(() => {
    const bodyJSON = {
      questionId: id,
    };
    //  axios
    // .put("http://localhost:3001/question/postAnswer", bodyJSON)
    // .then((res) => {
    //    console.log(res.data.response);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }, []);

  useEffect(() => {
    setisAcceptedAnswerId(questionData.isAcceptedAnswerId);
  }, [allAnswers]);

  function acceptedAnswers(value) {
    console.log("inside");
    setisAcceptedAnswerId(value);
    //setAllAnswers(allAnswers)
  }

  // console.log(questionData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("body", answer);
    if (!isLoggedIn) {
      console.log("insidde login");
      history("/login");
    } else {
      if (answer !== "") {
        const bodyJSON = {
          description: answer,
          questionId: questionData.questionId,
          questionTitle: questionData.questionTitle,
          questionTags: questionData.tags,
          shortdesc: shortDesc.replace(/\s/g, " "),
          type: "answered",
          userId: LoggedInUser._id, //localStorage.getItem('userId')
          // username: LoggedInUser.username//localStorage.getItem('username')
        };
        await axios
          .put(STRINGS.url + "/question/postAnswer", bodyJSON)
          .then((res) => {
            console.log(res.data.response);
            setAnswer("");
            var response = res.data.response;
            var res1 = {
              ...response,
              username: LoggedInUser?.username,
              profilePicture: "",
            };
            allAnswers.push(res1);
            //setAllAnswers(allAnswers.push(res.data.response))
            alert("Answer added successfully");
            //history.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Please insert answer first!!!");
      }
    }
  };
  const approveQuestion = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      const bodyJSON = {
        postId: id,
      };
      await axios
        .put(STRINGS.url + "/update/question/status", bodyJSON)
        .then((res) => {
          console.log(res.data);
          alert("Question approved");
          history("/adminHome");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      history("/login");
    }
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question" style={{width:"700px"}}>{questionData?.questionTitle} </h2>
          <div>
            {isAdmin ? (
              <button onClick={approveQuestion} style={{ marginRight: "20px" }}>
                Approve Question
              </button>
            ) : (
              ""
            )}
            {isSameUser ? (
              <Link
                to={`/edit/${questionData.questionId}`}
                style={{ marginRight: "20px" }}
              >
                <button>Edit Question</button>
              </Link>
            ) : (
              ""
            )}
            <Link to="/ask">
              <button>Ask Question</button>
            </Link>
          </div>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Asked
              <span>
                {new Date(questionData?.createdTime).toLocaleString()}
              </span>
            </p>
            <p>
              Modified
              <span>
                {new Date(questionData?.modifiedAt?.date).toLocaleString()}
              </span>
            </p>
            <p>
              Viewed<span>{questionData.views} times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          {questionData && <Question question={questionData} />}
        </div>
        <div
          style={{
            flexDirection: "column",
          }}
          className="all-questions"
        >
          <p
            style={{
              // marginBottom: "20px",
              textAlign: "left",
              fontSize: "1.3rem",
              // fontStyle:"bold",
              fontWeight: "400",
            }}
          >
            {questionData && allAnswers
              ? questionData.answers.length + " Answers"
              : ""}
          </p>
          {questionData?.answers &&
            allAnswers.map((_q) => (
              <Answer
                answer={_q}
                question_id={questionData.questionId}
                question_author={isSameUser}
                isAcceptedAnswerId={isAcceptedAnswerId}
                OnAcceptedAnswers={acceptedAnswers}
              />
            ))}
        </div>
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <QuillEditor
          body={answer}
          style={{ height: "200px" }}
          onChange={setAnswer}
          shortText={setShortDesc}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "10px",
          maxWidth: "fit-content",
        }}
      >
        Post your answer
      </button>
    </div>
  );
}

export default MainQuestion;
