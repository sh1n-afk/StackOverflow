import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function UserActivitySidebar(props) {
  const { tab } = props;
  const { user } = props;
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#eeeeee",
      },
    },
  });

  const answersClickHandler = (e) => {
    navigate("/users/activity/answers/" + user._id);
  };

  const questionsClickHandler = (e) => {
    navigate("/users/activity/questions/" + user._id);
  };

  const tagsClickHandler = (e) => {
    navigate("/users/activity/tags/" + user._id);
  };

  const badgesClickHandler = (e) => {
    navigate("/users/activity/badges/" + user._id);
  };

  const bookmarksClickHandler = (e) => {
    navigate("/users/activity/bookmarks/" + user._id);
  };

  const reputationClickHandler = (e) => {
    navigate("/users/activity/reputation/" + user._id);
  };

  return (
    <div className="useractivity-sidebar-component">
      {" "}
      {tab === "answers" ? (
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            sx={{
              color: "#424242",
              font: 20,
              width: 150,
              borderRadius: "24px",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#525960",
              }}
              textTransform="capitalize"
            >
              Answers
            </Typography>
          </Button>
        </ThemeProvider>
      ) : (
        <Button
          sx={{ color: "#757575", width: 150, font: 20, borderRadius: "24px" }}
          onClick={answersClickHandler}
        >
          <Typography
            variant="body2"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "#525960",
            }}
            textTransform="capitalize"
          >
            Answers
          </Typography>
        </Button>
      )}
      <br></br>
      {tab === "questions" ? (
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            sx={{
              color: "#424242",
              width: 150,
              font: 20,
              borderRadius: "24px",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#525960",
              }}
              textTransform="capitalize"
            >
              Questions
            </Typography>
          </Button>
        </ThemeProvider>
      ) : (
        <Button
          sx={{ color: "#757575", width: 150, font: 20, borderRadius: "24px" }}
          onClick={questionsClickHandler}
        >
          <Typography
            variant="body2"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "#525960",
            }}
            textTransform="capitalize"
          >
            Questions
          </Typography>
        </Button>
      )}
      <br></br>
      {tab === "tags" ? (
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            sx={{
              color: "#424242",
              width: 150,
              font: 20,
              borderRadius: "24px",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#525960",
              }}
              textTransform="capitalize"
            >
              Tags
            </Typography>
          </Button>
        </ThemeProvider>
      ) : (
        <Button
          sx={{ color: "#757575", width: 150, font: 20, borderRadius: "24px" }}
          onClick={tagsClickHandler}
        >
          <Typography
            variant="body2"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "#525960",
            }}
            textTransform="capitalize"
          >
            Tags
          </Typography>
        </Button>
      )}
      <br></br>
      {tab === "bookmarks" ? (
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            sx={{
              color: "#424242",
              width: 150,
              font: 20,
              borderRadius: "24px",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#525960",
              }}
              textTransform="capitalize"
            >
              Bookmarks
            </Typography>
          </Button>
        </ThemeProvider>
      ) : (
        <Button
          sx={{ color: "#757575", width: 150, font: 20, borderRadius: "24px" }}
          onClick={bookmarksClickHandler}
        >
          <Typography
            variant="body2"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "#525960",
            }}
            textTransform="capitalize"
          >
            Bookmarks
          </Typography>
        </Button>
      )}
      <br></br>
      {tab === "badges" ? (
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            sx={{
              color: "#424242",
              width: 150,
              font: 20,
              borderRadius: "24px",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#525960",
              }}
              textTransform="capitalize"
            >
              Badges
            </Typography>
          </Button>
        </ThemeProvider>
      ) : (
        <Button
          sx={{ color: "#757575", width: 150, font: 20, borderRadius: "24px" }}
          onClick={badgesClickHandler}
        >
          <Typography
            variant="body2"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "#525960",
            }}
            textTransform="capitalize"
          >
            Badges
          </Typography>
        </Button>
      )}
      <br></br>
      {tab === "reputation" ? (
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            align="center"
            sx={{
              color: "#424242",
              width: 150,
              font: 20,
              borderRadius: "24px",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#525960",
              }}
              textTransform="capitalize"
            >
              Reputation
            </Typography>
          </Button>
        </ThemeProvider>
      ) : (
        <Button
          sx={{ color: "#757575", width: 150, font: 20, borderRadius: "24px" }}
          onClick={reputationClickHandler}
        >
          <Typography
            variant="body2"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              color: "#525960",
            }}
            textTransform="capitalize"
          >
            Reputation
          </Typography>
        </Button>
      )}
    </div>
  );
}
