import { Grid, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { BarChart, Bar, Tooltip, Legend, XAxis, YAxis, CartesianGrid } from "recharts";
import STRING from "../../constant";
import axios from 'axios';

export default function QusPerDay() {

  const [graphdata,setGraphdata] = useState([]);

  useEffect(() => {
    axios
      .get(STRING.url + "/getQuestions")
      .then((res) => {
        // console.log(res.data);
        calData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const calData = (questions) => {
    var data = [];
    for(var i = 6; i >= 0; i--) {
      var date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)  
      var count = 0;
      // console.log(date);

      questions.forEach(q => {
          if(new Date(q.addedAt).getDate() === date.getDate()) {
            count++;
          }
      });
      data.push({
        name: date.getMonth() +"/"+ date.getDate(),
        questions: count
      })
    }
    setGraphdata(data)
    console.log(data);
  }
  
  return (
    <Grid container spacing={1}>
        <Typography
          sx={{ fontSize: 20, color: "#212121", align: "left" }}
          color="text.secondary"
          gutterBottom
          align="left"
        >
         <b> Number of questions posted per day </b>
        </Typography>
      <BarChart width={730} height={250} data={graphdata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="questions" fill="#8884d8" />
      </BarChart>
    </Grid>
  );
}
