import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, ButtonGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserCard from "./UserCard";
import UserSearch from "./UserSearch";
import STRINGS from "../../constant";

const theme = createTheme({
  palette: {
    secondary1: {
      main: "#3B4044",
    },
  },
});

export const UserPage = () => {
  // const dummyUsers = [
  //     {
  //       "userId": 1001,
  //       "userName": "Rushabh",
  //       "tagName": "python",
  //       "score": 25,
  //       "posts": 366,
  //       "location": "Warsaw, Poland",
  //       "reputation": 568
  //     },
  //     {
  //       "userId": 1002,
  //       "userName": "Amika",
  //       "tagName": "pandas",
  //       "score": 12,
  //       "posts": 366,
  //       "location": "Warsaw, Poland",
  //       "reputation": 568
  //     },
  //     {
  //       "userId": 1003,
  //       "userName": "Harsh",
  //       "tagName": "dataframe",
  //       "score": 433,
  //       "posts": 2313,
  //       "location": "Warsaw, Poland",
  //       "reputation": 568
  //     },
  //     {
  //       "userId": 1004,
  //       "userName": "Harsha",
  //       "tagName": "numpy",
  //       "score": 12,
  //       "posts": 4,
  //       "location": "Warsaw, Poland",
  //       "reputation": 568
  //     },
  //     {
  //       "userId": 1005,
  //       "userName": "Harshal",
  //       "tagName": "list",
  //       "score": 12,
  //       "posts": 431,
  //       "location": "Warsaw, Poland",
  //       "reputation": 568
  //     },
  //     {
  //       "userId": 1006,
  //       "userName": "Harshil",
  //       "tagName": "python-3.x",
  //       "score": 543,
  //       "posts": 1222,
  //       "location": "Warsaw, Poland",
  //       "reputation": 568
  //     },
  //     {
  //       "userId": 1009,
  //       "userName": "Harshavardhan",
  //       "tagName": "java",
  //       "score": 543,
  //       "posts": 366,
  //       "location": "Warsaw, Poland",
  //       "reputation": 568
  //     },
  //     {
  //       "userId": 1007,
  //       "userName": "Harshadsfesfsedf",
  //       "tagName": "javascript",
  //       "score": 25,
  //       "posts": 366,
  //       "location": "Warsaw, Poland",
  //       "reputation": 569
  //     }
  //   ]
  // const [users, setUsers] = useState(dummyUsers)
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [popular, setPopular] = useState("");

  // useEffect(() =>{
  //     // fetch('http://localhost:8000/tags')
  //     //   .then(res => res.json())
  //     //   .then(data=> setUsers(data))
  //     }, [])

  useEffect(() => {
    fetch(STRINGS.url + "/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log("data", data);
      })
      .catch((err) => {
        console.log("data", err);
      });
  }, []);
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    display: "inline-block",
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
      <h1>Users</h1>
      <div className="tags-rowDiv" style={{ display: "flex" }}>
        <div style={{ textAlign: "left", width: "40%" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Filter by User"
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
            >
              <Button
                onClick={() => {
                  clickMe("Reputation");
                }}
              >
                Reputation
              </Button>
              <Button
                onClick={() => {
                  clickMe("NewUsers");
                }}
              >
                NewUsers
              </Button>
              <Button
                onClick={() => {
                  clickMe("Voters");
                }}
              >
                Voters
              </Button>
              <Button
                onClick={() => {
                  clickMe("Editors");
                }}
              >
                Editors
              </Button>
              <Button
                onClick={() => {
                  clickMe("Moderators");
                }}
              >
                Moderators
              </Button>
            </ButtonGroup>
          </ThemeProvider>
        </div>
      </div>
      {/* <UserCard/> */}
      <UserSearch users={users} inputText={searchText} popular={popular} />
    </div>
  );
};

export default UserPage;
