import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, List, ListItem } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import STRINGS from "../../constant";
import { useParams } from "react-router";

export default function UserBadges(props) {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [gold, setGold] = useState([]);
  const [silver, setSilver] = useState([]);
  const [bronze, setBronze] = useState([]);

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
      });
  }, []);

  return (
    <div>
      {" "}
      {user === "" || user.badges.length === 0 ? (
        <div>
          {" "}
          <Typography
            sx={{ fontSize: 20, color: "#212121" }}
            color="text.secondary"
            align="left"
            gutterBottom
          >
            Badges
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
                {user.username} currently have no badges
              </Typography>
            </ListItem>
          </List>
        </div>
      ) : (
        <div>
          <Typography
            sx={{ fontSize: 20, color: "#212121" }}
            color="text.secondary"
            align="left"
            gutterBottom
          >
            Badges
          </Typography>
          <Grid item xs={12} align="left">
            <Grid container spacing={0}>
              <Grid item xs={4} align="left">
                <Box sx={{ width: 200, minHeight: 250 }}>
                  <Card variant="outlined" sx={{ width: 220, height: 200 }}>
                    <CardContent>
                      <Grid container spacing={0}>
                        <Grid item xs={4}>
                          {" "}
                          <img
                            style={{
                              position: "sticky",
                              height: "60px",
                              width: "60px",
                            }}
                            align="left"
                            src={"/images/gold.JPG"}
                            className="card-img-top"
                            alt="description of image"
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            sx={{ fontSize: 26, color: "#212121", mb: "0" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            {gold.length}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 15, color: "#212121" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            gold badges
                          </Typography>
                        </Grid>
                      </Grid>
                      {gold.slice(0, 3).map((badge) => (
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
                            {badge.name}
                          </Box>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={4} align="left">
                <Box sx={{ width: 200, minHeight: 250 }}>
                  <Card variant="outlined" sx={{ width: 220, height: 200 }}>
                    <CardContent>
                      <Grid container spacing={0}>
                        <Grid item xs={4}>
                          {" "}
                          <img
                            style={{
                              position: "sticky",
                              height: "60px",
                              width: "60px",
                            }}
                            align="left"
                            src={"/images/silver.JPG"}
                            className="card-img-top"
                            alt="description of image"
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            sx={{ fontSize: 26, color: "#212121", mb: "0" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            {silver.length}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 15, color: "#212121" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            silver badges
                          </Typography>
                        </Grid>
                      </Grid>
                      {silver.slice(0, 3).map((badge) => (
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
                            {badge.name}
                          </Box>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={4} align="left">
                <Box sx={{ width: 120070, height: 250 }}>
                  <Card variant="outlined" sx={{ width: 220, height: 200 }}>
                    <CardContent>
                      <Grid container spacing={0}>
                        <Grid item xs={4}>
                          {" "}
                          <img
                            style={{
                              position: "sticky",
                              height: "60px",
                              width: "60px",
                            }}
                            align="left"
                            src={"/images/bronze.JPG"}
                            className="card-img-top"
                            alt="description of image"
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Typography
                            sx={{ fontSize: 26, color: "#212121", mb: "0" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            {bronze.length}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 15, color: "#212121" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            bronze badges
                          </Typography>
                        </Grid>
                      </Grid>
                      {bronze.slice(0, 3).map((badge) => (
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
                            {badge.name}
                          </Box>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
