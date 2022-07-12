import React, { useEffect, useState } from "react";
import UserDetails from "../components/UserProfile/UserDetails";
import UserProfileNavbar from "../components/UserProfile/UserProfileNavbar";
import UserActivitySidebar from "../components/UserProfile/UserActivitySidebar";
import CircleIcon from "@mui/icons-material/Circle";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import STRINGS from "../constant";
import axios from "axios";

export default function UserActivityBadges() {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [gold, setGold] = useState([]);
  const [silver, setSilver] = useState([]);
  const [bronze, setBronze] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(STRINGS.url + `/user/` + id)
      .then((res) => {
        console.log(res.data);
        setUser(res.data[0]);
        setGold(res.data[0].badges.filter((x) => x.type === "gold"));
        setSilver(res.data[0].badges.filter((x) => x.type === "silver"));
        setBronze(res.data[0].badges.filter((x) => x.type === "bronze"));
        console.log(gold);
        console.log(silver);
        console.log(bronze);
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
          <UserActivitySidebar tab={"badges"} user={user}></UserActivitySidebar>
        </Grid>

        <Grid item xs={10}>
          <Typography
            sx={{ fontSize: 20, color: "#212121", align: "left" }}
            color="text.secondary"
            gutterBottom
            align="left"
          >
            Badges
          </Typography>{" "}
          {user === "" || user.badges.length === 0 ? (
            <div>
              {" "}
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
                    No badges earnt yet.
                  </Typography>
                </ListItem>
              </List>
            </div>
          ) : (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {user.gold !== "" ? (
                gold.map((goldbadge) => (
                  <Grid item xs={3}>
                    <div>
                      {goldbadge.tagBased === true ? (
                        <div>
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#eeeeee",
                              border: 1,
                              borderColor: "#bdbdbd",
                              color: "#757575",
                              fontSize: 15,
                              mb: 1,
                            }}
                          >
                            <CircleIcon
                              sx={{
                                color: "#ffc400",
                                fontSize: 10,
                              }}
                            ></CircleIcon>{" "}
                            {goldbadge.name}
                          </Box>
                        </div>
                      ) : (
                        <div>
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#263238",
                              border: 1,
                              borderColor: "#bdbdbd",
                              color: "white",
                              fontSize: 15,
                              mb: 1,
                            }}
                          >
                            <CircleIcon
                              sx={{
                                color: "#ffc400",
                                fontSize: 10,
                              }}
                            ></CircleIcon>{" "}
                            {goldbadge.name}
                          </Box>
                        </div>
                      )}
                    </div>
                  </Grid>
                ))
              ) : (
                <div></div>
              )}
              {user.silver !== "" ? (
                silver.map((silverbadge) => (
                  <Grid item xs={3}>
                    <div>
                      {silverbadge.tagBased === true ? (
                        <div>
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#eeeeee",
                              border: 1,
                              borderColor: "#bdbdbd",
                              color: "#757575",
                              fontSize: 15,
                              mb: 1,
                            }}
                          >
                            <CircleIcon
                              sx={{
                                color: "#bdbdbd",
                                fontSize: 10,
                              }}
                            ></CircleIcon>{" "}
                            {silverbadge.name}
                          </Box>
                        </div>
                      ) : (
                        <div>
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#263238",
                              border: 1,
                              borderColor: "#bdbdbd",
                              color: "white",
                              fontSize: 15,
                              mb: 1,
                            }}
                          >
                            <CircleIcon
                              sx={{
                                color: "#bdbdbd",
                                fontSize: 10,
                              }}
                            ></CircleIcon>{" "}
                            {silverbadge.name}
                          </Box>
                        </div>
                      )}
                    </div>
                  </Grid>
                ))
              ) : (
                <div></div>
              )}
              {bronze !== "" ? (
                bronze.map((bronzebadge) => (
                  <Grid item xs={3}>
                    <div>
                      {bronzebadge.tagBased === true ? (
                        <div>
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#eeeeee",
                              border: 1,
                              borderColor: "#bdbdbd",
                              color: "#757575",
                              fontSize: 15,
                              mb: 1,
                            }}
                          >
                            <CircleIcon
                              sx={{
                                color: "#757575",
                                fontSize: 10,
                              }}
                            ></CircleIcon>{" "}
                            {bronzebadge.name}
                          </Box>
                        </div>
                      ) : (
                        <div>
                          <Box
                            component="div"
                            sx={{
                              bgcolor: "#263238",
                              border: 1,
                              borderColor: "#bdbdbd",
                              color: "white",
                              fontSize: 15,
                              mb: 1,
                            }}
                          >
                            <CircleIcon
                              sx={{
                                color: "#757575",
                                fontSize: 10,
                              }}
                            ></CircleIcon>{" "}
                            {bronzebadge.name}
                          </Box>
                        </div>
                      )}
                    </div>
                  </Grid>
                ))
              ) : (
                <div></div>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
