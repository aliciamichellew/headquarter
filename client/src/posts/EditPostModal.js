import React, { useEffect, useState } from "react";
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

const EditPostModal = ({ post, handleSubmit }) => {
  const userInfo = localStorage.getItem("userInfo");

  const [open, setOpen] = useState(false);
  const _id = JSON.parse(userInfo)._id;
  const [isAnonymous, setIsAnonymous] = useState(post.content.isAnonymous);
  const [text, setText] = useState(post.content.text);
  const [title, setTitle] = useState(post.content.title);
  const postId = post.content._id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setIsAnonymous(e.target.checked);
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
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
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
          <Box
            component="form"
            noValidate
            onSubmit={(event) => {
              handleSubmit(event, postId, isAnonymous, text, title);
              handleClose();
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPostModal;
