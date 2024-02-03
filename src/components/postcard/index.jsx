import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as HeartIcon } from "../../Assets/icons/heart.svg";
import { ReactComponent as ExpandIcon } from "../../Assets/icons/expand.svg";
import { ReactComponent as LinkIcon } from "../../Assets/icons/link.svg";
import { ReactComponent as CompareIcon } from "../../Assets/icons/compare.svg";
import { OverlayTrigger } from "react-bootstrap";
import MyTooltip from "../common/tooltip";
import Gallery from "./components/gallery";
import { useDispatch } from "react-redux";
import { mediaGallery } from "../../redux/vehicles/slice";
import { useNavigate } from "react-router-dom";
import { handleApiRequest } from "../../services/handleApiRequest";
import { addToCompare } from "../../redux/vehicles/thunk";
import { successMsg } from "../../utils/toastMsg";
import { getUserProfile } from "../../redux/profile/thunk";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postImageRef = useRef();
  const [postImageHeight, setPostImageHeight] = useState(0);

  const showGallery = (media) => {
    dispatch(mediaGallery(media));
  };

  const handleUserProfile = async () => {
    await handleApiRequest(getUserProfile);
  };

  const handleAddToCompare = async () => {
    const response = await handleApiRequest(addToCompare, { vehicle: post._id });
    if (response.status) {
      successMsg("Added to compare list");
      handleUserProfile();
    }
  };

  const ActionContainer = () => {
    return (
      <div className="postActionContainer">
        <p className="actionWrapper" onClick={() => navigate(`/details/${post._id}`)}>
          <OverlayTrigger overlay={MyTooltip("View")}>
            <LinkIcon fontWeight={500} style={{ width: 20, height: 20 }} />
          </OverlayTrigger>
        </p>
        <p className="actionWrapper">
          <OverlayTrigger overlay={MyTooltip("Wishlist")}>
            <HeartIcon />
          </OverlayTrigger>
        </p>
        <p className="actionWrapper" onClick={() => showGallery(post?.media)}>
          <OverlayTrigger overlay={MyTooltip("Gallery")}>
            <ExpandIcon />
          </OverlayTrigger>
        </p>
        <p className="actionWrapper" onClick={handleAddToCompare}>
          <OverlayTrigger overlay={MyTooltip("Compare")}>
            <CompareIcon fontSize={19} fontWeight={500} />
          </OverlayTrigger>
        </p>
      </div>
    );
  };

  // useEffect(() => {
  //   if (postImageRef.current) {
  //     setPostImageHeight(postImageRef.current.offsetWidth);
  //   }
  // }, [postImageRef.current?.offsetWidth]);

  // console.log("showImageModel", showImageModel);

  return (
    <div
      className="pointer"
      style={{ position: "relative" }}
      onClick={() => navigate(`/details/${post._id}`)}
    >
      <div className="h-100 text-dark m-0 p-2">
        <div className="card-cstm bg-white h-10 top">
          <div className="img-wrp position-relative postImage">
            <img
              ref={postImageRef}
              src={post?.media[0].url}
              loading="lazy"
              alt=""
              className="postCardImage img-fluid w-100 "
              style={{
                // height: postImageHeight,
                minHeight: 200,
              }}
            />
            <ActionContainer />
          </div>
          <div className="content">
            <p className="head postCardDetails fw-bold pb-1 mt-2 mb-0 font-middle">
              {post?.year} Reg | {post?.gearBox} | {post?.mileage} miles
            </p>
            <p className="m-0 text-danger fw-bold">
              {post?.make?.label + " " + post?.model?.label}
            </p>
            <button className="border rounded-pill my-1">Private</button>
            <div className="lctn-wrp postcradBackground text-white d-flex align-items-center justify-content-between p-2">
              <div className="d-flex align-items-center">
                <p className="m-0">{post?.currency}</p>
                <p className="m-0"> {post?.price}</p>
              </div>
              <div className="d-flex align-items-center">
                <p className="m-0 me-1">{post?.country?.name} </p>
                <img src={post?.country?.flag} style={{ width: 20 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
