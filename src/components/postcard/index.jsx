import React, { useRef } from "react";
import { ReactComponent as HeartIcon } from "../../Assets/icons/heart.svg";
import { ReactComponent as ExpandIcon } from "../../Assets/icons/expand.svg";
import { ReactComponent as LinkIcon } from "../../Assets/icons/link.svg";
import { ReactComponent as CompareIcon } from "../../Assets/icons/compare.svg";
import { FaStar } from "react-icons/fa";
import { OverlayTrigger } from "react-bootstrap";
import MyTooltip from "../common/tooltip";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleApiRequest } from "../../services/handleApiRequest";
import { addToCompare, addToWishlist } from "../../redux/vehicles/thunk";
import { successMsg } from "../../utils/toastMsg";
import { getUserProfile } from "../../redux/profile/thunk";
import { manageGallery } from "../../redux/common/slice";
import parseKey from "../../utils/parseKey";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postImageRef = useRef();

  const showGallery = (e, media) => {
    e.stopPropagation();
    dispatch(manageGallery(media));
  };

  const handleUserProfile = async () => {
    await handleApiRequest(getUserProfile);
  };

  const handleAddToCompare = async (e) => {
    e.stopPropagation();

    const response = await handleApiRequest(addToCompare, { vehicle: post._id });
    if (response.status) {
      successMsg("Added to compare list");
      handleUserProfile();
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation();

    const response = await handleApiRequest(addToWishlist, { id: post._id });
    if (response.status) {
      successMsg("Added to wishlist");
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
        <p className="actionWrapper" onClick={handleWishlist}>
          <OverlayTrigger overlay={MyTooltip("Wishlist")}>
            <HeartIcon />
          </OverlayTrigger>
        </p>
        <p className="actionWrapper" onClick={(e) => showGallery(e, post?.media)}>
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

  return (
    <div
      className="postcardWrapper pointer position-relative mx-auto"
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
            />
            <ActionContainer />
          </div>
          <div className="content">
            <p className="head postCardDetails pb-1 mt-2 mb-0 font-middle">
              {parseKey(post?.year)} Reg | {parseKey(post?.gearBox)} | {parseKey(post?.mileage)}{" "}
              Miles
            </p>
            <p className="m-0 text-danger fw-bold postCardMake">
              {post?.make?.label + " " + post?.model?.label}
            </p>
            <button className="border rounded-pill my-1">Private</button>
            <div className=" postcardFooter text-white d-flex align-items-center justify-content-between p-2">
              <div className="d-flex align-items-center me-3 gap-1">
                <p className="m-0">{post?.currency}</p>
                <p className="m-0"> {post?.price?.toLocaleString()}</p>
              </div>
              <div className="d-flex align-items-center overflow-hidden">
                <p className="postcardCountryName m-0 me-1">{post?.country?.name} </p>
                <img src={post?.country?.flag} style={{ width: 20 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {post.isFeatured && <FaStar className="starIcon" />}
    </div>
  );
}
