import React, { useState } from "react";
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

import { Reply } from "@mui/icons-material";

const ReplyPostModal = ({ postId, handleSubmit }) => {
  const [open, setOpen] = React.useState(false);
  const userInfo = localStorage.getItem("userInfo");
  const userId = JSON.parse(userInfo)._id;
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [text, setText] = useState("");

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
        sx={{
          color: "#1E2328",
          my: 0.5,
          textAlign: "left",
          ":hover": {
            bgcolor: "#FFCE26",
          },
        }}
        style={{ justifyContent: "center" }}
        onClick={handleClickOpen}
        startIcon={<Reply />}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Reply</Typography>
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
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
              handleSubmit(event, postId, userId, text, isAnonymous);
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

export default ReplyPostModal;
