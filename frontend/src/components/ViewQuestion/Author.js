import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Author(props) {
  const {  createdTime,isQuestion,answer } = props;

  //  const [author, setauthor] = useState({});
  //  useEffect(() => {
  //   setauthor(props.author)
  // }, [props.author]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        // p: 1,
        // m: 1,
        bgcolor: 'background.paper',
        borderRadius: 1,
        height: 70
      }}
    >
      <Card sx={{ width: 210, boxShadow: 0 }} style={isQuestion?{backgroundColor:"#88caf366"}:{}}>
        <CardContent>
          <Grid item container  >
            <Grid item xs={12}>
              <Typography variant="subtitle1" style={{ fontSize: "0.7rem", marginLeft: "0px", marginTop: "-13px" }}>
                {isQuestion?"asked":"answered"} {new Date(createdTime).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Avatar src={`${answer?.profilePicture}`} />
            </Grid>
            <Grid item xs={7} sx={{ textAlign: "left", ml: -3 }}>
              <Typography variant="body2" component="div" sx={{color:"blue"}} className="votes">
                <Link to={`/users/profile/${answer?.userId}`} style={{textDecoration:"none"}}>{answer?.username}</Link>
              </Typography>
              <span style={{ fontSize: "0.7rem", marginLeft: "0px", marginTop: "-1px", paddingRight: "10px" }}>{answer?.reputation}</span>
              {/* <span className="" title="badges" aria-hidden="true">
                <span className="badge1"></span><span className="badgecount">8</span>
                <span className="badge2"></span><span className="badgecount">10</span>
                <span className="badge3"></span><span className="badgecount">11</span>
              </span> */}
              {
         answer?.badges?.length > 0 ?
           <span className="userBadges_queans" title="badges" aria-hidden="true">
             {answer.badges.filter((x) => x.type === "gold").length>0 ? <><span className="badge1"></span><span className="badgecount">{answer.badges.filter((x) => x.type === "gold").length}</span></> : ""}
             {answer.badges.filter((x) => x.type === "silver").length>0? <><span className="badge2"></span><span className="badgecount">{answer.badges.filter((x) => x.type === "silver").length}</span></> : ""}
             {answer.badges.filter((x) => x.type === "bronze").length>0 ? <><span className="badge3"></span><span className="badgecount">{answer.badges.filter((x) => x.type === "bronze").length}</span></> : ""}
           </span>
           : ""
       }
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>

  );
}
