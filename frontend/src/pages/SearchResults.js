import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router';
import QuestionAnswerCards from "../components/Cards/QuestionAnswerCards";
import HomeFilter from "../components/Filters/HomeFilter";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import STRINGS from "../constant";
import SearchCards from "../components/Cards/SearchCards";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: "none",
  verticalAlign: "center",
}));

const drawerWidth = 240;

export default function SearchResults() {
  let { searchText }= useParams();
  const [posts, setPosts] = React.useState([]);
  const [tempPosts, setTempPosts] = React.useState([]);

  let navigate = useNavigate();
  useEffect(() => {
    axios.get(STRINGS.url + "/search/"+ searchText).then((response) => {
      setPosts(response.data);
      setTempPosts(response.data);
      
    });
    // console.log(posts);
    // setRefreshGrid(false);
  },[])
  return (
    <Box
      style={{ position: "relative", width: "80%", paddingTop: "10px" }}
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
                    Search Results for : {searchText}
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
                    onClick={() => navigate('/ask')}
                  >
                    Ask Question
                  </Button>
                </Item>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12} style={{ paddingTop: "0px" }}>
                <Item>
                <Typography
                    variant="body1"
                    
                    component="div"
                    sx={{
                      display: { xs: "none", sm: "inline-block" },
                      color: "#232629",
                      fontFamily:
                        '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                      marginRight: "0px",
                      fontSize: "13px",
                    wordWrap:"wrap",
                    wordBreak: "break-all"
                    }}
                    textTransform="none"
                  >
                    Java is a high-level object oriented programming language. Use this tag when you're having problems using or understanding the language itself. This tag is frequently used alongside other tags for libraries and/or frameworks used by Java developers.
                  </Typography>
                </Item>
              </Grid> */}
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
                    {tempPosts ? tempPosts.length.toLocaleString('en-US') : 0} Questions
                  </Typography>
                </Item>
              </Grid>
              <Grid item xs={6} sm={6} md={6} style={{ paddingTop: "0px" }}>
                <Item style={{ textAlign: "right" }}>
                  <HomeFilter data={posts} setTempPosts={setTempPosts}/>
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
            <SearchCards type="search" data={question} />
          )) : "Loading ..."}
        </Grid>
      </Grid>
    </Box>
  );
}
