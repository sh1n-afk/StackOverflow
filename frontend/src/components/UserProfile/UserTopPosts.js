import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import axios from "axios";
import { useParams } from "react-router";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import STRINGS from "../../constant";

export default function UserTopPosts(props) {
  const { id } = useParams();
  const [topposts, setTopPosts] = useState("");
  const [answers, setAnswers] = useState("");
  const [questions, setQuestions] = useState("");
  const [postType, setPostType] = useState("all");
  const [filterType, setFilterType] = useState("score");
  const { user } = props;
  const [posts, setPosts] = useState([]);
  const [topPostUpdated, setTopPostUpdated] = useState(false);

  useEffect(() => {
    axios
      .get(STRINGS.url + `/user/posts/` + id)
      .then((res) => {
        setTopPosts(res.data);
        setPosts(res.data.sort((a, b) => b.votes - a.votes));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {}, [posts]);

  useEffect(() => {
    if (postType === "all") {
      if (filterType === "score") {
        if (topposts !== "") {
          setPosts(topposts.sort((a, b) => b.votes - a.votes));
          setTopPostUpdated(false);
        }
      } else if (filterType === "newest") {
        if (topposts !== "") {
          setPosts(
            topposts.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
          );
          setTopPostUpdated(true);
        }
      }
    } else if (postType === "questions") {
      if (filterType === "score") {
        if (topposts !== "") {
          setPosts(
            topposts
              .filter((x) => x.postType === "question")
              .sort((a, b) => b.votes - a.votes)
          );
        }
      } else if (filterType === "newest") {
        if (topposts !== "") {
          console.log(posts);
          setPosts(
            topposts
              .filter((x) => x.postType === "question")
              .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
          );
          console.log(posts);
          console.log(
            topposts
              .filter((x) => x.postType === "question")
              .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
          );
        }
      }
    } else if (postType === "answers") {
      if (filterType === "score") {
        if (topposts !== "") {
          setPosts(
            topposts
              .filter((x) => x.postType === "answer")
              .sort((a, b) => b.votes - a.votes)
          );
        }
      } else if (filterType === "newest") {
        if (topposts !== "") {
          setPosts(
            topposts
              .filter((x) => x.postType === "answer")
              .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
          );
        }
      }
    }
  }, [postType, filterType]);

  const allClickHandler = (e) => {
    setPostType("all");
  };
  const questionsClickHandler = (e) => {
    setPostType("questions");
  };
  const answersClickHandler = (e) => {
    setPostType("answers");
  };
  const scoreClickHandler = (e) => {
    setFilterType("score");
  };
  const newestClickHandler = (e) => {
    setFilterType("newest");
  };
  return (
    <div>
      {topposts === "" || topposts.length === 0 ? (
        <div>
          {" "}
          <Typography
            sx={{ fontSize: 20, color: "#212121", align: "left" }}
            color="text.secondary"
            gutterBottom
            align="left"
          >
            Top Posts
          </Typography>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem
              sx={{
                border: 1,
                borderColor: "#bdbdbd",
                bgcolor: "#eeeeee",
              }}
            >
              {" "}
              <Typography
                sx={{ fontSize: 13, color: "#212121", align: "left" }}
                color="text.secondary"
                gutterBottom
                align="left"
              >
                {user.username} currently have no posts
              </Typography>
            </ListItem>
          </List>
        </div>
      ) : (
        <div>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  {postType === "all" && filterType === "score" ? (
                    <Typography
                      sx={{ fontSize: 20, color: "#212121", align: "left" }}
                      color="text.secondary"
                      gutterBottom
                      align="left"
                    >
                      Top Posts
                    </Typography>
                  ) : postType === "all" && filterType === "newest" ? (
                    <Typography
                      sx={{ fontSize: 20, color: "#212121", align: "left" }}
                      color="text.secondary"
                      gutterBottom
                      align="left"
                    >
                      Newest Posts
                    </Typography>
                  ) : postType === "questions" && filterType === "score" ? (
                    <Typography
                      sx={{ fontSize: 20, color: "#212121", align: "left" }}
                      color="text.secondary"
                      gutterBottom
                      align="left"
                    >
                      Top Questions
                    </Typography>
                  ) : postType === "questions" && filterType === "newest" ? (
                    <Typography
                      sx={{ fontSize: 20, color: "#212121", align: "left" }}
                      color="text.secondary"
                      gutterBottom
                      align="left"
                    >
                      Newest Questions
                    </Typography>
                  ) : postType === "answers" && filterType === "score" ? (
                    <Typography
                      sx={{ fontSize: 20, color: "#212121", align: "left" }}
                      color="text.secondary"
                      gutterBottom
                      align="left"
                    >
                      Top Answers
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ fontSize: 20, color: "#212121", align: "left" }}
                      color="text.secondary"
                      gutterBottom
                      align="left"
                    >
                      Newest Answers
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      align="center"
                      sx={{ color: "#424242", font: 10 }}
                      onClick={allClickHandler}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "block" },
                          color: "#424242",
                        }}
                        textTransform="capitalize"
                      >
                        All
                      </Typography>
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      align="center"
                      sx={{ color: "white", font: 10 }}
                      onClick={questionsClickHandler}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "block" },
                          color: "#424242",
                        }}
                        textTransform="capitalize"
                      >
                        Questions
                      </Typography>
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      align="center"
                      sx={{ color: "white", font: 10 }}
                      onClick={answersClickHandler}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "block" },
                          color: "#424242",
                        }}
                        textTransform="capitalize"
                      >
                        Answers
                      </Typography>
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      align="center"
                      sx={{ color: "white", font: 10 }}
                      onClick={scoreClickHandler}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "block" },
                          color: "#424242",
                        }}
                        textTransform="capitalize"
                      >
                        Score
                      </Typography>
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      align="center"
                      sx={{ color: "white", font: 10 }}
                      onClick={newestClickHandler}
                    >
                      <Typography
                        variant="body2"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "block" },
                          color: "#424242",
                        }}
                        textTransform="capitalize"
                      >
                        Newest
                      </Typography>
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {posts.slice(0, 10).map((post) => (
                  <ListItem sx={{ border: 1, borderColor: "#e0e0e0" }}>
                    <Grid container spacing={0}>
                      <Grid item xs={0.5}>
                        {post.postType === "answer" && post.isBest === true ? (
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#689f38",
                              border: 1,
                              borderColor: "#689f38",
                              color: "white",
                              fontSize: 15,
                              m: 0.5,
                            }}
                          >
                            A
                          </Box>
                        ) : post.postType === "answer" ? (
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#eeeeee",
                              border: 1,
                              borderColor: "#bdbdbd",
                              color: "#757575",
                              fontSize: 15,
                              m: 0.5,
                            }}
                          >
                            A
                          </Box>
                        ) : (
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#689f38",
                              border: 1,
                              borderColor: "#689f38",
                              color: "white",
                              fontSize: 15,
                              m: 0.5,
                            }}
                          >
                            Q
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={0.7}>
                        {(post.postType === "answer" &&
                          post.isAccepted === true) ||
                        (post.isAcceptedAnswerId !== undefined &&
                          post.postType === "question") ? (
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#689f38",
                              border: 1,
                              borderColor: "#689f38",
                              color: "white",
                              fontSize: 15,
                              m: 0.5,
                            }}
                          >
                            {post.votes}
                          </Box>
                        ) : (
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "white",
                              border: 1,
                              borderColor: "#bdbdbd",
                              color: "#424242",
                              fontSize: 15,
                              m: 0.5,
                            }}
                          >
                            {post.votes}
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={8.5}>
                        <Typography
                          color="text.primary"
                          align="left"
                          sx={{ fontSize: 15, color: "#212121" }}
                          gutterBottom
                        >
                          <Link
                            to={"/question/view/" + post._id}
                            style={{ textDecoration: "none" }}
                          >
                            {post.questionTitle}
                          </Link>
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography
                          color="text.primary"
                          align="left"
                          sx={{ fontSize: 15, color: "#212121" }}
                          gutterBottom
                        >
                          {new Date(post.addedAt).getTime() >
                          new Date().getTime() ? (
                            <div>
                              <Moment fromNow>{post.addedAt}</Moment>
                            </div>
                          ) : new Date(post.addedAt).getTime() >
                            new Date("01/01/2022").getTime() ? (
                            <div>
                              <Moment format=" MMM D">{post.addedAt}</Moment>
                            </div>
                          ) : (
                            <div>
                              {" "}
                              <Moment format=" MMM D, YYYY">
                                {post.addedAt}
                              </Moment>
                            </div>
                          )}{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
