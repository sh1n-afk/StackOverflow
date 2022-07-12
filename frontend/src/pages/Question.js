import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Navbar/Sidebar';
import { useSelector } from 'react-redux';
import QuestionAnswerCards from "../components/Cards/QuestionAnswerCards";
import HomeFilter from "../components/Filters/HomeFilter";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

import STRINGS from '../constant';
import axios from "axios";
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ButtonGroup } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: "none",
  verticalAlign: "center",
}));

const drawerWidth = 240;

export default function Home() {

  let navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [posts, setPosts] = React.useState([]);
  const [tempPosts, setTempPosts] = React.useState(posts);
  const [refreshGrid, setRefreshGrid] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  console.log(tempPosts);

  useEffect(() => {
    axios.get(STRINGS.url + "/getQuestions").then((response) => {
      setPosts(response.data);
      setTempPosts(response.data);
      console.log(response.data);
    });

    
    fetch(STRINGS.url + "/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("data", data);
      })
      .catch((err) => {
        console.log("data", err);
      });
    // console.log(posts);
    setRefreshGrid(false);
  },[])

  // };

  const theme = createTheme({
    palette: {
      secondary1: {
        main: "#3B4044",
      },
    },
  });

  const interestingFilterFunction = (data) => {
    console.log(data);
    return data.sort((a,b) => new Date(b.modifiedAt.time).getTime() - new Date(a.modifiedAt.time).getTime());
  }

  const hotFilterFunction = (data) => {
    console.log(data)
    data = data.sort((a,b) => a.views - b.views);
    console.log(data) 
    return data;  
  }

  const scoreFilterFunction = (data) => {
    console.log(data)
    return data.sort((a,b) => (b.upvotes,b.downvotes) - (a.upvotes-a.downvotes) );  
  }

  const unansweredFilterFunction = (data) => {
    console.log(data);
    data = data.filter((d) => d.numberOfAnswers === 0);
    data = data.sort((a,b) => (a.upvotes-a.downvotes) - (b.upvotes,b.downvotes))
    console.log(data);
    return data;  
  }

  const clickMe = (e, s) => {
    console.log(e.target.id);

    switch(e.target.id){
        case "interestingFilter": setTempPosts(interestingFilterFunction(posts));break;
        case "hotFilter": setTempPosts(hotFilterFunction(posts));break;
        case "scoreFilter": setTempPosts(scoreFilterFunction(posts));break;
        case "unansweredFilter": setTempPosts(unansweredFilterFunction(posts));break;
        default: setTempPosts(interestingFilterFunction(posts));break;
    }
    console.log(s);

    document
      .getElementsByClassName("selectedFilter")[0]
      .classList.add("unselectedFilter");
    document
      .getElementsByClassName("selectedFilter")[0]
      .classList.remove("selectedFilter");

    document.getElementById(e.target.id).classList.remove("unselectedFilter");
    document.getElementById(e.target.id).classList.add("selectedFilter");
    // setPopular(e);
  };
  // useEffect(() => {
  //   axios.get(STRINGS.url + "/getQuestions").then((response) => {
  //     setPosts(response.data);
  //     setTempPosts(response.data);
  //   });
  // },[])
  
  return (
    <Box
      style={{ position: "relative", width: "100%", paddingTop: "10px" }}
      sx={{ display: "flex" }}
    >
      <Grid container spacing={2} style={{ marginBottom: "10px", marginTop: "0px" }}>
        <Grid item xs={12} sm={12} md={12} style={{ paddingTop: "0px" }}>
          <Item style={{ textAlign: "left" }}>
            <Grid container spacing={2} style={{ alignItems: "center", marginTop: "0px"}}>
              <Grid item xs={6} sm={6} md={6} style={{ paddingTop: "0px" }}>
                <Item>
                  <Typography
                    variant="body1"
                    noWrap
                    component="div"
                    sx={{
                      display: { xs: "none", sm: "inline-block" },
                      color: "#232629",
                      fontFamily:
                        '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                      marginRight: "2px",
                      fontSize: "27px",
                    }}
                    textTransform="none"
                  >
                    All Questions
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={6} sm={6} md={6} style={{ paddingTop: "0px" }}>
                <Item style={{ textAlign: "right" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      minWidth: "100px",
                      lineHeight: "2",
                      textTransform: "none",
                      color: "#FFFFFF",
                      backgroundColor: "#0A95FF",
                      borderColor: "#7AA7C7",
                      "&:hover": {
                        color: "#FFFFFF",
                        backgroundColor: "#0074CC",
                      },
                    }}
                    onClick={() => (isLoggedIn ? navigate('/ask') : navigate('/login'))}
                  >
                    Ask Question
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{ paddingTop: "0px" }}>
          <Item>
            <Grid container spacing={2} style={{ alignItems: "center", marginTop: "0px"}}>
              <Grid item xs={6} sm={6} md={6} style={{ paddingTop: "0px" }}>
                <Item style={{ textAlign: "left" }}>
                  <Typography
                    variant="body1"
                    noWrap
                    component="div"
                    sx={{
                      display: { xs: "none", sm: "inline-block" },
                      color: "#232629",
                      fontFamily:
                        '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                      marginRight: "2px",
                      fontSize: "17px",
                    }}
                    textTransform="none"
                  >
                    {tempPosts ? tempPosts.length : 0} Questions
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={6} sm={6} md={6} style={{ paddingTop: "0px" }}>
                <Item style={{ textAlign: "right" }}>
                <ThemeProvider theme={theme}>
                    <ButtonGroup
                      color="secondary1"
                      variant="outlined"
                      aria-label="outlined button group"
                      sx={{
                        
                        "& .unselectedFilter": { color: "#6A737C" },
                        "& .selectedFilter": {
                          color: "#3B4045",
                          backgroundColor: "#E3E6E8",
                        },
                      }}
                    >
                      <Button
                        id="interestingFilter"
                        className="selectedFilter"
                        onClick={(e) => {
                          clickMe(e, "Interesting");
                        }}
                        style={{ textTransform: "none", fontSize:"12px",
                        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif' }}
                      >
                        Interesting
                      </Button>
                      <Button
                        id="hotFilter"
                        className="unselectedFilter"
                        onClick={(e) => {
                          clickMe(e, "Hot");
                        }}
                        style={{ textTransform: "none", fontSize:"12px",
                        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif'}}
                      >
                        Hot
                      </Button>
                      <Button
                        id="scoreFilter"
                        className="unselectedFilter"
                        onClick={(e) => {
                          clickMe(e, "Score");
                        }}
                        style={{ textTransform: "none", fontSize:"12px",
                        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif' }}
                      >
                        Score
                      </Button>
                      <Button
                        id="unansweredFilter"
                        className="unselectedFilter"
                        onClick={(e) => {
                          clickMe(e, "Unanswered");
                        }}
                        style={{ textTransform: "none", fontSize:"12px",
                        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif' }}
                      >
                        Unanswered
                      </Button>
                    </ButtonGroup>
                  </ThemeProvider>
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          style={{ paddingTop: "0px", textAlign: "left" }}
        >
          {tempPosts ? tempPosts.map((question) => (
            <QuestionAnswerCards type="home" data={question} />
          )) : "Loading ..."}
        </Grid>
      </Grid>
    </Box>
  );
}
