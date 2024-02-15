import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { MdLocalOffer } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ReactComponent as CompareIcon } from "../../Assets/icons/compare.svg";
import { ReactComponent as Heartcon } from "../../Assets/icons/heart.svg";
import { ReactComponent as WhatsappIcon } from "../../Assets/icons/whatsapp.svg";
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
  const whatsappBoxref = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicleDetails, relatedVehicles } = useSelector((state) => state.vehicles);
  const { userProfile } = useSelector((state) => state.profile);
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
        await handleUserProfile();
        successMsg("Added to compare list");
        if (userProfile.data?.compareCount >= 5) {
          navigate("/CompareList");
        }
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
      filters: {
        type: detail?.type,
        country: detail?.country?._id,
        // minPrice: Math.ceil(detail?.price - detail?.price / 20),
        // maxPrice: Math.ceil(detail?.price + detail?.price / 20),
      },
      paginationDetails: {
        limit: 30,
        page: 1,
      },
    };
    await handleApiRequest(getRelatedVehicles, request);
  };

  useEffect(() => {
    if (id) {
      handleVehicleDetails();
    }
  }, [id]);

  useEffect(() => {
    if (detail) {
      handleRelatedVehicles();
    }
  }, [detail]);

  //   console.log("vehicleDetails", vehicleDetails);
  console.log("relatedVehicles", relatedVehicles);

  return (
    <>
      <section>
        <h6 className="mt-3 pointer" style={{ width: "fit-content" }} onClick={() => navigate(-1)}>
          <FaArrowLeftLong className="me-2" />
          Back to results
        </h6>
        <Row>
          <Col lg={8}>
            <div className="parentCrousel">
              <MediaCarousel media={detail?.media} isFeatured={detail?.isFeatured} />
            </div>
            <div className="inlineActionWrapper border-bottom my-4">
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
              <h5 className="darkColor">Vehicle Description</h5>
              <div
                dangerouslySetInnerHTML={{ __html: detail?.description }}
                className="border-bottom"
              ></div>
            </div>
          </Col>
          <Col lg={4}>
            <h6 className="my-2">{detail?.title}</h6>
            <p>{[detail?.make.label, detail?.model.label].join("  ")}</p>
            <div className="d-flex align-items-center text-danger gap-1">
              <h6 className="m-0 fw-bold">{detail?.currency} </h6>
              <h6 className="m-0 fw-bold"> {detail?.price?.toLocaleString()}</h6>
            </div>
            <div>
              {detail?.city?.name + ", " + detail?.country?.name}
              <img src={detail?.country?.flag} className="ms-1" style={{ width: 22 }} />
            </div>
            <div className="detailsWrapper mt-3">
              <h6 className="detailsHeading mainDarkColor mb-0 pb-1">
                <p> Key Vehicle Details</p>
              </h6>
              <div className="p-3">
                {detailsList.cars?.map((key) => (
                  <Row className="my-2">
                    <Col xs={5} className="darkColor small fw-bold">
                      {key.label}
                    </Col>
                    <Col xs={7} className="small primaryColor">
                      {typeof detail?.[key.value] !== "object"
                        ? parseCamelKey(detail?.[key.value]?.toString())
                        : parseCamelKey(detail?.[key.value]?.name || detail?.[key.value]?.label)}
                    </Col>
                  </Row>
                ))}
              </div>
            </div>
            <div className="detailsWrapper sellerDetailsWrapper mt-3">
              <h6 className="detailsHeading bg-danger text-white mb-0 pb-1">
                <p>Seller's Details</p>
              </h6>
              <div
                className="p-3"
                // style={{ backgroundColor: "#ff00001a" }}
              >
                {isUserLoggedin() ? (
                  sellerDetails.map((key, i) => {
                    const myKey =
                      key.label === "Seller's Name" &&
                      detail?.user?.[sellerDetails[i - 1]?.value] === "dealer"
                        ? "Business Name"
                        : key.label;

                    return (
                      detail?.user?.[key.value] && (
                        <Row className="my-2 align-items-center">
                          <Col xs={5} className="darkColor small fw-bold">
                            {myKey}
                          </Col>
                          <Col
                            xs={7}
                            className="small primaryColor"
                            style={{ wordWrap: "break-word" }}
                          >
                            {key.value === "whatsapp" ? (
                              <a
                                href={
                                  key.value === "whatsapp"
                                    ? `https://wa.me/${detail?.user?.[key.value]}`
                                    : `mailto:${detail?.user?.[key.value]}`
                                }
                                target="_blank"
                              >
                                <p
                                  className="whatsappSeller mainDarkColor m-0 rounded-pill small"
                                  ref={whatsappBoxref}
                                >
                                  {/* <FaWhatsapp className="whatsappContactIcon" /> */}
                                  <WhatsappIcon className="me-1" width={20} />
                                  Whatsapp Seller
                                </p>
                              </a>
                            ) : key.value === "email" ? (
                              <a href={`mailto:${detail?.user?.[key.value]}`} target="_blank">
                                <p
                                  className="whatsappSeller mainDarkColor m-0 rounded-pill small"
                                  style={{ minWidth: whatsappBoxref.current?.offsetWidth }}
                                >
                                  <MdOutlineEmail className="emailIcon me-1" />
                                  Email Seller
                                </p>
                              </a>
                            ) : (
                              parseKey(detail?.user?.[key.value])
                            )}
                          </Col>
                        </Row>
                      )
                    );
                  })
                ) : (
                  <div className="d-flex justify-content-center">
                    <p
                      className="blockSellerDetails pointer border-0 rounded-pill"
                      onClick={() => navigate("/login")}
                    >
                      Login to view Seller
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="detailsWrapper ActionWrapper mt-3">
              <h6 className="detailsHeading mainDarkColor mb-0 pb-1">
                <p>Interactive Options</p>
              </h6>
              <div className="p-3">
                <Row className="">
                  <Col xs={12} className="small" style={{ wordWrap: "break-word" }}>
                    <p
                      className="small pointer primaryColor m-0 p-2"
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
                    <p className="small pointer primaryColor m-0 p-2" onClick={handleAddToCompare}>
                      <CompareIcon className="redIcon" />
                      Add to Compare
                    </p>
                    <p
                      className="small pointer primaryColor m-0 p-2 "
                      onClick={handleAddToWishlist}
                    >
                      <Heartcon className="redIcon" />
                      Add to Wishlist
                    </p>
                    <p
                      className="small pointer primaryColor m-0 p-2"
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
            </div>
          </Col>
        </Row>

        {/* <ListCrousel dataList={relatedVehicles.data?.items || []} /> */}
      </section>

      {action?.type === "makeOffer" && <MakeOfferPop action={action} setAction={setAction} />}
      {action?.type === "sharePost" && <SharePop action={action} setAction={setAction} />}
    </>
  );
}
