import { Divider } from "@mui/material";
import * as React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import TagsList from "./TagsList";
import CardUserInfo from "./CardUserInfo";
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';

import roundOffNumber from '../../utils/roundOffNumber';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  color: theme.palette.text.secondary,
  boxShadow: "none",
  verticalAlign: "center",
}));

export default function SearchCards(props) {

  const p = props.data;
  // console.log(p);
  let postId = p._id;
  let postType = p.postType;
  let votes = (p.upvotes - p.downvotes);
  let formatted_votes = votes > 0 ? roundOffNumber(votes) : votes;

  let numberOfAnswers = p.numberOfAnswers;
  let formatted_numberOfAnswers = roundOffNumber(numberOfAnswers)
  
  let views = p.views;
  let formatted_views = roundOffNumber(views);

  let questionTitle = p.questionTitle;
  let description = p.shortdesc ? p.shortdesc.slice(0,400) : "";

  let isAccepted = p.isAccepted;
  let userInfo = {
    profileImageURL: "https://www.gravatar.com/avatar/c0bc039e1fa3c0e09e4c69a6d0a8c7bf?s=48&d=identicon&r=PG&f=1",
    userId: "",
    username: "mozway",
    reputation: 2896,
    askedOn: "2022-04-11T00:00:00.000Z",
  }

  let tags = p.questionTags;
  return (
    

      
          <div>
          <Divider />
          <Grid
            container
            spacing={2}
            style={{ marginBottom: "5px", alignItems: "flex-start", marginTop: "5px" }}
          >
            <Grid item xs={2} sm={2} md={2} style={{ paddingTop: "0px" }}>
              <Item>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  style={{
                    marginBottom: "5px",
                    marginTop: "5px",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                  }}
                >
                  <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "0px" }}>
                    <Item>
                    <Tooltip title={ votes + " Votes"} placement="right-end">
                        <Typography
                        variant="body1"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "inline-block" },
                          color: "#0C0D0E",
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                          marginRight: "0px",
                          fontSize: "13px",
                        }}
                        textTransform="none"
                      >
                        {votes} Votes
                      </Typography>
                      </Tooltip>
                      </Item>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "0px" }}>
                    <Item>
                    <Tooltip title={numberOfAnswers + " Answers"} placement="right-end">
                        {isAccepted ? (<Typography
                        variant="body1"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "inline-block" },
                          color: "#FFFFFF",
                          backgroundColor: "#48A868",
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                          marginRight: "0px",
                          padding:"5px 5px",
                          fontSize: "13px",
                          borderRadius:"2px",
                          
                        }}
                        textTransform="none"
                      >
                        <CheckIcon style={{ verticalAlign: "middle" }}/> {numberOfAnswers} Answers
                      </Typography>)  : 
                      ((numberOfAnswers == 0) ? (<Typography
                        variant="body1"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "inline-block" },
                          color: "#0C0D0E",
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                          marginRight: "0px",
                          fontSize: "13px",
                          padding:"5px 0px"
                        }}
                        textTransform="none"
                      >
                        0 Answer
                      </Typography>): (<Typography
                        variant="body1"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "inline-block" },
                          color: "#3D8F58",
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                          marginRight: "0px",
                          fontSize: "13px",
                          padding:"5px 5px",
                          border:"1px solid #3D8F58",
                          borderRadius:"2px"
                        }}
                        textTransform="none"
                      >
                        {formatted_numberOfAnswers} Answers
                      </Typography>))

                        }
                        
                        
                      
                      
                      
                      </Tooltip>
                      </Item>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "0px" }}>
                    <Item>
                    <Tooltip title={views + " views"} placement="right-end">
                      {views == 0 ? (<Typography
                        variant="body1"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "inline-block" },
                          color: "#0C0D0E",
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                          marginRight: "0px",
                          fontSize: "13px",
                        }}
                        textTransform="none"
                      >
                        0 Views
                      </Typography>) : (<Typography
                        variant="body1"
                        noWrap
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "inline-block" },
                          color: "#DA680B",
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                          marginRight: "0px",
                          fontSize: "13px",
                        }}
                        textTransform="none"
                      >
                        {formatted_views} Views
                      </Typography>)}
                        
                      
                      </Tooltip>
                      </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={10} sm={10} md={10} style={{ paddingTop: "0px" }}>
              <Item>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  style={{
                    marginBottom: "5px",
                    marginTop: "5px",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "0px" }}>
                    <Item>
                      <Link href={postType == "question" ? ("/question/view/" + postId) : ("/question/view/" + p.parentId)} underline="none" color="#0074CC" sx={{ "& :hover": { color: "#0A95FF" }}}>
                      <Typography
                        variant="body1"
                        
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "inline-block" },
                        //   color: "#0074CC",
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                          marginRight: "0px",
                          fontSize: "17px",
                        wordWrap:"wrap",
                        wordBreak: "break-all"
                        }}
                        textTransform="none"
                      >
                        {postType == "question" ?  ("Q: " + questionTitle) : ("A: " + questionTitle)}
                      </Typography>
                      </Link>
                    </Item>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} style={{ paddingTop: "0px" }}>
                    <Item>
                    <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          display: { xs: "none", sm: "inline-block" },
                          color: "#3B4045",
                          fontFamily:
                            '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                            marginRight: "0px",
                          fontSize: "13px",
                          wordWrap:"wrap",
                        wordBreak: "break-all"
                        }}
                        textTransform="none"
                      >
                        {description}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} style={{ width: "100%", paddingTop: "5px" }}>
                    <Item>
                    <Grid container spacing={2} style={{ alignItems: "center", marginTop: "0px"}}>
                  <Grid item xs={6} sm={6} md={6} style={{ paddingTop: "0px" }}>
                    <Item>
                      <TagsList tags={tags}/>
                    </Item>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} style={{ paddingTop: "0px" }}>
                    <Item style={{ textAlign: "right" }}>
                      <CardUserInfo type="home" data={userInfo}/>
                    </Item>
                  </Grid>
                </Grid>
                    </Item>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
          </div>
 
      
    
  );
}
