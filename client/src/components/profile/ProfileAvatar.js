import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
// Import required actions.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { fill } from "@cloudinary/url-gen/actions/resize";
const ProfileAvatar = ({ profilePic, width }) => {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dpc7wncat",
    },
  });
  // Use the image with public ID, 'front_face'.
  const myImage = cld.image(profilePic);

  // Apply the transformation.
  myImage
    .resize(fill().width(width).height(width)) // Crop the image.
    .roundCorners(byRadius(100));

  // Render the transformed image in a React component.
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
};

export default ProfileAvatar;
