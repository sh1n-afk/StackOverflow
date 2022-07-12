import React, { useEffect, useState } from "react";
import userJson from "../dummydata/user.json";
import UserDetails from "../components/UserProfile/UserDetails";
import UserProfileNavbar from "../components/UserProfile/UserProfileNavbar";
import { useSelector } from "react-redux";
import { storage_bucket } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UserActivitySidebar from "../components/UserProfile/UserActivitySidebar";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import UserAnswers from "../components/UserProfile/UserAnswers";
import validator from "validator";
import UserEditSidebar from "../components/UserProfile/UserEditSidebar";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router";
import STRINGS from "../constant";

export default function UserEditProfile() {
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [about, setabout] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();
  let navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.LoggedInUser);

  //city change handler to update state variable with the text entered by the user
  const cityChangeHandler = (e) => {
    setMessage("");
    setCity(e.target.value);
  };

  //country change handler to update state variable with the text entered by the user
  const countryChangeHandler = (e) => {
    setMessage("");
    setCountry(e.target.value);
  };

  //about change handler to update state variable with the text entered by the user
  const aboutChangeHandler = (e) => {
    setMessage("");
    setabout(e.target.value);
  };

  //image change handler to update state variable with the text entered by the user
  const onImageChange = (event) => {
    setMessage("");
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0] == null) return;
      const storageRef = ref(storage_bucket, event.target.files[0].name);
      uploadBytes(storageRef, event.target.files[0])
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          console.log("Download URL", downloadURL);
          setImage(downloadURL);
        });
    }
  };

  useEffect(() => {
    console.log(loggedInUser._id);
    axios
      .get(STRINGS.url + `/user/` + id)
      .then((res) => {
        console.log(res.data);
        setUser(res.data[0]);
        console.log(res.data[0].city);
        console.log(res.data[0].country);
        setCity(res.data[0].location.city);
        setImage(res.data[0].profilePicture);
        setCountry(res.data[0].location.country);
        setabout(res.data[0].about);
      })
      .catch((err) => {
        console.log(err);
        navigate("/errorpage");
      });
    console.log(user.tags);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("here");
    if (!validator.isAlpha(city, "en-US", { ignore: " " })) {
      setMessage("City can have only letters");
    } else if (!validator.isAlpha(country, "en-US", { ignore: " " })) {
      setMessage("Country can have only letters");
    } else {
      const data = {
        _id: id,
        city: city,
        about: about,
        country: country,
        image: image,
      };
      console.log(data);
      axios
        .put(STRINGS.url + `/user/editprofile`, data)
        .then((res) => {
          setMessage("Your profile has been updated");
          console.log(res);
        })
        .catch((err) => {
          setMessage(err.res.data);
        });
    }
  };

  return loggedInUser === null || loggedInUser._id !== id ? (
    <Navigate to="/errorpage" />
  ) : (
    <div>
      <div className="userprofile-details-component">
        <UserDetails user={user}></UserDetails>
      </div>
      <div>
        <UserProfileNavbar page={"editprofile"} user={user}></UserProfileNavbar>
      </div>
      <br></br>
      <Grid container spacing={0}>
        <Grid item xs={2.5}>
          {" "}
          <UserEditSidebar user={user}></UserEditSidebar>
        </Grid>

        <Grid item xs={9}>
          {" "}
          <Typography
            sx={{ fontSize: 25, color: "#212121", align: "left" }}
            color="text.secondary"
            gutterBottom
            align="left"
          >
            Edit Your Profile
          </Typography>
          <Divider light />
          &nbsp;
          <Typography
            sx={{ fontSize: 20, color: "#212121", align: "left" }}
            color="text.secondary"
            gutterBottom
            align="left"
          >
            Public Information
          </Typography>
          <Box sx={{ border: 1, width: 800, height: 700 }}>
            <div>
              <Card
                style={{
                  border: 1,
                  width: 750,
                  height: 680,
                  marginLeft: "20px",
                }}
                align="left"
              >
                <h6>Profile Image</h6>
                <img
                  style={{
                    position: "sticky",
                    height: "130px",
                    width: "130px",
                  }}
                  src={image ? image : "/images/userdefault.png"}
                  className="card-img-top"
                  alt="description of image"
                  margin-bottom="2"
                />
                <br></br>
                <input type="file" name="myImage" onChange={onImageChange} />
                <br></br>
                &nbsp;
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#212121",
                  }}
                  color="text.secondary"
                  align="left"
                  mt="4"
                  gutterBottom
                >
                  City
                </Typography>
                <TextField
                  id="city"
                  type="text"
                  value={city}
                  size="30"
                  onChange={cityChangeHandler}
                  required
                  sx={{ width: 500 }}
                />
                <Typography
                  sx={{ fontSize: 16, fontWeight: "bold", color: "#212121" }}
                  color="text.secondary"
                  align="left"
                  gutterBottom
                >
                  Country
                </Typography>
                <TextField
                  id="country"
                  type="text"
                  value={country}
                  size="30"
                  onChange={countryChangeHandler}
                  required
                  sx={{ width: 500 }}
                />
                <Typography
                  sx={{ fontSize: 16, fontWeight: "bold", color: "#212121" }}
                  color="text.secondary"
                  align="left"
                  gutterBottom
                >
                  About
                </Typography>
                <TextField
                  id="about"
                  type="text"
                  value={about}
                  onChange={aboutChangeHandler}
                  multiline
                  rows={4}
                  required
                  sx={{ width: 700 }}
                  mb="3"
                />
                &nbsp;
                <Button
                  sx={{ fontSize: 15, width: 150, color: "#fafafa", mt: 4 }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Save profile
                </Button>
                <Typography
                  sx={{
                    fontSize: 16,
                    color: "#212121",
                    fontWeight: "bold",
                    m: "2",
                  }}
                  color="text.secondary"
                  gutterBottom
                >
                  {message}
                </Typography>
              </Card>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
