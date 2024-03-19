import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getReviews, submitReview } from "../../../redux/vehicles/thunk";
import { successMsg } from "../../../utils/toastMsg";

export default function ReviewPop({ action, setAction, setReviews }) {
  const [reviewDetails, setReviewDetails] = useState({ rating: 1, review: "" });
  const [error, setError] = useState("");

  const handleClosePop = () => {
    setAction(null);
  };

  const handleChange = (e) => {
    setReviewDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReviewList = async () => {
    const response = await handleApiRequest(getReviews, { seller: action?.seller?._id });

    if (response.status) {
      setReviews(response.data);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewDetails.review) {
      return setError("*Enter Review");
    } else {
      setError("");
    }

    const request = {
      ...reviewDetails,
      seller: action?.seller?._id,
    };

    const response = await handleApiRequest(submitReview, request);
    if (response.status) {
      successMsg("Review added for seller");
      handleClosePop();
      handleReviewList();
    }
  };

  return (
    <>
      <Modal
        show={!!action}
        onHide={handleClosePop}
        backdrop="static"
        keyboard={false}
        centered
        size="md"
        className="delete-pop"
      >
        <Modal.Header closeButton>
          Write about&nbsp;<b>{action?.seller?.name}</b>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <div>
              {Array.from({ length: 5 }).map((_, i) =>
                reviewDetails.rating <= i ? (
                  <FaRegStar
                    className="m-1 h5"
                    onClick={() => setReviewDetails((prev) => ({ ...prev, rating: i + 1 }))}
                  />
                ) : (
                  <FaStar
                    className="m-1 h5"
                    onClick={() => setReviewDetails((prev) => ({ ...prev, rating: i + 1 }))}
                  />
                )
              )}
            </div>
            <div className="input-group my-3">
              <textarea
                rows={3}
                className="form-control"
                id="inlineFormInputGroup"
                placeholder="Write a Review"
                name="review"
                value={reviewDetails.review}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <p className="small text-danger">{error}</p>}
          <Button variant="danger w-100" onClick={handleSubmitReview}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
