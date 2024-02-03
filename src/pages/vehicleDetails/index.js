import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { MdLocalOffer } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { ReactComponent as CompareIcon } from "../../Assets/icons/compare.svg";
import { ReactComponent as Heartcon } from "../../Assets/icons/heart.svg";
import { handleApiRequest } from "../../services/handleApiRequest";
import {
  addToCompare,
  addToWishlist,
  getRelatedVehicles,
  getVehicleDetails,
} from "../../redux/vehicles/thunk";
import parseKey, { parseCamelKey } from "../../utils/parseKey";
import MediaCarousel from "./components/mediaCrousel";
import SharePop from "./components/sharePop";
import { successMsg } from "../../utils/toastMsg";
import { getUserProfile } from "../../redux/profile/thunk";
import MakeOfferPop from "./components/makeOfferPop";
import isUserLoggedin from "../../utils/isUserLoggedin";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicleDetails, relatedVehicles } = useSelector((state) => state.vehicles);
  const detail = vehicleDetails.data;
  const [action, setAction] = useState(null);

  const handleVehicleDetails = async () => {
    await handleApiRequest(getVehicleDetails, id);
  };

  const handleUserProfile = async () => {
    await handleApiRequest(getUserProfile);
  };

  const handleAddToCompare = async () => {
    if (isUserLoggedin()) {
      const response = await handleApiRequest(addToCompare, { vehicle: id });
      if (response.status) {
        successMsg("Added to compare list");
        handleUserProfile();
      }
    } else {
      navigate("/login");
    }
  };

  const handleAddToWishlist = async () => {
    if (isUserLoggedin()) {
      const response = await handleApiRequest(addToWishlist, { id });
      if (response.status) {
        successMsg("Added to wishlist");
      }
    } else {
      navigate("/login");
    }
  };

  const handleRelatedVehicles = async () => {
    const request = {
      type: detail?.type,
      country: detail?.country?._id,
      minPrice: detail?.price - detail?.price / 20,
      maxPrice: detail?.price + detail?.price / 20,
    };
    await handleApiRequest(getRelatedVehicles, request);
  };

  useEffect(() => {
    handleVehicleDetails();
  }, [id]);

  // useEffect(()=>{
  //   if (detail) {
  //     handleRelatedVehicles();
  //   }
  // }, [detail, id])

  //   console.log("vehicleDetails", vehicleDetails);

  return (
    <>
      <section className="mt-3">
        <Row>
          <Col lg={8}>
            <div className="parentCrousel">
              <MediaCarousel media={detail?.media} />
            </div>
            <div className="d-flex align-items-center my-2 border-bottom my-4">
              <p
                className="small pointer text-center m-0 p-2"
                onClick={() => {
                  if (isUserLoggedin()) {
                    setAction({ type: "makeOffer", currency: detail?.currency });
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <MdLocalOffer className="text-danger mx-1" />
                Make an Offer
              </p>
              <p className="small pointer text-center m-0 p-2" onClick={handleAddToCompare}>
                <CompareIcon className="redIcon" />
                Add to Compare
              </p>
              <p className="small pointer text-center m-0 p-2 mx-2" onClick={handleAddToWishlist}>
                <Heartcon className="redIcon" />
                Add to Wishlist
              </p>
              <p
                className="whatsappMsgBtn small pointer rounded-pill text-center m-0 p-1 mx-2"
                onClick={() => {}}
              >
                <FaWhatsapp className="text-success mx-1" />
                Whatsapp Seller
              </p>
            </div>
            {/* <div className="d-flex justify-content-between my-2 border-bottom my-4">
              <p
                className="small pointer text-center m-0 p-2"
                onClick={() => {
                  setAction({ type: "sharePost" });
                }}
              >
                Share
                <IoMdShare
                  className="mx-1 text-danger"
                  onClick={() => {
                    setAction({ type: "sharePost" });
                  }}
                />
              </p>
            </div> */}
            <div>
              <h5>Vehicle Description</h5>
              <div
                dangerouslySetInnerHTML={{ __html: detail?.description }}
                className="border-bottom"
              ></div>
            </div>
          </Col>
          <Col lg={4}>
            {/* <h4>{[detail?.make.label, detail?.model.label].join(" ")}</h4> */}
            <h5 className="my-2">{detail?.title}</h5>
            <p>{[detail?.year, detail?.make.label, detail?.model.label].join("  ")}</p>
            <p className="d-flex align-items-center justify-content-between">
              <div>
                {detail?.city?.name + ", " + detail?.country?.name}
                <img src={detail?.country.flag} className="ms-1" style={{ width: 22 }} />
              </div>
              <div className="d-flex align-items-center text-danger">
                <p className="m-0">{detail?.currency}</p>
                <p className="m-0">{detail?.price}</p>
              </div>
            </p>
            <div className="detailsWrapper p-3">
              <h6 className="detailsHeading">Key Features</h6>
              {Object.keys(detail || {}).map(
                (key) =>
                  key !== "_id" &&
                  key !== "createdAt" &&
                  key !== "media" &&
                  key !== "reviews" &&
                  key !== "country" &&
                  key !== "city" &&
                  key !== "description" &&
                  key !== "price" &&
                  key !== "currency" &&
                  key !== "isFeatured" &&
                  key !== "status" &&
                  key !== "sellOrRent" &&
                  key !== "type" &&
                  key !== "user" &&
                  key !== "title" &&
                  key !== "updatedAt" && (
                    <Row className="my-2">
                      <Col xs={5} className="small">
                        {parseCamelKey(key)}
                      </Col>
                      <Col xs={7} className="small">
                        {typeof detail[key] !== "object"
                          ? parseCamelKey(detail[key]?.toString())
                          : parseCamelKey(detail[key]?.name || detail[key]?.label)}
                      </Col>
                    </Row>
                  )
              )}
            </div>
            <div className="detailsWrapper p-3 mt-3">
              <h6 className="detailsHeading">Seller Details</h6>
              {["name", "mobile", "email"].map((key) => (
                <Row className="my-2">
                  <Col xs={5} className="small">
                    {parseCamelKey(key)}
                  </Col>
                  <Col xs={7} className="small" style={{ wordWrap: "break-word" }}>
                    {detail?.user?.[key]}
                  </Col>
                </Row>
              ))}
              <Row className="my-2">
                <Col xs={5} className="small">
                  Seller
                </Col>
                <Col xs={7} className="small">
                  {parseKey(detail?.user?.userType)}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </section>

      {action?.type === "makeOffer" && <MakeOfferPop action={action} setAction={setAction} />}
    </>
  );
}
