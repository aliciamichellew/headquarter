import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Avatar,
  Input,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import ProfileAvatar from "./ProfileAvatar";
import { UserContext } from "../../App";

const EditProfileModal = ({ handleEditProfile }) => {
  const [open, setOpen] = useState(false);
  const { userInfo } = useContext(UserContext);
  const userId = userInfo ? userInfo._id : null;
  const [profile, setProfile] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState();
  const [profilePic, setProfilePic] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");
  const [image, setImage] = useState("");

  const getUserProfile = async (e) => {
    try {
      // setLoading(false);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `/api/profile/getprofile/${userId}`,
        { userId },
        config
      );
      setProfile(data);
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setProfilePic(data.profilePic || "");
      // setImage(data.profilePic || "");
      setBio(data.bio || "");
      setTwitter(data.social.twitter || "");
      setFacebook(data.social.facebook || "");
      setLinkedIn(data.social.linkedIn || "");
      setInstagram(data.social.instagram || "");
      setWebsite(data.social.website || "");
      setGithub(data.social.github || "");
    } catch (err) {}
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    previewFiles(file);
  };

  if (!userId || !userInfo) {
    return <></>;
  }

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          mb: 0,
          mx: 2,
          color: "#1E2328",
          backgroundColor: "#FFCE26",
          width: 150,
          height: 40,
        }}
        style={{ justifyContent: "center" }}
        onClick={handleClickOpen}
        startIcon={<Edit />}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Edit</Typography>
        </Box>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          <Box>
            {image && (
              <Avatar
                alt="Remy Sharp"
                src={image}
                sx={{ mr: 2, width: 150, height: 150 }}
              />
            )}
            {!image && <ProfileAvatar profilePic={profilePic} width={150} />}
          </Box>

          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e) => handleChange(e)}
            />
            {/* <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton> */}
          </label>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 }}>First Name</Typography>
            <TextField
              id="outlined-textarea"
              maxRows={5}
              sx={{ my: 1 }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 }}>Last Name</Typography>
            <TextField
              id="outlined-textarea"
              maxRows={5}
              sx={{ my: 1 }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 }}>Bio</Typography>
            <TextField
              id="outlined-textarea"
              maxRows={5}
              sx={{ my: 1 }}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 }}>Twitter</Typography>
            <TextField
              id="outlined-textarea"
              maxRows={5}
              sx={{ my: 1 }}
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 }}>Facebook</Typography>
            <TextField
              id="outlined-textarea"
              maxRows={5}
              sx={{ my: 1 }}
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 }}>LinkedIn</Typography>
            <TextField
              id="outlined-textarea"
              maxRows={5}
              sx={{ my: 1 }}
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 }}>Instagram</Typography>
            <TextField
              id="outlined-textarea"
              maxRows={5}
              sx={{ my: 1 }}
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 }}>Website</Typography>
            <TextField
              id="outlined-textarea"
              maxRows={5}
              sx={{ my: 1 }}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: 20 }}>GitHub</Typography>
            <TextField
              id="outlined-textarea"
              maxRows={5}
              sx={{ my: 1 }}
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            component="form"
            noValidate
            onSubmit={(event) => {
              handleEditProfile(
                event,
                userId,
                firstName,
                lastName,
                image,
                bio,
                twitter,
                facebook,
                linkedIn,
                instagram,
                website,
                github
              );
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

export default EditProfileModal;
