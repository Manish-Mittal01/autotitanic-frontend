import React, { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import Select from "react-select";
import { Button, Col, Row } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { HiHandThumbUp } from "react-icons/hi2";
import { HiHandThumbDown } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import star1 from "../../Assets/Images/star-filled.jpeg";
import star2 from "../../Assets/Images/star-half.jpeg";
import star3 from "../../Assets/Images/star-empty.jpeg";
import { handleApiRequest } from "../../services/handleApiRequest";
import { addReply, getAllReply, getReviews, manageLikes } from "../../redux/vehicles/thunk";
import { MyTooltip } from "../myTooltip/myTooltip";
import { TiInfoLarge } from "react-icons/ti";
import { parseDate } from "../../utils/parseKey";
import ReviewPop from "../../pages/vehicleDetails/components/reviewPop";
import { successMsg } from "../../utils/toastMsg";
import { reviewMsg } from "../../utils/constants";

export default function ReviewDrawer({ userAction, setUserAction }) {
  const [reviews, setReviews] = useState({});
  const [showReplies, setShowReplies] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [action, setAction] = useState(null);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState([]);
  const [reviewFilter, setReviewFilter] = useState({
    value: "relevance",
    label: "Most Relevant",
    order: 1,
    key: "_id",
  });

  const closeDrawer = () => {
    setUserAction(null);
  };

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const handleReviewList = async () => {
    const request = {
      seller: userAction?.seller?._id,
      sortBy: reviewFilter.key || "",
      order: reviewFilter.order || "",
    };
    const response = await handleApiRequest(getReviews, request);

    if (response.status) {
      setReviews(response.data);
    }
  };

  const handleLike = async (reviewId, action) => {
    const request = {
      reviewId,
      action,
    };
    const response = await handleApiRequest(manageLikes, request);
    if (response.status) {
      handleReviewList();
      successMsg(`Response updated!!`);
    }
  };

  const handleReplyList = async (reviewId) => {
    const request = { reviewId };
    const response = await handleApiRequest(getAllReply, request);
    if (response.status) {
      setReplies(response.data?.items || []);
    }
  };

  const handleAddReply = async (reviewId) => {
    const request = {
      reviewId,
      reply,
    };
    const response = await handleApiRequest(addReply, request);
    if (response.status) {
      successMsg("Reply added!!");
      setReply("");
      handleReviewList();
      if (showReplies) {
        handleReplyList(showReplies);
      }
    }
  };

  useEffect(() => {
    handleReviewList();
  }, [reviewFilter]);

  return (
    <>
      <Drawer
        open={userAction}
        onClose={closeDrawer}
        direction="right"
        className="myDrawer overflow-auto px-3 py-2"
      >
        <span className="drawerCloseIcon pointer" onClick={closeDrawer}>
          <RxCross2 />
        </span>
        <div className="d-flex align-items-center mt-4">
          <p className="rating">{reviews.rating || 0}</p>
          <div className="ms-2" style={{ lineHeight: "15px" }}>
            <p className="m-0 fw-bold">{reviews?.ratingType}</p>
            <p className="extraSmall m-0">{reviews.totalCount || 0} Reviews</p>
          </div>
          <p className="m-0 text-primary ms-3 d-none d-lg-block">
            We aim for 100% real reviews
            <MyTooltip text={reviewMsg} placement="auto">
              <TiInfoLarge className="infoIcon mainDarkColor" />
            </MyTooltip>
          </p>
          <div style={{ flex: 1 }} />
          <Button
            variant=""
            className="outlineBtn"
            onClick={() => setAction({ type: "addReview", seller: userAction?.seller })}
          >
            Write a Review
          </Button>
        </div>

        <div className="mt-5">
          <Row>
            <Col lg={6} className="mb-0">
              <h5>All Reviews</h5>
            </Col>
            <Col lg={6} className="mb-0 d-flex justify-content-end align-items-center">
              <span className="me-2">Sort by</span>
              <Select
                styles={{
                  container: (prev) => ({ ...prev, width: 150 }),
                }}
                options={[
                  { value: "relevance", label: "Most Relevant", order: 1, key: "_id" },
                  { value: "newestFirst", label: "Newest first", order: -1, key: "createdAt" },
                  { value: "oldestFirst", label: "Oldest first", order: 1, key: "createdAt" },
                  { value: "positiveFirst", label: "Positive first", order: -1, key: "rating" },
                  { value: "negativeFirst", label: "Negative first", order: 1, key: "rating" },
                ]}
                value={reviewFilter}
                onChange={(selected) => setReviewFilter(selected)}
              />
            </Col>
          </Row>
          {reviews.items?.map((review, index) => (
            <div className="border-bottom my-3 py-3">
              <div key={index} className="d-flex align-items-center">
                {review.user?.userAvatar || review.user?.dealerLogo ? (
                  <img
                    src={review.user?.userAvatar || review.user?.dealerLogo}
                    style={{ width: 30, borderRadius: "50%" }}
                  />
                ) : (
                  <p className="rating rounded-circle m-0">{review.user?.name.charAt(0)}</p>
                )}

                <div className="ms-2" style={{ lineHeight: "15px" }}>
                  <p className="m-0">
                    {review.user?.name?.split(" ")[0]}{" "}
                    <span className="small">({parseDate(review.createdAts)})</span>
                  </p>
                  <p className="small m-0">
                    <img src={review?.user?.country?.flag} width={18} className="me-1" />
                    {review?.user?.country?.name}
                  </p>
                </div>
              </div>
              <p className="d-flex align-items-center mt-3 mb-1">
                <b>Rated:</b>
                <span className="ms-2">
                  {Array.from({ length: 5 }).map((_, index) =>
                    review.rating > index && review.rating < index + 1 ? (
                      <img src={star2} className="ratingStar" />
                    ) : review.rating < index ? (
                      <img src={star3} className="ratingStar" />
                    ) : (
                      <img src={star1} className="ratingStar" />
                    )
                  )}
                </span>
              </p>
              <p>
                <b>Review: </b>
                <span>{review.review}</span>
              </p>
              <div className="d-block d-sm-flex align-items-center justify-content-between">
                <div>
                  {review.repliesCount > 0 && (
                    <p className="pointer mb-0">
                      <span
                        className="loadReplyBtn pointer small p-1 mx-1"
                        onClick={() => {
                          setShowReplies(review._id);
                          handleReplyList(review._id);
                        }}
                      >
                        Load {review.repliesCount} replies
                      </span>
                    </p>
                  )}
                </div>
                <div
                  className="text-primary  d-block d-sm-flex align-items-center justify-content-between"
                  style={{ gap: 10 }}
                >
                  <p
                    className="pointer mb-0"
                    onClick={() => {
                      setReply("");
                      setShowReplyBox(index);
                    }}
                  >
                    <LuMessagesSquare style={{ fill: "#0d6efd" }} />
                    <span className="mx-1">Reply</span>
                  </p>
                  <p className="pointer mb-0" onClick={(e) => handleLike(review._id, "like")}>
                    <HiHandThumbUp />
                    <span className="mx-1">Helpful ({review.likesCount})</span>
                  </p>
                  <p className="pointer mb-0" onClick={(e) => handleLike(review._id, "dislike")}>
                    <HiHandThumbDown />
                    <span className="mx-1">Not Helpful ({review.dislikesCount})</span>
                  </p>
                </div>
              </div>
              <div>
                {showReplyBox === index && (
                  <div className="mx-5 my-4">
                    <textarea
                      className="w-100 border rounded "
                      placeholder="Add a reply"
                      maxLength={120}
                      value={reply}
                      onChange={handleChange}
                    />
                    <div className="d-flex justify-content-end">
                      <Button variant="danger" onClick={() => handleAddReply(review._id)}>
                        Submit
                      </Button>
                    </div>
                  </div>
                )}

                {showReplies === review._id && (
                  <>
                    {replies?.map((reply, index) => (
                      <div className="border-bottom my-3 mx-5 py-3">
                        <div key={index} className="d-flex align-items-center">
                          <p className="rating rounded-circle m-0">M</p>
                          <div className="ms-2" style={{ lineHeight: "15px" }}>
                            <p className="m-0">
                              {reply.user?.name?.split(" ")[0]}{" "}
                              <span className="small">({parseDate(reply.createdAt)})</span>
                            </p>
                            <p className="small m-0">
                              <img src={reply.user?.country?.flag} width={18} className="me-1" />
                              {reply.user?.country?.name}
                            </p>
                          </div>
                        </div>
                        <p className="my-2">
                          <b>Reply: </b>
                          <span>{reply.reply}</span>
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Drawer>

      {action?.type === "addReview" && (
        <ReviewPop action={action} setAction={setAction} setReviews={setReviews} />
      )}
    </>
  );
}
