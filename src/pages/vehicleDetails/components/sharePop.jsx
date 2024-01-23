import React from "react";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

export default function SharePop({ action, setAction }) {
  const postUrl = window.location.href;

  const handleClosePop = () => {
    setAction(null);
  };

  // console.log("postUrl", `${postUrl} abc`);

  return (
    <>
      <Modal
        show={!!action}
        onHide={handleClosePop}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
        className="delete-pop"
      >
        <Modal.Header closeButton>Share This Post</Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <FacebookShareButton
              url={postUrl}
              //   quote={"Dummy text!"}
              //   hashtag="#muo"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={postUrl}
              //   quote={"Dummy text!"}
              //   hashtag="#muo"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton
              url={postUrl}
              //   quote={"Dummy text!"}
              //   hashtag="#muo"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <PinterestShareButton
              url={postUrl}
              //   quote={"Dummy text!"}
              //   hashtag="#muo"
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
            <WhatsappShareButton
              url={postUrl}
              //  quote={"Dummy text!"} hashtag="#muo"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={postUrl}
              //  quote={"Dummy text!"} hashtag="#muo"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
