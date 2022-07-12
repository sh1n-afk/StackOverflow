import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Typography } from "@mui/material";
import STRING from "../../constant";
import axios from 'axios';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PopularTag() {

  const [graphdata,setGraphdata] = useState([]);

  useEffect(() => {
    axios
      .get(STRING.url + "/tags")
      .then((res) => {
        console.log(res.data);
        calData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const calData = (res) => {
    var data = [];
    res.sort((a, b) => b.posts.length - a.posts.length);
    res = res.slice(0, 10);
    res.forEach(element => {
      data.push({
        name: element.name,
        value: element.posts.length + 1 
      })
    });
    setGraphdata(data)
    // console.log(data);
  }

  return (
    <Grid container spacing={1}>
    <Typography
      sx={{ fontSize: 20, color: "#212121", align: "left" }}
      color="text.secondary"
      gutterBottom
      align="left"
    >
     <b>Top 10 most used tags.</b>
    </Typography>
            <PieChart width={600} height={600}>
            <Pie
            
                data={graphdata}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={120}
                outerRadius={200}
                paddingAngle={5}
                fill="#82ca9d"
                label
            >
                {graphdata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                
            </Pie>
            <Tooltip/>
            </PieChart>
        </Grid>
  );
}
