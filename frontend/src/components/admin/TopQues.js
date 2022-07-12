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
import TagsList from "../Cards/TagsList";
import { Link } from "react-router-dom";
import STRINGS from "../../constant";

export default function TopQues(props) {
  const { id } = useParams();
  const [questions, setQuestions] = useState("");
  useEffect(() => {
    console.log(id);
    axios
      .get(STRINGS.url + "/get/top10MostViewedQuestions")
      .then((response) => {
        console.log(response.data);
        setQuestions(response.data);
      });
    console.log(questions);
  }, []);

  return (
    <div>
      <b>Top 10 most viewed questions.</b>
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
              No questions
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
                          <div>&nbsp;{question.views} views</div>
                          <Link to={"/question/view/" + question._id}>
                            {question.questionTitle}
                          </Link>
                          <div></div>
                          <div></div>
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
