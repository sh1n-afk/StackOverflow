import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function UserStats(props) {
  const { user } = props;
  const card = (
    <React.Fragment>
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography
              sx={{ fontSize: 18, color: "#212121", mb: "0" }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              {user.reputation}
            </Typography>
            <Typography
              sx={{ fontSize: 15, color: "#212121" }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              reputation
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ fontSize: 18, color: "#212121", mb: "0" }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              {user.questionsViewCount}
            </Typography>
            <Typography
              sx={{ fontSize: 15, color: "#212121" }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              reached
            </Typography>
          </Grid>
        </Grid>
        &nbsp;
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography
              sx={{ fontSize: 18, color: "#212121", mb: "0" }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              {user.questionsAnsweredCount}
            </Typography>
            <Typography
              sx={{ fontSize: 15, color: "#212121" }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              answers
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ fontSize: 18, color: "#212121", mb: "0" }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              {user.questionsAskedCount}
            </Typography>
            <Typography
              sx={{ fontSize: 15, color: "#212121" }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              questions
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </React.Fragment>
  );

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3.25}>
          <Typography
            sx={{ fontSize: 20, color: "#212121" }}
            color="text.secondary"
            gutterBottom
            align="center"
          >
            Stats
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={11} align="center">
          <Box sx={{ width: 200 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
