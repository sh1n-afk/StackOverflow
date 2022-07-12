import React, { useEffect, useState } from "react";
import userJson from "../dummydata/user.json";
import UserDetails from "../components/UserProfile/UserDetails";
import UserProfileNavbar from "../components/UserProfile/UserProfileNavbar";
import UserActivitySidebar from "../components/UserProfile/UserActivitySidebar";
import _ from "lodash";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import STRINGS from "../constant";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

export default function UserActivityReputation() {
  const [user, setUser] = useState("");
  const [finalJson, setFinalJson] = useState([]);
  const [activity, setActivity] = useState("");
  const [reputation, setReputation] = useState("");

  const { id } = useParams();
  let navigate = useNavigate();

  function litem(points) {
    return (
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
          {" "}
          {points === 5 ? (
            <Typography>+5 answer upvote</Typography>
          ) : points === -5 ? (
            <Typography>+5 answer downvote</Typography>
          ) : points === 10 ? (
            <Typography>+10 question upvote</Typography>
          ) : points === -10 ? (
            <Typography>-10 question downvote</Typography>
          ) : points === 15 ? (
            <Typography>+15 best answer accepted</Typography>
          ) : (
            <Typography>-15 best answer reversed</Typography>
          )}
        </Typography>
      </ListItem>
    );
  }

  function recurr(d) {
    console.log(d);
    if (isArray(d.title)) {
      {
        return (
          <div>
            {" "}
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {d.title.map((reps) => litem(reps.points))}
            </List>
            <br></br>
          </div>
        );
      }
    } else {
      return (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {d.title.includes("May") ? (
              <div>
                {" "}
                <Typography>{d.title}</Typography>
              </div>
            ) : (
              activity
                .filter((i) => i.questionTitle === d.title)
                .slice(0, 1)
                .map((e) => (
                  <Typography>
                    <Link
                      to={"/question/view/" + e.postId}
                      style={{ textDecoration: "none" }}
                    >
                      {e.questionTitle}
                    </Link>
                  </Typography>
                ))
            )}
          </AccordionSummary>
          <Accordion>
            <AccordionDetails
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {d.content.map((con) => recurr(con))}
            </AccordionDetails>
          </Accordion>
        </Accordion>
      );
    }
  }

  useEffect(() => {
    axios
      .get(STRINGS.url + `/user/` + id)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
        navigate("/errorpage");
      });

    axios
      .get(STRINGS.url + `/useractivity/` + id)
      .then((res) => {
        setReputation(res.data[0].reputation);
        setActivity(res.data[0].activities);
        let groupedDatesThatMatch = _.mapValues(
          _.groupBy(res.data[0].activities, (i) =>
            moment(i.date).format("MMMM Do YYYY")
          ),
          (app) => _.groupBy(app, (i) => i.questionTitle)
        );

        console.log(groupedDatesThatMatch);

        const getObjects = (o, parent) =>
          o && typeof o === "object" && !isArray(o)
            ? Object.entries(o).map(([title, v]) => ({
                title,

                content: getObjects(v, title),
              }))
            : [{ title: o, content: [] }];

        var result = getObjects(groupedDatesThatMatch, "null");
        console.log(result);
        setFinalJson(result);
      })
      .catch((err) => {
        console.log(err);
        navigate("/errorpage");
      });
  }, []);

  function isArray(arr) {
    return arr instanceof Array;
  }

  return (
    <div>
      <div className="userprofile-details-component">
        <UserDetails user={user}></UserDetails>
      </div>
      <div>
        <UserProfileNavbar page={"activity"} user={user}></UserProfileNavbar>
      </div>
      <br></br>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {" "}
          <UserActivitySidebar
            tab={"reputation"}
            user={user}
          ></UserActivitySidebar>
        </Grid>
        <Grid item xs={9}>
          {" "}
          <Typography
            sx={{ fontSize: 20, color: "#212121", align: "left" }}
            color="text.secondary"
            gutterBottom
            align="left"
          >
            {reputation} Reputation
          </Typography>
          {finalJson.length > 0 ? (
            finalJson.map((du) => recurr(du))
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
