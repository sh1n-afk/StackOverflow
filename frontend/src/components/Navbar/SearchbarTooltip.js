import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: "none", 
  textAlign: "left",
  verticalAlign: "center"
}));

export default function SearchbarTooltip() {
  return (
    <Box sx={{ flexGrow: 1 , marginTop: "15px", marginBottom: "5px", marginRight: "5px", marginLeft: "5px"}}>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{paddingTop: "0px"}}>
          <Item>
          <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#0C0D0E",
                    fontFamily: 'ui-monospace,"Cascadia Mono","Segoe UI Mono","Liberation Mono",Menlo,Monaco,Consolas,monospace',
                    marginRight: "2px",
                    fontSize: "13px",
                    
                  }}
                  textTransform="none"
                >
                  [tag]
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#9FA6AD",
                    fontFamily: '"-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Helvetica Neue","Arial","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
                    fontSize: "13px"
                  }}
                  textTransform="none"
                >
                  search within a tag
                </Typography>
          </Item>
        </Grid>
        <Grid item xs={6} style={{paddingTop: "0px"}}>
        <Item>
          <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#0C0D0E",
                    fontFamily: 'ui-monospace,"Cascadia Mono","Segoe UI Mono","Liberation Mono",Menlo,Monaco,Consolas,monospace',
                    marginRight: "2px",
                    fontSize: "13px",
                    
                  }}
                  textTransform="none"
                >
                  is:question
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#9FA6AD",
                    fontFamily: '"-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Helvetica Neue","Arial","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
                    fontSize: "13px"
                  }}
                  textTransform="none"
                >
                  type of post
                </Typography>
          </Item>
        </Grid>
        <Grid item xs={6} style={{paddingTop: "0px"}}>
        <Item>
          <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#0C0D0E",
                    fontFamily: 'ui-monospace,"Cascadia Mono","Segoe UI Mono","Liberation Mono",Menlo,Monaco,Consolas,monospace',
                    marginRight: "2px",
                    fontSize: "13px",
                    
                  }}
                  textTransform="none"
                >
                  user:1234
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#9FA6AD",
                    fontFamily: '"-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Helvetica Neue","Arial","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
                    fontSize: "13px"
                  }}
                  textTransform="none"
                >
                  search by author
                </Typography>
          </Item>
        </Grid>
        <Grid item xs={6} style={{paddingTop: "0px"}}>
        <Item>
          <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#0C0D0E",
                    fontFamily: 'ui-monospace,"Cascadia Mono","Segoe UI Mono","Liberation Mono",Menlo,Monaco,Consolas,monospace',
                    marginRight: "2px",
                    fontSize: "13px",
                    
                  }}
                  textTransform="none"
                >
                  isaccepted:yes
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#9FA6AD",
                    fontFamily: '"-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Helvetica Neue","Arial","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
                    fontSize: "13px"
                  }}
                  textTransform="none"
                >
                  search within status
                </Typography>
          </Item>
        </Grid>
        <Grid item xs={6} style={{paddingTop: "0px"}}>
        <Item>
          <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#0C0D0E",
                    fontFamily: 'ui-monospace,"Cascadia Mono","Segoe UI Mono","Liberation Mono",Menlo,Monaco,Consolas,monospace',
                    marginRight: "2px",
                    fontSize: "13px",
                    
                  }}
                  textTransform="none"
                >
                  "words here"
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  sx={{
                    display: { xs: "none", sm: "inline-block" },
                    color: "#9FA6AD",
                    fontFamily: '"-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Helvetica Neue","Arial","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
                    fontSize: "13px"
                  }}
                  textTransform="none"
                >
                  exact phrase
                </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
