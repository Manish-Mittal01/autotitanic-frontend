import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaRegStar } from "react-icons/fa";
import { TiInfoLarge } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getReviews } from "../../../redux/vehicles/thunk";
import { MyTooltip } from "../../../components/myTooltip/myTooltip";

export default function ReviewList({ action, setAction }) {
  const [reviewList, setReviewList] = useState([]);

  const handleClosePop = () => {
    setAction(null);
  };

  const handleChange = (e) => {
    setReviewList((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReviewsList = async () => {
    const request = {
      seller: action?.seller?._id,
    };
    const response = await handleApiRequest(getReviews, request);
    if (response.status) {
      setReviewList(response.data || []);
    }
  };

  useEffect(() => {
    handleReviewsList();
  }, []);

  console.log("reviewList", reviewList);

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
          Read about&nbsp;<b>{action?.seller?.name}</b>
          <MyTooltip
            text="Reviews are not verified by AutoTitanic however we check and will review fake reviews when it is spotted"
            placement="bottom"
          >
            <TiInfoLarge className="infoIcon mainDarkColor" />
          </MyTooltip>
        </Modal.Header>
        <Modal.Body>
          {reviewList?.map((review) => (
            <div className="border rounded p-2 my-2">
              <p className="fw-bold">{review?.user?.name}</p>
              <div>
                {Array.from({ length: 5 }).map((_, i) =>
                  review?.rating <= i ? (
                    <FaRegStar className="m-1 h5" />
                  ) : (
                    <FaStar className="m-1 h5" />
                  )
                )}
              </div>
              <p>{review?.review}</p>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
