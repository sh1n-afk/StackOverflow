import React, {useState, useEffect} from 'react';
import AddTag from "./AddTag";
import { Button } from '@mui/material';
import Toolbar from "@mui/material/Toolbar";

export default function AdminHome() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Toolbar/>
      <Button  sx={{ mt: 2 }} onClick={handleOpen} variant="contained">Add Tag</Button>
      <AddTag open={open} handleClose={handleClose}/>
      
    </div>
  );
}
