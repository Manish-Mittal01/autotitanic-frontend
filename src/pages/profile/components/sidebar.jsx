import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import myImage from "../../../Assets/Images/user.jpg";
import { ReactComponent as EditIcon } from "../../../Assets/icons/edit.svg";
import { parseCamelKey } from "../../../utils/parseKey";
import { logoutUser } from "../../../redux/auth/slice";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getUserProfile, updateProfile } from "../../../redux/profile/thunk";
import { errorMsg } from "../../../utils/toastMsg";
import { uploadFile } from "../../../redux/common/thunk";

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userProfile: user } = useSelector((state) => state.profile);

  const [activeTab, setActiveTab] = useState("/profile");

  const sidetabList = [
    {
      label: "My Items",
      path: "/my-items",
      onClick: () => {
        navigate("/my-items");
      },
    },
    {
      label: "My Wishlist",
      path: "/my-wishlist",
      onClick: () => {
        navigate("/my-wishlist");
      },
    },
    {
      label: "Profile",
      path: "/profile",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      label: "Change Password",
      path: "/change-password",
      onClick: () => {
        navigate("/change-password");
      },
    },
    {
      label: "Logout",
      path: "logout",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleUserProfile = async () => {
    await handleApiRequest(getUserProfile);
  };

  const handleUpdateProfileImage = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    const fileType = image.type.split("/").pop();
    const acceptedFileType = ["png", "jpg", "jpeg", "webm"];
    if (!acceptedFileType.includes(fileType)) {
      return errorMsg("Use jpg, png, webm file only");
    }

    const formData = new FormData();
    formData.append("images", image);
    const response = await handleApiRequest(uploadFile, formData);
    if (response.status) {
      let userImage = response.data[0]?.url;

      const profileUpdateresponse = await handleApiRequest(updateProfile, {
        image: userImage,
        _id: user.data._id,
      });

      if (profileUpdateresponse.status) {
        handleUserProfile();
      }
    }
  };

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  return (
    <>
      <div className="border rounded pb-3">
        <ul className="list-unstyled">
          <li className={`d-flex justify-content-between px-3 py-2 border-top `}>
            <div className="text-center" style={{ width: "100%" }}>
              <div className="position-relative mx-auto" style={{ width: "fit-content" }}>
                <img
                  src={user?.data?.userAvatar || user?.data?.dealerLogo || myImage}
                  className="userProfileImage"
                />
                <label htmlFor="selectpostImage" className="editProfileImageIcon">
                  <LuPencil />
                </label>
                <input
                  id="selectpostImage"
                  type="file"
                  accept=".png, .jpg, .jpeg, .webm"
                  className="d-none"
                  onChange={(e) => {
                    handleUpdateProfileImage(e);
                  }}
                />
              </div>
              <b className="m-0 d-block">{user?.data?.name}</b>
              <p className="m-0 text-danger">{parseCamelKey(user?.data?.userType)}</p>
              <p className="text-break">{user?.data?.email}</p>
            </div>
          </li>
          {sidetabList.map((tab) => (
            <li
              className={`pointer d-flex justify-content-between px-3 py-2 border-top `}
              onClick={() => {
                tab.onClick();
                setActiveTab(tab.label);
              }}
            >
              <span className={`pointer ${activeTab === tab.path && "text-danger"}`}>
                {tab.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="fullSizeAddContainer d-none d-lg-flex" style={{ width: 200, height: 200 }}>
        Add Container
        <br />
        (200 x 200)
      </div>
      <div className="fullSizeAddContainer d-none d-lg-flex" style={{ width: 200, height: 200 }}>
        Add Container
        <br />
        (200 x 200)
      </div> */}
    </>
  );
}
