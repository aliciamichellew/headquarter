import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { UserContext } from "../App";

const AddPostModal = ({ moduleCode, handleSubmit }) => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useContext(UserContext);
  const userId = userInfo ? userInfo._id : null;
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    setIsAnonymous(e.target.checked);
  };

  if (!userId) {
    return <></>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Button
        variant='contained'
        sx={{
          backgroundColor: "#D4D4D4",
          color: "#909090",
          height: 40,
          width: "100%",
        }}
        onClick={handleClickOpen}>
        Add A New Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}>
          <Typography sx={{ fontSize: 20 }}>Title</Typography>
          <TextField
            id='outlined-textarea'
            maxRows={5}
            sx={{ my: 1 }}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Typography sx={{ fontSize: 20 }}>Post</Typography>
          <TextField
            id='outlined-textarea'
            maxRows={5}
            multiline
            sx={{ my: 1 }}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={isAnonymous} onChange={handleChange} />}
            label='Anonymous'
          />
        </DialogContent>
        <DialogActions>
          <Box
            component='form'
            noValidate
            onSubmit={event => {
              handleSubmit(event, userId, isAnonymous, text, title, moduleCode);
              handleClose();
            }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddPostModal;
