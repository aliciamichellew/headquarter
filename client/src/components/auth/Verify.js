import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { UserContext } from "../../App";

export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const verifyUser = async (token) => {
    setLoading(true);
    setAuthToken(token);
    try {
      const { data } = await axios.get(`/api/users/verify/${token}`);
      console.log("res = ", data);
      setUserInfo(data);
      console.log("success");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyUser(token);
  }, []);

  if (!loading) {
    navigate("/home");
    return <></>;
  }

  return <div>Verification failed</div>;
}
