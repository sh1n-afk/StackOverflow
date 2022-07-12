import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CakeIcon from "@mui/icons-material/Cake";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Moment from "react-moment";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function UserDetails(props) {
  const { user } = props;
  const loggedUser = useSelector((state) => state.LoggedInUser);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const navigate = useNavigate();
  const chat = (e) => {
    navigate("/chat/" + user.username);
  };

  return (
    <div className="userprofile-details-component">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <br></br>
          <img
            style={{
              position: "sticky",
              height: "130px",
              width: "130px",
            }}
            src={
              user.profilePicture
                ? user.profilePicture
                : "/images/userdefault.png"
            }
            className="card-img-top"
            alt="description of image"
          />
        </Grid>
        <Grid item xs={8}>
          <br></br>
          <br></br>
          <Typography
            color="text.primary"
            align="left"
            sx={{ fontSize: 25, color: "#212121" }}
            gutterBottom
          >
            {user.username}
          </Typography>

          <Grid container spacing={0}>
            <Grid item xs={0.5}>
              <Typography
                color="text.secondary"
                align="left"
                sx={{ fontSize: 15, color: "#9e9e9e" }}
                gutterBottom
              >
                <CakeIcon />
              </Typography>
            </Grid>
            <Grid item xs={3.5}>
              <Typography
                color="text.secondary"
                align="left"
                sx={{ fontSize: 15, color: "#9e9e9e" }}
                gutterBottom
              >
                Member for{" "}
                <Moment fromNow ago>
                  {user.joiningDate}
                </Moment>
              </Typography>
            </Grid>
            <Grid item xs={0.5}>
              <Typography
                color="text.secondary"
                align="left"
                sx={{ fontSize: 15, color: "#9e9e9e" }}
                gutterBottom
              >
                <AccessTimeIcon />
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                color="text.secondary"
                align="left"
                sx={{ fontSize: 15, color: "#9e9e9e" }}
                gutterBottom
              >
                Last seen <Moment fromNow>{user.visitedTime}</Moment>
              </Typography>
            </Grid>

            {/* { isLoggedIn===false ?(
                          <Grid item xs={4}>
              <Button
                sx={{ fontSize: 12, color: "#fafafa" }}
                variant="contained"
                onClick={chat}
              >
                Chat
              </Button>
              </Grid>
              )? loggedUser._id===user._id ?(<div></div> ):(<div></div>)}  
            </Grid> */}
          
            {isLoggedIn && (loggedUser._id !== user._id) && <Grid item xs={4}>
              <Button
                sx={{ fontSize: 12, color: "#fafafa" }}
                variant="contained"
                onClick={chat}
              >
                Chat
              </Button>
            </Grid>}
          </Grid>

          {user.location !== undefined ? (
            <Grid container spacing={0}>
              <Grid item xs={0.5}>
                <Typography
                  color="text.secondary"
                  align="left"
                  sx={{ fontSize: 15, color: "#9e9e9e" }}
                  gutterBottom
                >
                  <LocationOnIcon />
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  color="text.secondary"
                  align="left"
                  sx={{ fontSize: 15, color: "#9e9e9e" }}
                  gutterBottom
                >
                  {user.location.city} {user.location.country}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
