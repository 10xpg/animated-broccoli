import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllChats, getAllUsers, getLoggedInUser } from "../../apis";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoader,
  setAllChats,
  setAllUsers,
  setUser,
  showLoader,
} from "../../redux";

export const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    let res = null;
    try {
      dispatch(showLoader());
      res = await getLoggedInUser();
      dispatch(hideLoader());

      if (res.success) {
        dispatch(setUser(res.data));
      } else {
        toast.error(res.message);
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      dispatch(hideLoader());
      toast.error(error);
    }
  };

  const fetchAllUsers = async () => {
    let res = null;
    try {
      dispatch(showLoader());
      res = await getAllUsers();
      dispatch(hideLoader());

      if (res.success) {
        dispatch(setAllUsers(res.data));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error);
    }
  };

  const fetchCurrentUserChats = async () => {
    let res = null;
    try {
      dispatch(showLoader());
      res = await getAllChats();
      dispatch(hideLoader());

      if (res.success) {
        dispatch(setAllChats(res.data));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error);
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      fetchUser();
      fetchAllUsers();
      fetchCurrentUserChats();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div>{children}</div>
    </>
  );
};
