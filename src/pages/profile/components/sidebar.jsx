import React, { useEffect, useState } from "react";
import myImage from "../../../Assets/Images/user.jpg";
import { parseCamelKey } from "../../../utils/parseKey";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/auth/slice";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ user }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
      onClick: () => {},
    },
    {
      label: "Settings",
      path: "/settings",
      onClick: () => {},
    },
    {
      label: "Logout",
      path: "logout",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("my-items");

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (pathname === "/profile") setActiveTab("/my-items");
    else setActiveTab(pathname);
  }, [pathname]);

  return (
    <>
      <div className="border rounded pb-3">
        <ul className="list-unstyled">
          <li className={`d-flex justify-content-between px-3 py-2 border-top `}>
            <div className="text-center">
              <img
                src={user?.data?.userAvatar || user?.data?.dealerLogo || myImage}
                className="userProfileImage"
              />
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
