import React from 'react'
import { Grid } from '@mui/material';
import TagCard from './TagCard.js';

export default function TagsSearch(props){
    const tags = props.tags;
    const inputText = props.inputText;
    const popular = props.popular;
    
    if(popular==="Popular")
    {   
        tags.sort((a, b) => parseFloat(b.Questions_asked_today) - parseFloat(a.Questions_asked_today));
    }
   
    var filteredData = tags;
    if(inputText.length >= 3){
      filteredData = tags.filter((u) => u.name.toLowerCase().includes(inputText.toLowerCase()));
      filteredData = filteredData.slice(0,5);
    }
    // var filteredData = tags.filter((el) => {
    //     if (inputText === '') {
    //         return el;
    //     } else {
    //         return el.name.toLowerCase().includes(inputText);
    //         // return el.text.toLowerCase().includes(props.input)
    //     }
    // })

    // if(inputText!=="")
    // {
    //     filteredData = filteredData.slice(0,5)
    // }


 
  return (
    <div>
         <Grid container spacing={3} flexGrow={1}> 
      {
        filteredData.map(tags =>(
          <Grid item key ={tags._id} xs={3} md={3}>
          {/* <Paper>
            {tags.name}
          </Paper> */}
          <TagCard tags={tags} />
          </Grid>
        ))
      }
      </Grid>
    </div>
  )
}