import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Chip, Grid, ListItemText, Stack } from "@mui/material";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import axios from "axios";
import Moment from "react-moment";
import TagList from "../ViewQuestion/TagList";
import { Link } from "react-router-dom";
import STRINGS from "../../constant";

export default function UserBookmarks(props) {
  const { id } = useParams();
  const [questions, setQuestions] = useState("");
  useEffect(() => {
    console.log(id);
    axios
      .get(STRINGS.url + "/user/bookmarkedQuestions/" + id)
      .then((response) => {
        setQuestions(response.data);
      });
    console.log(questions);
  }, []);

  return (
    <div>
      {questions === "" || questions.length === 0 ? (
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
              No questions bookmarked
            </Typography>
          </ListItem>
        </List>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {questions !== "" ? (
                questions.map((question) => (
                  <ListItem sx={{ border: 1, borderColor: "#e0e0e0" }}>
                    <ListItemText
                      primary={
                        <div>
                          <div>
                            {question.isAcceptedAnswerId !== undefined ? (
                              <Box
                                component="div"
                                sx={{
                                  display: "inline",
                                  bgcolor: "#5fa463",
                                  border: 1,
                                  borderColor: "#5fa463",
                                  color: "white",
                                }}
                              >
                                <DoneSharpIcon />
                                Accepted{" "}
                              </Box>
                            ) : (
                              <div></div>
                            )}
                            {"  "}
                            {question.votes} votes{" "}
                          </div>
                          <Link
                            to={"/question/view/" + question._id}
                            style={{ textDecoration: "none" }}
                          >
                            {question.questionTitle}
                          </Link>
                          <div>
                            <Grid container spacing={2}>
                              <Grid item xs={9}>
                                <Stack direction="row" spacing={1}>
                                  {question.tags === undefined ? (
                                    <div></div>
                                  ) : (
                                    question.tags.map((tag) => (
                                      <TagList tag={tag} />
                                    ))
                                  )}{" "}
                                </Stack>
                              </Grid>
                              <Grid item xs={3} style={{ float: "right" }}>
                                {new Date(question.addedAt).getTime() >
                                new Date().getTime() ? (
                                  <div>
                                    <Moment fromNow>{question.addedAt}</Moment>
                                  </div>
                                ) : new Date(question.addedAt).getTime() >
                                  new Date("01/01/2022").getTime() ? (
                                  <div>
                                    <Moment format=" MMM D">
                                      {question.addedAt}
                                    </Moment>
                                  </div>
                                ) : (
                                  <div>
                                    {" "}
                                    <Moment format=" MMM D, YYYY">
                                      {question.addedAt}
                                    </Moment>
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <div></div>
              )}
            </List>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
