import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { MdLocalOffer } from "react-icons/md";
import { FaWhatsapp, FaStar } from "react-icons/fa";
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
import { detailsList, sellerDetails } from "../../utils/filters";

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
              <MediaCarousel media={detail?.media} isFeatured={detail?.isFeatured} />
            </div>
            <div className="inlineActionWrapper d-flex align-items-center justify-content-between my-2 border-bottom my-4">
              <div className="d-flex align-items-center">
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
              </div>
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
            </div>
            <div className="my-4">
              <h5>Vehicle Description</h5>
              <div
                dangerouslySetInnerHTML={{ __html: detail?.description }}
                className="border-bottom"
              ></div>
            </div>
          </Col>
          <Col lg={4}>
            <h5 className="my-2">{detail?.title}</h5>
            <p>{[detail?.year, detail?.make.label, detail?.model.label].join("  ")}</p>
            <p className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center text-danger gap-1">
                <h6 className="m-0 fw-bold">{detail?.currency} </h6>
                <h6 className="m-0 fw-bold"> {detail?.price?.toLocaleString()}</h6>
              </div>
              <div>
                {detail?.city?.name + ", " + detail?.country?.name}
                <img src={detail?.country?.flag} className="ms-1" style={{ width: 22 }} />
              </div>
            </p>
            <div className="detailsWrapper p-3">
              <h6 className="detailsHeading"> Key Vehicle Details</h6>
              {detailsList.cars?.map((key) => (
                <Row className="my-2">
                  <Col xs={5} className="small">
                    {key.label}
                  </Col>
                  <Col xs={7} className="small">
                    {typeof detail?.[key.value] !== "object"
                      ? parseCamelKey(detail?.[key.value]?.toString())
                      : parseCamelKey(detail?.[key.value]?.name || detail?.[key.value]?.label)}
                  </Col>
                </Row>
              ))}
            </div>
            <div className="detailsWrapper sellerDetailsWrapper p-3 mt-3">
              <h6 className="detailsHeading">Seller's Details</h6>
              {sellerDetails.map(
                (key) =>
                  detail?.user?.[key.value] && (
                    <Row className="my-2">
                      <Col xs={5} className="small">
                        {key.label}
                      </Col>
                      <Col xs={7} className="small" style={{ wordWrap: "break-word" }}>
                        {key.value === "whatsapp" || key.value === "email" ? (
                          <a
                            href={
                              key.value === "whatsapp"
                                ? `https://wa.me/${detail?.user?.[key.value]}`
                                : `mailto:${detail?.user?.[key.value]}`
                            }
                            target="_blank"
                          >
                            {parseKey(detail?.user?.[key.value])}
                          </a>
                        ) : (
                          parseKey(detail?.user?.[key.value])
                        )}
                      </Col>
                    </Row>
                  )
              )}
            </div>
            <div className="detailsWrapper ActionWrapper p-3 mt-3">
              <h6 className="detailsHeading">Interactive Options</h6>
              <Row className="my-2">
                <Col xs={12} className="small" style={{ wordWrap: "break-word" }}>
                  <p
                    className="small pointer m-0 p-2"
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
                  <p className="small pointer m-0 p-2" onClick={handleAddToCompare}>
                    <CompareIcon className="redIcon" />
                    Add to Compare
                  </p>
                  <p className="small pointer m-0 p-2 " onClick={handleAddToWishlist}>
                    <Heartcon className="redIcon" />
                    Add to Wishlist
                  </p>
                  <p
                    className="small pointer m-0 p-2"
                    onClick={() => {
                      setAction({ type: "sharePost" });
                    }}
                  >
                    <IoMdShare
                      className="mx-1 text-danger"
                      onClick={() => {
                        setAction({ type: "sharePost" });
                      }}
                    />
                    Share
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </section>

      {action?.type === "makeOffer" && <MakeOfferPop action={action} setAction={setAction} />}
      {action?.type === "sharePost" && <SharePop action={action} setAction={setAction} />}
    </>
  );
}
