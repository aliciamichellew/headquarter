import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import { Check } from "@mui/icons-material";

const DeleteExperiencedInternshipModal = ({
  company,
  position,
  handleRemoveExperienced,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitRequest = (event, company, position) => {
    handleRemoveExperienced(event, company, position);
  };

  return (
    <div>
      <Button
        sx={{
          color: "#FFCE26",
          my: 0.5,
          textAlign: "left",
        }}
        startIcon={<Check />}
        style={{ justifyContent: "center" }}
        onClick={handleClickOpen}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Internship Taken</Typography>
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove from Internship Taken</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}>
          <Typography sx={{ fontSize: 20 }}>
            Are you sure you want to remove it?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Box
            component='form'
            noValidate
            onSubmit={event => {
              submitRequest(event, company, position);
              handleClose();
            }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit'>Submit</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteExperiencedInternshipModal;
