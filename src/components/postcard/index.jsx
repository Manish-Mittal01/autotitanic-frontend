import React, { useState } from "react";
import { ReactComponent as HeartIcon } from "../../Assets/icons/heart.svg";
import { ReactComponent as ExpandIcon } from "../../Assets/icons/expand.svg";
import { ReactComponent as LinkIcon } from "../../Assets/icons/link.svg";
import { ReactComponent as CompareIcon } from "../../Assets/icons/compare.svg";
import { Modal, OverlayTrigger } from "react-bootstrap";
import MyTooltip from "../common/tooltip";

export default function PostCard({ post }) {
  const [showImageModel, setShowImageModel] = useState(null);

  const closeImageModel = () => {
    setShowImageModel(null);
  };

  const ActionContainer = () => {
    return (
      <div className="postActionContainer">
        <p className="actionWrapper">
          <OverlayTrigger overlay={MyTooltip("View")}>
            <LinkIcon style={{ width: 20, height: 20 }} />
          </OverlayTrigger>
        </p>
        <p className="actionWrapper">
          <OverlayTrigger overlay={MyTooltip("Wishlist")}>
            <HeartIcon />
          </OverlayTrigger>
        </p>
        <p className="actionWrapper" onClick={() => setShowImageModel(post?.media[0])}>
          <OverlayTrigger overlay={MyTooltip("Gallery")}>
            <ExpandIcon />
          </OverlayTrigger>
        </p>
        <p className="actionWrapper">
          <OverlayTrigger overlay={MyTooltip("Compare")}>
            <CompareIcon />
          </OverlayTrigger>
        </p>
      </div>
    );
  };

  const FullImageView = () => {
    return (
      <Modal className="imageModel" show={showImageModel} onHide={closeImageModel} size="xl">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="p-0">
          <img src={showImageModel} alt={""} style={{ width: "100%", height: "auto" }} />
        </Modal.Body>
      </Modal>
    );
  };

  // console.log("showImageModel", showImageModel);

  return (
    <div className="h-100 text-dark m-0 p-2">
      <div className="card-cstm bg-white h-10 top">
        <div className="img-wrp position-relative postImage">
          <img src={post?.media[0]} loading="lazy" alt="" className="img-fluid w-100" />
          <ActionContainer />
        </div>
        <div className="content">
          <p className="head fw-bold pb-1 mt-2 mb-0 font-middle">
            {post?.year} Reg | {post?.gearBox} | {post?.mileage} miles
          </p>
          <p className="m-0 text-danger fw-bold">{post?.make?.label + " " + post?.model?.label}</p>
          <button className="border rounded-pill my-1">Private</button>
          <div className="lctn-wrp postcradBackground text-white d-flex align-items-center justify-content-between p-2">
            <div className="d-flex align-items-center">
              <p className="m-0">{post?.currency}</p>
              <p className="m-0">{post?.price}</p>
            </div>
            <div className="d-flex align-items-center">
              <p className="m-0 me-1">{post?.country?.name} </p>
              <img src={post?.country?.flag} style={{ width: 20 }} />
            </div>
          </div>
        </div>
      </div>
      <FullImageView />
    </div>
  );
}
