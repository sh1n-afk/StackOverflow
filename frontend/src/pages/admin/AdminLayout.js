import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Navbar/Sidebar";
// import AdminSidebar from "../../components/admin/SidebarAdmin";
import { useNavigate } from "react-router";

const drawerWidth = 240;

export default function AdminLayout(props) {
  const [value, setValue] = React.useState(1);

  let navigate = useNavigate();
  const setComponent = (value) => {
    // setValue(value);
    // if (value == 0) {
    //   //it is home page
    //   var url = "/home";
    //   navigate(url);
    // } else if (value == 2) {
    //   //it is question page
    //   var url = "/question";
    //   navigate(url);
    // } else if (value == 3) {
    //   //it is tags page
    //   var url = "/tags";
    //   navigate(url);
    // } else if (value == 4) {
    //   //it is users page
    //   var url = "/users";
    //   navigate(url);
    // }
  };
  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />
      {/* <Navbar setComponent={setComponent}/> */}
      {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Box
        sx={{ display: "flex" }}
        style={{
          paddingLeft: "0%",
          paddingRight: "0%",
          justifyContent: "center",
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            width: 174,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 174,
              boxSizing: "border-box",
              marginLeft: "0%",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <Sidebar
              setComponent={setComponent}
              tabValue={props.sidebarTabValue}
            />
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{
            width: "80vw",
            wordWrap: "wrap",
            paddingTop: "0px",
            wordBreak: "break-all",
          }}
        >
          <Toolbar />
          {props.page}
          {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
        </Box>
      </Box>
    </Box>
  );
}
