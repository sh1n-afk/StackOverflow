import React from 'react'
import { Card, CardHeader,CardContent, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

const LINES_TO_SHOW = 4;

const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": LINES_TO_SHOW,
    "-webkit-box-orient": "vertical",
    fontSize: "13px"
  }
});

export default function TagCard({tags}){
  const classes = useStyles();
  return (
      
    <div>
        
        <Card elevation={3}>
        <Link to={'/question/tagged/'+tags.name} ><CardHeader subheader = {tags.name} sx={{display: 'inline-block',backgroundColor: '#E1ECF4',color: '#5183A8',padding: 1,borderRadius: 1.2,fontSize: 13,fontWeight: 'bold', marginTop: 1, marginLeft:1.5}}/></Link>
        <CardContent>
            <Typography variant="body1" color="textSecondary" className={classes.multiLineEllipsis}>
                {tags.description}
            </Typography>
            <div style={{display:'flex', justifyContent: 'space-between'}}>

                <Typography variant="body2" sx={{fontWeight: 'bold', fontSize:12, color:'gray'}}>
                {tags.posts.length} Questions
                </Typography>
                
                <Typography variant="body2" sx={{fontWeight: 'bold', fontSize:12, color:'gray'}}>
                {tags.posts.length} asked today,  <br/>
                {tags.posts.length} this week 
                </Typography>

            </div>
            
            
        </CardContent>
        </Card>
    </div>
  )
}