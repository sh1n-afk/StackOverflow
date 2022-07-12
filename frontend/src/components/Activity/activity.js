import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import STRINGS from "../../constant";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Activity(props) {
  const { id } = useParams();
  const [rows, setRows] = useState([]);

  React.useEffect(() => {
    axios
      .get(STRINGS.url + `/question/activity/${id}`)
      .then((res) => {
        console.log(res.data);
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <TableContainer component={Paper} sx={{ mt: 10, ml: 2 }}>
      <Typography
        variant="body2"
        noWrap
        component="div"
        sx={{
          display: { xs: "none", sm: "block", float: "left" },
          color: "#525960",
          p: 1,
        }}
        textTransform="capitalize"
      >
        {rows?.length} events
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "whitesmoke", fontWeight: "bold" }}>
            <TableCell sx={{ fontWeight: "bold" }}>
              When (toogle format)
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              what
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              by
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              license{" "}
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              comment
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.time}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    padding: "2px 5px",
                    color: "#39739D",
                    backgroundColor: "#E1ECF4",
                    borderRadius: "3px",
                    "&:hover": {
                      color: "#2C5877",
                      backgroundColor: "#D0E3F1",
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      display: { xs: "none", sm: "inline-block" },
                      fontFamily:
                        '-apple-system,BlinkMacSystemFont,"Segoe UI Adjusted","Segoe UI","Liberation Sans",sans-serif',
                      marginRight: "0px",
                      fontSize: "12px",
                      wordWrap: "wrap",
                      wordBreak: "break-all",
                    }}
                    textTransform="none"
                  >
                    {row.activityType}
                  </Typography>
                </Link>
                - {row.activityDescription}
              </TableCell>
              <TableCell align="right">
                <Link href={`/users/profile/${row.userId}`}>
                  {row.username}
                </Link>
              </TableCell>
              <TableCell align="right">{row.license}</TableCell>
              <TableCell align="right" sx={{ width: "400px" }}>
                {row.comment}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// <TableContainer component={Paper} sx={{mt:10,ml:2}}>
// <Typography
//         variant="body2"
//         noWrap
//         component="div"
//         sx={{
//           display: { xs: "none", sm: "block" ,float:"left"},
//           color: "#525960",
//           p:1
//         }}
//         textTransform="capitalize"
//       >
//        {rows?.length} events
// </Typography>
//   <Table sx={{ minWidth: 650 }} aria-label="a dense table">
//     <TableHead>
//       <TableRow sx={{backgroundColor:"whitesmoke",fontWeight: 'bold'}}>
//         <TableCell sx={{fontWeight: 'bold'}}>When (toogle format)</TableCell>
//         <TableCell align="right" sx={{fontWeight: 'bold'}}>what</TableCell>
//         <TableCell align="right" sx={{fontWeight: 'bold'}}>by</TableCell>
//         <TableCell align="right" sx={{fontWeight: 'bold'}}>license	</TableCell>
//         <TableCell align="right"  sx={{fontWeight: 'bold'}}>comment</TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {console.log(rows)}
//       {rows && rows.map((row) => (
//         <TableRow
//           key={row.comment}
//           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//         >
//           <TableCell component="th" scope="row" sx={{width:"300px"}}>
//             {row.time}
//           </TableCell>
//           <Box
//   component="div"
//   sx={{
//     display: "inline",
//     p: 1.1,
//     // m: 0.5,
//     bgcolor: "#e1ecf4",
//     borderColor: (theme) =>
//       theme.palette.mode === "dark" ? "grey.800" : "grey.300",
//     borderRadius: 1,
//     fontSize: "12px",
//     fontWeight: "700",
//   }}
// > <TableCell align="right" sx={{ width:"200px"}}>{row.activityType}</TableCell>
// </Box>
//           <TableCell align="right" sx={{width:"200px"}}><Link to={`/users/profile/${row.userId}`}>{row.username}</Link></TableCell>
//           <TableCell align="right"  sx={{width:"200px"}}>{row.license}</TableCell>
//           <TableCell align="right">{row.comment}</TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>
