import {
  Button,
  createTheme,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import react from "react";
import { useNavigate } from "react-router-dom";

export default function InternshipButton({ company, position, internshipId }) {
  let navigate = useNavigate();

  // console.log("internshipId = ", internshipId);

  return (
    <Button
      sx={{
        color: "#1E2328",
        my: 0.5,
        textAlign: "left",
        ":hover": {
          bgcolor: "#FFCE26",
        },
      }}
      style={{ justifyContent: "flex-start" }}
      onClick={() => {
        navigate(`/internships/${internshipId}`);
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>{company}</Typography>
        <Typography>{position}</Typography>
      </Box>
    </Button>
  );
}
