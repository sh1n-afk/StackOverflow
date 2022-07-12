import React from "react";
import Typography from "@mui/material/Typography";
import { Grid, List, ListItem } from "@mui/material";

export default function UserAbout(props) {
  const { user } = props;

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: 20, color: "#212121", align: "left" }}
            color="text.secondary"
            gutterBottom
            align="left"
          >
            About
          </Typography>
          {user.about === "" ? (
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
                  {user.username}'s' about me section is currently blank.
                </Typography>
              </ListItem>
            </List>
          ) : (
            <Typography
              sx={{ fontSize: 16, color: "#212121", align: "left" }}
              color="text.secondary"
              gutterBottom
              align="left"
            >
              {user.about}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
