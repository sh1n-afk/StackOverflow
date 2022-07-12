import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function UserEditSidebar(props) {
  const { tab } = props;
  const { user } = props;
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fb8c00",
      },
    },
  });

  const answersClickHandler = (e) => {
    navigate("/users/activity/answers/" + user.user_id);
  };

  return (
    <div className="usereditprofile-sidebar-component">
      <Typography
        sx={{ fontSize: 15, color: "#212121", align: "center" }}
        color="text.secondary"
        gutterBottom
        align="center"
      >
        Personal Information
      </Typography>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          align="center"
          sx={{ color: "white", font: 20, width: 200 }}
        >
          Edit Profile
        </Button>
      </ThemeProvider>
    </div>
  );
}
