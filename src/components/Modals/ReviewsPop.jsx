import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import Select from "react-select";
import { Button, Col, Row } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import { BsInfoLg } from "react-icons/bs";
import { HiHandThumbUp } from "react-icons/hi2";
import { HiHandThumbDown } from "react-icons/hi2";
import { LuMessagesSquare } from "react-icons/lu";
import star1 from "../../Assets/Images/star-filled.jpeg";
import star2 from "../../Assets/Images/star-half.jpeg";
import star3 from "../../Assets/Images/star-empty.jpeg";

export default function ReviewDrawer({ userAction, setUserAction }) {
  const [rating, setRating] = useState("3.8");
  const [showReplies, setShowReplies] = useState(null);
  const [addReply, setAddReply] = useState(null);
  const [likesCount, setLikesCount] = useState({ likes: 10, disLikes: 14 });

  const closeDrawer = () => {
    setUserAction(null);
  };

  return (
    <>
      <Drawer
        open={userAction}
        onClose={closeDrawer}
        direction="right"
        className="myDrawer overflow-auto px-3 py-2"
        style={{ marginTop: 60 }}
      >
        <span className="drawerCloseIcon pointer" onClick={closeDrawer}>
          <RxCross2 />
        </span>
        <div className="d-flex align-items-center mt-4">
          <p className="rating">8</p>
          <div className="ms-2" style={{ lineHeight: "15px" }}>
            <p className="m-0 fw-bold">Good</p>
            <p className="extraSmall m-0">256 Reviews</p>
          </div>
          <p className="m-0 text-primary ms-3 d-none d-lg-block">
            We aim for 100% real reviews
            <BsInfoLg />
          </p>
          <div style={{ flex: 1 }} />
          <Button variant="" className="outlineBtn">
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
                options={[
                  { value: "_id", label: "Most Relevant", order: 1 },
                  { value: "createdAt", label: "Newest first", order: 1 },
                  { value: "createdAt", label: "oldest first", order: -1 },
                  { value: "rating", label: "Positive first", order: 1 },
                  { value: "rating", label: "Negative first", order: -1 },
                ]}
                styles={{
                  container: (prev) => ({ ...prev, width: 150 }),
                }}
              />
            </Col>
          </Row>
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="border-bottom my-3 py-3">
              <div key={index} className="d-flex align-items-center">
                <p className="rating rounded-circle m-0">M</p>
                <div className="ms-2" style={{ lineHeight: "15px" }}>
                  <p className="m-0">
                    Manish <span className="small">(10 Feb. 2024)</span>
                  </p>
                  <p className="small m-0">
                    {/* <img src={indiaFlag} width={18} className="me-1" /> */}
                    India
                  </p>
                </div>
              </div>
              <p className="d-flex align-items-center mt-3 mb-1">
                <b>Rated:</b>
                <span className="ms-2">
                  {Array.from({ length: 5 }).map((_, index) =>
                    rating > index && rating < index + 1 ? (
                      <img src={star2} className="ratingStar" />
                    ) : rating < index ? (
                      <img src={star3} className="ratingStar" />
                    ) : (
                      <img src={star1} className="ratingStar" />
                    )
                  )}
                </span>
              </p>
              <p>
                <b>Review: </b>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions of Lorem
                  Ipsum.
                </span>
              </p>
              <div className="d-block d-sm-flex align-items-center justify-content-between">
                <div>
                  <p className="pointer mb-0">
                    {/* <LuMessagesSquare style={{ fill: "#0d6efd" }} /> */}
                    <span
                      className="loadReplyBtn pointer small p-1 mx-1"
                      onClick={() => {
                        setShowReplies(index);
                      }}
                    >
                      Load 41 replies
                    </span>
                  </p>
                </div>
                <div
                  className="text-primary  d-block d-sm-flex align-items-center justify-content-between"
                  style={{ gap: 10 }}
                >
                  <p className="pointer mb-0" onClick={() => setAddReply(index)}>
                    <LuMessagesSquare style={{ fill: "#0d6efd" }} />
                    <span className="mx-1">Reply</span>
                  </p>
                  <p className="pointer mb-0">
                    <HiHandThumbUp />
                    <span className="mx-1">Helpful ({likesCount.likes})</span>
                  </p>
                  <p className="pointer mb-0">
                    <HiHandThumbDown />
                    <span className="mx-1">Not Helpful ({likesCount.disLikes})</span>
                  </p>
                </div>
              </div>
              <div>
                {addReply === index && (
                  <div className="mx-5 my-4">
                    <textarea
                      className="w-100 border rounded "
                      placeholder="Add a reply"
                      maxLength={200}
                    />
                    <div className="d-flex justify-content-end">
                      <Button>Submit</Button>
                    </div>
                  </div>
                )}

                {showReplies === index && (
                  <>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div className="border-bottom my-3 mx-5 py-3">
                        <div key={index} className="d-flex align-items-center">
                          <p className="rating rounded-circle m-0">M</p>
                          <div className="ms-2" style={{ lineHeight: "15px" }}>
                            <p className="m-0">
                              Manish <span className="small">(10 Feb. 2024)</span>
                            </p>
                            <p className="small m-0">
                              {/* <img src={indiaFlag} width={18} className="me-1" /> */}
                              India
                            </p>
                          </div>
                        </div>
                        <p className="my-2">
                          <b>Reply: </b>
                          <span>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s.
                          </span>
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
    </>
  );
}
