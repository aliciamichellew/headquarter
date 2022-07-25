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
  FormLabel,
} from "@mui/material";

const NewInternship = ({ handleSubmit }) => {
  const [open, setOpen] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    setIsAnonymous(e.target.checked);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button
        variant='contained'
        sx={{
          backgroundColor: "#000000",
          color: "#ffce26",
          height: 40,
          width: "100%",
        }}
        onClick={handleClickOpen}>
        Add A New Internship
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Internship</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{display:"flex", justifyContent:"flex-end"}}>
          <Typography sx={{ fontSize: 20 }}>company</Typography>
          <TextField
            id='outlined-textarea'
            maxRows={5}
            sx={{ my: 1 }}
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
          <Typography sx={{ fontSize: 20 }}>position</Typography>
          <TextField
            id='outlined-textarea'
            maxRows={5}
            sx={{ my: 1 }}
            value={position}
            onChange={e => setPosition(e.target.value)}
          />
          </Box>
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
              handleSubmit(company, position, isAnonymous);
              handleClose();
            }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>Submit</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewInternship;
