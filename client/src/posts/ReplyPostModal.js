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

import axios from "axios";

const ReplyPostModal = ({ postId }) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //   console.log("Authorization", JSON.parse(userInfo).token);
      const config = {
        headers: {
          "Content-type": "application/json",
          //   Authorization: `Bearer ${JSON.parse(userInfo).token}`,
        },
      };
      //   const { data } = await axios.put(
      //     "/api/post/comment",
      //     {
      //       post: { _id: postId },
      //       comment: { author: userId, text: text, isAnonymous: isAnonymous },
      //     }
      //     // config
      //   );

      //   console.log("post id", postId);

      const { res } = await axios({
        method: "put",
        url: "/api/post/comment",
        data: {
          post: { _id: postId },
          comment: { author: userId, text: text, isAnonymous: isAnonymous },
        },
        // config,
      });

      //   console.log(res);

      handleClose();
    } catch (error) {
      //   console.log("error", error);
    }
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
        Reply
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
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReplyPostModal;
