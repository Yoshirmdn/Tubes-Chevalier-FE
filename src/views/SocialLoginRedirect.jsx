import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../api/axios/axios";
import { useEffect } from "react";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

export default function SocialLoginRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    let token = queryParams.get("token");
    localStorage.setItem("ACCESS_TOKEN", token);
    getProfileData();
  }, []);

  const getProfileData = async () => {
    axiosClient
      .get("/user")
      .then((res) => {
        localStorage.setItem("USER_ROLE", res.data.data.user.role);
        navigate("/");
        toast.success(res.data?.message);
      })
      .catch((err) => {
        const response = err.response;
        navigate("/login");
        console.error(response);
        toast.error("Something went wrong!");
      });
  };

  return <Loading />;
}
