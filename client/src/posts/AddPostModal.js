import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

import axios from "axios";

const AddPostModal = ({ moduleCode }) => {
  const userInfo = localStorage.getItem("userInfo");
  console.log(userInfo);

  const [open, setOpen] = useState(false);
  const _id = JSON.parse(userInfo)._id;
  console.log(_id);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  //   const module = moduleCode;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setIsAnonymous(e.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("masuk");

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      console.log(_id, isAnonymous, text, title, moduleCode);
      const { data } = await axios.post(
        "/api/post/add",
        { _id, isAnonymous, text, title, moduleCode },
        config
      );
      handleClose();
    } catch (error) {}
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#D4D4D4",
          color: "#909090",
          height: 40,
          width: "100%",
        }}
        onClick={handleClickOpen}
      >
        Add A New Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          <Typography sx={{ fontSize: 20 }}>Title</Typography>
          <TextField
            id="outlined-textarea"
            maxRows={5}
            sx={{ my: 1 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography sx={{ fontSize: 20 }}>Post</Typography>
          <TextField
            id="outlined-textarea"
            maxRows={5}
            multiline
            sx={{ my: 1 }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={isAnonymous} onChange={handleChange} />}
            label="Anonymous"
          />
        </DialogContent>
        <DialogActions>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPostModal;
