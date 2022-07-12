import { React, useState, useEffect } from "react";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import TagsSearch from "./TagsSearch.js";
import { Button, ButtonGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import STRINGS from "../../constant";

import "./tags.css";

const theme = createTheme({
  palette: {
    secondary1: {
      main: "#3B4044",
    },
  },
});
export default function TagPage() {
  // var dummytags = [
  //     {
  //         "name": "java",
  //         "tag_description": "Java tag",
  //         "Questions_asked_today": 100,
  //         "Questions_asked_this_week": 10,
  //         "Total_questions_asked": 120,
  //         "id": 1
  //     },

  //     {
  //         "name": "python",
  //         "tag_description": "python tag",
  //         "Questions_asked_today": 100,
  //         "Questions_asked_this_week": 10,
  //         "Total_questions_asked": 120,
  //         "id": 2
  //     },
  //     {
  //         "name": "C++",
  //         "tag_description": "C++ tag",
  //         "Questions_asked_today": 100,
  //         "Questions_asked_this_week": 10,
  //         "Total_questions_asked": 120,
  //         "id": 3
  //     },

  //     {
  //         "name": "React",
  //         "tag_description": "React tag qdsadasd dqwdqwfdcqd qwdqw",
  //         "Questions_asked_today": 100,
  //         "Questions_asked_this_week": 10,
  //         "Total_questions_asked": 120,
  //         "id": 4
  //     },

  //     {
  //         "name": "Redux",
  //         "tag_description": "Redux tag",
  //         "Questions_asked_today": 98,
  //         "Questions_asked_this_week": 9,
  //         "Total_questions_asked": 12,
  //         "id": 5
  //     },
  //     {
  //         "name": "OOPS",
  //         "tag_description": "OOP tag qdsadasd dqwdqwfdcqd qwdqw",
  //         "Questions_asked_today": 100,
  //         "Questions_asked_this_week": 10,
  //         "Total_questions_asked": 120,
  //         "id": 6
  //     },
  //     {
  //         "name": "HTML",
  //         "tag_description": "OOP tag qdsadasd dqwdqwfdcqd qwdqw",
  //         "Questions_asked_today": 100,
  //         "Questions_asked_this_week": 10,
  //         "Total_questions_asked": 120,
  //         "id": 7
  //     },
  //     {
  //         "name": "HADOOP",
  //         "tag_description": "OOP tag qdsadasd dqwdqwfdcqd qwdqw",
  //         "Questions_asked_today": 100,
  //         "Questions_asked_this_week": 10,
  //         "Total_questions_asked": 120,
  //         "id": 8
  //     },
  //     {
  //         "name": "GRAPHICS",
  //         "tag_description": "OOP tag qdsadasd dqwdqwfdcqd qwdqw",
  //         "Questions_asked_today": 100,
  //         "Questions_asked_this_week": 10,
  //         "Total_questions_asked": 120,
  //         "id": 9
  //     }

  // ]
  const [tags, setTags] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [popular, setPopular] = useState("");

  useEffect(() => {
    fetch(STRINGS.url + "/tags")
      .then((res) => res.json())
      .then((data) => {
        setTags(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    display: "inline-block",
    textAlign: "left",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    "&:focus": {
      border: "2px blue solid",
    },
    marginTop: "5px",
    marginRight: "5px",
    marginBottom: "5px",
    width: "60%",
    border: "2px lightgrey solid",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "lightgrey",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    marginLeft: 50,
  }));

  const clickMe = (e) => {
    setPopular(e);
  };
  return (
    <div style={{ textAlign: "left" }}>
      <h1>Tags</h1>
      <p>
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using
        <br></br>the right tags makes it easier for others to find and answer
        your question.
      </p>
      <a href="#" className="tags-customLink">
        Show all tag synonyms
      </a>

      <div className="tags-rowDiv" style={{ display: "flex" }}>
        <div style={{ textAlign: "left", width: "40%" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Filter by Tag name"
              autoFocus
            />
          </Search>
        </div>
        <div style={{ textAlign: "right", width: "60%" }}>
          <ThemeProvider theme={theme}>
            <ButtonGroup
              color="secondary1"
              variant="outlined"
              aria-label="outlined button group"
              style={{ textAlign: "right" }}
            >
              <Button
                onClick={() => {
                  clickMe("Popular");
                }}
              >
                Popular
              </Button>
              <Button
                onClick={() => {
                  clickMe("Name");
                }}
              >
                Name
              </Button>
              <Button
                onClick={() => {
                  clickMe("New");
                }}
              >
                New
              </Button>
            </ButtonGroup>
          </ThemeProvider>
        </div>
      </div>

      <TagsSearch tags={tags} inputText={searchText} popular={popular} />
      {/* //</Container> */}
    </div>
    //<div>App</div>
  );
}
