import React, { useEffect, useState } from "react";
import userJson from "../dummydata/user.json";
import UserDetails from "../components/UserProfile/UserDetails";
import UserProfileNavbar from "../components/UserProfile/UserProfileNavbar";
import UserActivitySidebar from "../components/UserProfile/UserActivitySidebar";
import { Grid, Typography } from "@mui/material";
import UserTopTags from "../components/UserProfile/UserTopTags";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import STRINGS from "../constant";

export default function UserActivityTags() {
  const [user, setUser] = useState("");
  const { id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(STRINGS.url + `/user/` + id)
      .then((res) => {
        console.log(res.data);
        setUser(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
        navigate("/errorpage");
      });
  }, []);

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
          <UserActivitySidebar tab={"tags"} user={user}></UserActivitySidebar>
        </Grid>
        <Grid item xs={9}>
          {" "}
          <Typography
            sx={{ fontSize: 20, color: "#212121", align: "left" }}
            color="text.secondary"
            gutterBottom
            align="left"
          >
            Tags
          </Typography>
          <UserTopTags user={user}></UserTopTags>
        </Grid>
      </Grid>
    </div>
  );
}
