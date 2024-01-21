import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { MdLocalOffer, MdEmail } from "react-icons/md";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { ReactComponent as CompareIcon } from "../../Assets/icons/compare.svg";
import { ReactComponent as Heartcon } from "../../Assets/icons/heart.svg";
import { handleApiRequest } from "../../services/handleApiRequest";
import { addToCompare, addToWishlist, getVehicleDetails } from "../../redux/vehicles/thunk";
import { parseCamelKey } from "../../utils/parseKey";
import MediaCarousel from "./components/mediaCrousel";
import SharePop from "./components/sharePop";
import { successMsg } from "../../utils/toastMsg";
import { getUserProfile } from "../../redux/profile/thunk";

export default function VehicleDetails() {
  const { id } = useParams();
  const { vehicleDetails } = useSelector((state) => state.vehicles);
  const detail = vehicleDetails.data;
  const [action, setAction] = useState(null);

  const handleVehicleDetails = async () => {
    await handleApiRequest(getVehicleDetails, id);
  };

  const handleUserProfile = async () => {
    await handleApiRequest(getUserProfile);
  };

  const handleAddToCompare = async () => {
    const response = await handleApiRequest(addToCompare, { vehicle: id });
    if (response.status) {
      successMsg("Added to compare list");
      handleUserProfile();
    }
  };

  const handleAddToWishlist = async () => {
    const response = await handleApiRequest(addToWishlist, { id });
    if (response.status) {
      successMsg("Added to wishlist");
    }
  };

  useEffect(() => {
    handleVehicleDetails();
  }, [id]);

  //   console.log("vehicleDetails", vehicleDetails);

  return (
    <>
      <section className="mt-3">
        <Row>
          <Col lg={8}>
            <div className="parentCrousel">
              <MediaCarousel media={detail?.media} />
            </div>
            <div className="d-flex justify-content-start my-2">
              <button className="vehicleActionBtn small border p-2">
                <MdLocalOffer className="mx-1" />
                Make an Offer
              </button>
              <button className="vehicleActionBtn small border p-2 mx-2">
                <FaScrewdriverWrench className="mx-1" />
                Schedule test Drive
              </button>
              <button className="vehicleActionBtn small border p-2">
                <MdEmail className="mx-1" />
                Email to a friend
              </button>
            </div>
            <div className="d-flex justify-content-between my-2 border-bottom my-4">
              <div className="d-flex">
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
                <IoMdShare className="mx-1 text-danger" />
              </p>
            </div>
            <div>
              <h5>Description</h5>
              <div dangerouslySetInnerHTML={{ __html: detail?.description }}></div>
            </div>
          </Col>
          <Col lg={4}>
            <h4>{[detail?.make.label, detail?.model.label].join(" ")}</h4>
            <p>{[detail?.year, detail?.make.label, detail?.model.label].join("  ")}</p>
            <p className="d-flex align-items-center justify-content-between">
              <div>
                {detail?.country.name}
                <img src={detail?.country.flag} className="ms-1" style={{ width: 22 }} />
              </div>
              <div className="d-flex align-items-center text-danger">
                <p className="m-0">{detail?.currency}</p>
                <p className="m-0">{detail?.price}</p>
              </div>
            </p>
            <p>
              <button className="w-100 p-1 border">Request More Info</button>
            </p>
            <div className="detailsWrapper p-3">
              <h6 className="detailsHeading">Details</h6>
              {Object.keys(detail || {}).map(
                (key) =>
                  key !== "_id" &&
                  key !== "createdAt" &&
                  key !== "media" &&
                  key !== "reviews" &&
                  key !== "description" &&
                  key !== "price" &&
                  key !== "currency" &&
                  key !== "updatedAt" && (
                    <Row className="my-2">
                      <Col xs={5} className="small">
                        {parseCamelKey(key)}
                      </Col>
                      <Col xs={7} className="small">
                        {typeof detail[key] !== "object"
                          ? detail[key]?.toString()
                          : detail[key]?.name || detail[key]?.label}
                      </Col>
                    </Row>
                  )
              )}
            </div>
          </Col>
        </Row>
      </section>

      {action?.type === "sharePost" && <SharePop action={action} setAction={setAction} />}
    </>
  );
}
