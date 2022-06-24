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

const DeletePostModal = ({ postId, handleSubmit }) => {
  const userInfo = localStorage.getItem("userInfo");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
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
              handleSubmit(event, postId);
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
