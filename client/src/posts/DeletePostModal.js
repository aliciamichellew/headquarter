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
import { Delete } from "@mui/icons-material";

const DeletePostModal = ({ post, isComment, handleSubmit }) => {
  const userInfo = localStorage.getItem("userInfo");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitRequest = (event, post, isComment) => {
    if (isComment) {
      console.log("post submit request", post);
      handleSubmit(event, post.postId, post.comment._id);
    } else {
      handleSubmit(event, post.content._id);
    }
  };

  return (
    <div>
      <Button
        sx={{
          color: "#1E2328",
          my: 0.5,
          textAlign: "left",
          ":hover": {
            bgcolor: "#FFCE26",
          },
        }}
        startIcon={<Delete />}
        style={{ justifyContent: "center" }}
        onClick={handleClickOpen}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Delete</Typography>
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          <Typography sx={{ fontSize: 20 }}>
            Are you sure you want to delete it?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box
            component="form"
            noValidate
            onSubmit={(event) => {
              submitRequest(event, post, isComment);
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

export default DeletePostModal;
