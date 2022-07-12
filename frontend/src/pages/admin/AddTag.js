import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField, Button } from '@mui/material';
import STRING from "../../constant"
import axios from "axios"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function AddTag(props) {

  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");

    const handleAddTag = () => {
        var tag = document.getElementById("tagName").value;  
        var description = document.getElementById("tagDescription").value;  
        if(tag === "" || description === "") {
          alert("please enter data")
        }
        else {
          var body = {
            name: tag,
            description
          }
          axios.post(STRING.url + "/tags/addTag", body).then((res) => {
              console.log(res.data);
            }).catch(err => {
              console.log(err)
            });
            props.handleClose();
        }
        
    }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
                >
                <TextField fullWidth label="Tag Name" id="tagName" 
                onChange={(e) => setTagName(e.target.value)}/>
                <TextField fullWidth
                    id="tagDescription"
                    sx={{ mt: 2 }}
                    label="Tag Description"
                    multiline
                    rows={4}
                    onChange={(e) => setTagDescription(e.target.value)}
                />
                <Button  sx={{ mt: 2 }} variant="contained" onClick={handleAddTag}>Add Tag</Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}
