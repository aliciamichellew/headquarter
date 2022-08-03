import React, { useContext, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const ExperiencedInternshipModal = ({
  internshipId,
  company,
  position,
  handleExperienced,
}) => {
  const userInfo = useContext(UserContext);
  const userId = userInfo.userInfo._id;
  const [open, setOpen] = useState(false);
  const [startDate, setstartDate] = useState(new Date("2014-08-18T21:11:54"));
  const [endDate, setendDate] = useState(new Date("2014-08-18T21:11:54"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChangeDate = (event) => {
  //   setendDate(event.target.value);
  // };

  const handleChangeStartDate = (newValue) => {
    setstartDate(newValue);
  };

  const handleChangeEndDate = (newValue) => {
    setendDate(newValue);
  };

  if (!userInfo) {
    return <></>;
  }

  // console.log("userId experienced", userInfo.userInfo._id);
  // console.log("userInfo = ", userInfo);

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
        onClick={handleClickOpen}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Add to Internship Taken</Typography>
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add to Internship Taken</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          <Typography sx={{ fontSize: 20 }}>
            company: {company}, position: {position},
          </Typography>
          <Typography sx={{ fontSize: 20 }}>Start Date</Typography>
          {/* <TextField
            id="outlined-textarea"
            maxRows={5}
            sx={{ my: 1 }}
            value={startDate}
            onChange={(e) => setstartDate(e.target.value)}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={startDate}
              onChange={handleChangeStartDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Typography sx={{ fontSize: 20 }}>End Date</Typography>
          {/* <TextField
            id="outlined-textarea"
            maxRows={5}
            sx={{ my: 1 }}
            value={endDate}
            onChange={(e) => setendDate(e.target.value)}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={endDate}
              onChange={handleChangeEndDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Box
            component="form"
            noValidate
            onSubmit={(event) => {
              handleExperienced(
                event,
                internshipId,
                userId,
                startDate,
                endDate
              );
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

export default ExperiencedInternshipModal;
