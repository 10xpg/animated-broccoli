import { useDispatch, useSelector } from "react-redux";
import { formatCreatedAt, getUserFullname, getUserInitials } from "../../utils";
import { useEffect, useState } from "react";
import { uploadProfileImg } from "../../apis";
import toast from "react-hot-toast";
import { showLoader, hideLoader, setUser } from "../../redux";

export default function Profile() {
  const { user } = useSelector((state) => state.userReducer);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.profileImg) setImage(user?.profileImg);
  }, [user]);

  const onFileSelect = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setImage(reader.result);
    };
  };

  const updateProfileImg = async () => {
    try {
      const payload = {
        image,
      };

      dispatch(showLoader());
      const res = await uploadProfileImg(payload);
      dispatch(hideLoader());

      if (res.success) {
        toast.success(res.message);
        dispatch(setUser(res.data));
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
      dispatch(hideLoader());
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-pic-container">
        {image ? (
          <img
            src={image}
            alt="Profile Pic"
            className="user-profile-pic-upload"
          />
        ) : (
          <div className="user-default-profile-avatar">
            {getUserInitials(user)}
          </div>
        )}
      </div>

      <div className="profile-info-container">
        <div className="user-profile-name">
          <h1>{getUserFullname(user)}</h1>
        </div>
        <div>
          <b>Email: </b>
          {user?.email}
        </div>
        <div>
          <b>Account Created: </b>
          {formatCreatedAt(user?.createdAt)}
        </div>
        <div className="select-profile-pic-container">
          <input type="file" onChange={onFileSelect} />
          <button
            type="button"
            className="upload-image-btn"
            onClick={updateProfileImg}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
