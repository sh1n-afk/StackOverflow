import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Chip, Grid, ListItemText, Stack } from "@mui/material";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import axios from "axios";
import questionsJson from "../../dummydata/questions.json";
import Moment from "react-moment";
import TagList from "../ViewQuestion/TagList";
import { Link } from "react-router-dom";
import STRINGS from "../../constant";

export default function UserAnswers(props) {
  const { id } = useParams();
  const [answers, setAnswers] = useState("");

  useEffect(() => {
    console.log(id);
    axios.get(STRINGS.url + "/user/answersAnswered/" + id).then((response) => {
      console.log(response.data);
      setAnswers(
        response.data
          .filter((x) => x.postType === "answer")
          .sort((a, b) => b.votes - a.votes)
      );
    });
    console.log(answers);
  }, []);

  return (
    <div>
      {answers === "" || answers.length === 0 ? (
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
              No answers given.
            </Typography>
          </ListItem>
        </List>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {answers !== "" ? (
                answers.map((answer) => (
                  <ListItem sx={{ border: 1, borderColor: "#e0e0e0" }}>
                    <ListItemText
                      primary={
                        <div>
                          <div>
                            {answer.votes} votes{" "}
                            {answer.isAccepted === true ? (
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
                              <di></di>
                            )}
                          </div>
                          <div>
                            <Link
                              to={"/question/view/" + answer.parentId}
                              style={{ textDecoration: "none" }}
                            >
                              {answer.questionTitle}
                            </Link>
                          </div>
                          <div>
                            <Grid container spacing={2}>
                              <Grid item xs={9}>
                                <Stack direction="row" spacing={1}>
                                  {answer.questionTags === undefined ? (
                                    <div></div>
                                  ) : (
                                    answer.questionTags.map((tag) => (
                                      <TagList tag={tag} />
                                    ))
                                  )}{" "}
                                </Stack>
                              </Grid>
                              <Grid item xs={3} style={{ float: "right" }}>
                                {new Date(answer.addedAt).getTime() >
                                new Date().getTime() ? (
                                  <div>
                                    answered{" "}
                                    <Moment fromNow>{answer.addedAt}</Moment>
                                  </div>
                                ) : new Date(answer.addedAt).getTime() >
                                  new Date("01/01/2022").getTime() ? (
                                  <div>
                                    answered{" "}
                                    <Moment format=" MMM D">
                                      {answer.addedAt}
                                    </Moment>
                                  </div>
                                ) : (
                                  <div>
                                    {" "}
                                    answered{" "}
                                    <Moment format=" MMM D, YYYY">
                                      {answer.addedAt}
                                    </Moment>
                                  </div>
                                )}{" "}
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
