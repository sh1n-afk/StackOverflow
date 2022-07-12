import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, ButtonGroup } from "@mui/material";

export default function HomeFilter(props){
    let p = props.posts;
    
    const theme = createTheme({
        palette: {
          secondary1: {
            main: "#3B4044",
          },
        },
      });

      const interestingFilterFunction = (data) => {
        console.log(data);
        // var d = data.sort((a,b) => new Date(a.askedOn).getTime() - new Date(b.askedOn).getTime());
        return data.sort((a,b) => new Date(b.modifiedAt.date).getTime() - new Date(a.modifiedAt.date).getTime());
      }

      const scoreFilterFunction = (data) => {
        console.log(data)
        return data.sort((a,b) => (a.upvotes-a.downvotes) - (b.upvotes,b.downvotes));  
      }



      const clickMe = (e, s) => {
        console.log(e.target.id);

        switch(e.target.id){
            case "interestingFilter": props.setTempPosts(interestingFilterFunction(p));break;
            // case "hotFilter": props.setTempPosts("hot");break;
            // case "scoreFilter": props.setTempPosts("score");break;
            // case "unansweredFilter": props.setTempPosts("unanswered");break;
            // default: props.setTempPosts("interestingFilter");break;
            case "scoreFilter": props.setTempPosts(scoreFilterFunction(p));break;
            default: props.setTempPosts(interestingFilterFunction(p));break;
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
    return(
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
                        Newest
                      </Button>
                      {/* <Button
                        id="hotFilter"
                        className="unselectedFilter"
                        onClick={(e) => {
                          clickMe(e, "Hot");
                        }}
                        style={{ textTransform: "none", fontSize:"12px",
                        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif'}}
                      >
                        Hot
                      </Button> */}
                      <Button
                        id="scoreFilter"
                        className="unselectedFilter"
                        onClick={(e) => {
                          clickMe(e, "Score");
                        }}
                        style={{ textTransform: "none", fontSize:"12px",
                        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif' }}
                      >
                        Votes
                      </Button>
                      {/* <Button
                        id="unansweredFilter"
                        className="unselectedFilter"
                        onClick={(e) => {
                          clickMe(e, "Unanswered");
                        }}
                        style={{ textTransform: "none", fontSize:"12px",
                        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif' }}
                      >
                        Unanswered
                      </Button> */}
                    </ButtonGroup>
                  </ThemeProvider>
    )
}