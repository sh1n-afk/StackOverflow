import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import usertaginfo from "../../dummydata/usertaginfo.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { useParams } from "react-router";
import STRINGS from "../../constant";
import { Link } from "react-router-dom";

export default function UserTopTags(props) {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const { length } = props;
  const [tags, setTags] = useState(usertaginfo);

  useEffect(() => {
    axios
      .get(STRINGS.url + `/user/` + id)
      .then((res) => {
        console.log(res.data);
        setUser(res.data[0]);
        setTags(
          res.data[0].tags.sort(function (a, b) {
            return b.score - a.score;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {user === "" || user.tags.length === 0 ? (
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
                {user.username} currently have no tags
              </Typography>
            </ListItem>
          </List>
        </div>
      ) : (
        <div>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {tags.slice(0, length).map((tag) => (
                  <ListItem sx={{ border: 1, borderColor: "#e0e0e0" }}>
                    <Grid container spacing={0}>
                      <Grid item xs={9}>
                        <Box
                          component="div"
                          sx={{
                            bgcolor: "#eeeeee",
                            border: 1,
                            borderColor: "#bdbdbd",
                            color: "#757575",
                            fontSize: 15,
                            width: 100,
                            mb: 1,
                          }}
                        >
                          <Link
                            to={"/question/tagged/" + tag.name}
                            style={{ textDecoration: "none", color: "#757575" }}
                          >
                            {tag.name}
                          </Link>
                        </Box>
                      </Grid>
                      <Grid item xs={3} style={{ display: "flex" }}>
                        <Typography
                          sx={{ fontSize: 18, color: "#212121" }}
                          color="text.secondary"
                          align="left"
                          gutterBottom
                        >
                          {tag.score} {"    "}
                        </Typography>{" "}
                        <Typography
                          sx={{ fontSize: 15, color: "#212121" }}
                          color="text.secondary"
                          align="left"
                          gutterBottom
                        >
                          &nbsp;
                        </Typography>
                        <Typography
                          sx={{ fontSize: 15, color: "#616161" }}
                          color="text.secondary"
                          align="left"
                          gutterBottom
                        >
                          score {"    "}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 15, color: "#212121" }}
                          color="text.secondary"
                          align="left"
                          gutterBottom
                        >
                          &nbsp; &nbsp;
                        </Typography>
                        <Typography
                          sx={{ fontSize: 18, color: "#212121" }}
                          color="text.secondary"
                          align="left"
                          gutterBottom
                        >
                          {tag.posts}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 15, color: "#212121" }}
                          color="text.secondary"
                          align="left"
                          gutterBottom
                        >
                          &nbsp; &nbsp;
                        </Typography>
                        <Typography
                          sx={{ fontSize: 15, color: "#616161" }}
                          color="text.secondary"
                          align="left"
                          gutterBottom
                        >
                          posts
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
