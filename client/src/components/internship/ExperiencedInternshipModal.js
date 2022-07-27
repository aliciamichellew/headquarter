import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { UserContext } from "../../App";

const ExperiencedInternshipModal = ({
  company,
  position,
  handleExperienced,
}) => {
  const { userInfo }= useContext(UserContext);
  
  const [open, setOpen] = useState(false);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!userInfo) {
    return <></>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Button
        sx={{
          color: "#FFCE26",
          my: 0.5,
          textAlign: "left",
          //   ":hover": {
          //     bgcolor: "#FFCE26",
          //   },
        }}
        startIcon={<Add />}
        style={{ justifyContent: "center" }}
        onClick={handleClickOpen}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Add to Internship Taken</Typography>
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add to Internship Taken</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}>
          <Typography sx={{ fontSize: 20 }}>
            company: {company}, position: {position},
          </Typography>
          <Typography sx={{ fontSize: 20 }}>Start Date</Typography>
          <TextField
            id='outlined-textarea'
            maxRows={5}
            sx={{ my: 1 }}
            value={startDate}
            onChange={e => setstartDate(e.target.value)}
          />
          <Typography sx={{ fontSize: 20 }}>End Date</Typography>
          <TextField
            id='outlined-textarea'
            maxRows={5}
            sx={{ my: 1 }}
            value={endDate}
            onChange={e => setendDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Box
            component='form'
            noValidate
            onSubmit={event => {
              handleExperienced(
                event,
                userInfo._id,
                company,
                position,
                startDate,
                endDate
              );
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

export default ExperiencedInternshipModal;
