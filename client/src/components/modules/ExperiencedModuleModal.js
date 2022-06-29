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
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { Add } from "@mui/icons-material";

const ExperiencedModuleModal = ({ moduleCode, handleExperienced }) => {
  const userInfo = localStorage.getItem("userInfo");

  const [open, setOpen] = useState(false);
  const userId = JSON.parse(userInfo)._id;
  const [acadYear, setAcadYear] = useState("");
  const [semester, setSemester] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSemester = (event) => {
    setSemester(event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button
        sx={{
          color: "#FFCE26",
          my: 0.5,
          textAlign: "left",
          ":hover": {
            bgcolor: "#FFCE26",
          },
        }}
        startIcon={<Add />}
        style={{ justifyContent: "center" }}
        onClick={handleClickOpen}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Add to Module Taken</Typography>
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add to Module Taken</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          <Typography sx={{ fontSize: 20 }}>
            Module Code: {moduleCode}
          </Typography>
          <Typography sx={{ fontSize: 20 }}>Academic Year</Typography>
          <TextField
            id="outlined-textarea"
            maxRows={5}
            sx={{ my: 1 }}
            value={acadYear}
            onChange={(e) => setAcadYear(e.target.value)}
          />
          <Typography sx={{ fontSize: 20 }}>Semester</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Semester
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={semester}
              onChange={handleChangeSemester}
              label="Semester"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"Special Term 1"}>Special Term 1</MenuItem>
              <MenuItem value={"Special Term 2"}>Special Term 2</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Box
            component="form"
            noValidate
            onSubmit={(event) => {
              handleExperienced(event, userId, moduleCode, acadYear, semester);
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

export default ExperiencedModuleModal;
