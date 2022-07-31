import React, { useContext, useEffect, useState } from "react";
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

const NewInternship = ({ handleSubmit }) => {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
        Add A New Internship
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Internship</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          <Typography sx={{ fontSize: 20 }}>Company</Typography>
          <TextField
            id="outlined-textarea"
            maxRows={5}
            sx={{ my: 1 }}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <Typography sx={{ fontSize: 20 }}>Position</Typography>
          <TextField
            id="outlined-textarea"
            maxRows={5}
            multiline
            sx={{ my: 1 }}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Box
            component="form"
            noValidate
            onSubmit={(event) => {
              handleSubmit(event, company, position);
              handleClose();
            }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewInternship;
