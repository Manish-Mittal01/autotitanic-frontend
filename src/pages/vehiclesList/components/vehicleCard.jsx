import React, { Fragment, useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { ReactComponent as StarRegular } from "../../../Assets/icons/star-regular.svg";
import { ReactComponent as LocationIcon } from "../../../Assets/icons/location.svg";
import { ReactComponent as HeartIcon } from "../../../Assets/icons/heart.svg";
import dealerLogo from "../../../Assets/Images/mainLogo.png";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { parseCamelKey } from "../../../utils/parseKey";
import { getWishlist, removeWishlistItem, updateVehicle } from "../../../redux/vehicles/thunk";
import DeletePopup from "../../../components/Modals/DeletePop";

export default function VehicleCard({ vehicle, wishlist, myVehicle }) {
  const navigate = useNavigate();
  const imageRef = useRef();
  const [mainImageWidth, setMainImageWidth] = useState();
  const [userAction, setUserAction] = useState(null);

  const handleWishlist = async () => {
    await handleApiRequest(getWishlist);
  };

  const handleRemoveWishlistItem = async () => {
    const response = await handleApiRequest(removeWishlistItem, { id: wishlist });
    if (response.status) {
      handleWishlist();
    }
  };

  const handleVehicleList = async () => {
    const request = { filters: { status: "" } };
    await handleApiRequest(getVehicleList, request);
  };

  const handleDeletePost = async () => {
    const response = await handleApiRequest(updateVehicle, {
      _id: userAction.id,
      status: "deleted",
    });
    if (response.status) {
      handleVehicleList();
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      console.log("imageRef.current.offsetHeight", imageRef.current.offsetHeight);
      setMainImageWidth(imageRef.current.offsetHeight * (4 / 3));
    }
  }, [imageRef.current?.offsetHeight]);

  // console.log("vehicle.media", vehicle.media);

  return (
    <>
      <div className={`position-relative`}>
        <div className={`vehicleCardWrapper ${vehicle?.isFeatured ? "shadow-none" : ""} `}>
          <div
            className={`pointer py-2 d-flex m-0 ${
              vehicle?.isFeatured ? "featuredVehicleCard" : ""
            }`}
          >
            <div className="vehicleCardImageWrapper d-flex align-items-center">
              <div
                className="vehicleCardMainImage position-relative"
                style={{ paddingInline: 1 }}
                onClick={() => navigate(`/details/${vehicle._id}`)}
              >
                <img
                  ref={imageRef}
                  src={vehicle.media?.[0]?.url}
                  className="mainImage"
                  // style={{ minWidth: mainImageWidth }}
                />
                {vehicle?.isFeatured && <button className="featuredBtn">Featured</button>}
              </div>
              <div
                className="vehicleCardSideImage px-0 d-flex flex-column"
                onClick={() => navigate(`/details/${vehicle._id}`)}
              >
                {vehicle.media?.slice(1, 4).map((image, i) => (
                  <img
                    key={image?.url}
                    src={image?.url}
                    className={`sideImage`}
                    style={{ height: "33%", marginBlock: i === 1 ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>
            <div className="vehicleCardDetails px-2 my-2 my-lg-0 d-flex flex-column">
              <h6
                className="d-flex align-items-center justify-content-between"
                onClick={() => navigate(`/details/${vehicle._id}`)}
              >
                <div className="d-flex align-items-center text-danger gap-1 h5 m-0">
                  <p className="m-0">{vehicle?.currency} </p>
                  <p className="m-0"> {vehicle?.price?.toLocaleString()}</p>
                </div>
                {!myVehicle && !wishlist && (
                  <Button
                    className={`rounded-pill py-1 ${
                      vehicle?.user?.userType === "dealer" ? "bg-danger" : "mainDarkColor"
                    }`}
                  >
                    {parseCamelKey(vehicle?.user?.userType)}
                  </Button>
                )}
              </h6>
              <p className="m-0" onClick={() => navigate(`/details/${vehicle._id}`)}>
                {vehicle.make?.label + " " + vehicle.model?.label}
              </p>
              <p className={`${vehicle?.isFeatured ? "fw-bold text-danger" : ""}`}>
                {vehicle?.title}
              </p>
              <p
                className="vehicleCardVehicleDetails mb-3 fw-bold"
                onClick={() => navigate(`/details/${vehicle._id}`)}
              >
                {vehicle.year} | {parseCamelKey(vehicle.bodyStyle)} | {vehicle.mileage}M |{" "}
                {vehicle.engineSize} | {parseCamelKey(vehicle.gearBox)} |{" "}
                {parseCamelKey(vehicle.fuelType)} | {parseCamelKey(vehicle.condition)}
              </p>
              <div style={{ flex: 1 }} onClick={() => navigate(`/details/${vehicle._id}`)} />
              <div
                className="d-flex align-items-center justify-content-between"
                onClick={() => navigate(`/details/${vehicle._id}`)}
              >
                <div>
                  {vehicle?.user?.userType === "dealer" && (
                    <p className="">{vehicle?.user?.name}</p>
                  )}
                  <p className="mb-0">
                    <StarRegular />
                    {vehicle.rating || "No Rating yet"} ({vehicle.reviews?.length} reviews)
                  </p>
                  <p className="m-0">
                    <LocationIcon />
                    {vehicle.city?.name}, {vehicle.country?.name}
                  </p>
                </div>
                {vehicle?.user?.userType === "dealer" && (
                  <img src={vehicle?.user?.dealerLogo} className="dealerLogo" />
                )}
              </div>
              {myVehicle && (
                <div className="d-flex gap-10 ">
                  {vehicle.status !== "deleted" && (
                    <Button
                      variant="danger"
                      className=""
                      onClick={() => setUserAction({ action: "deletePost", id: vehicle._id })}
                    >
                      Delete
                    </Button>
                  )}
                  {vehicle.status === "draft" && (
                    <Button
                      variant="danger"
                      className=""
                      onClick={() => navigate(`/cars/sell?id=${vehicle._id}`, { state: 1 })}
                    >
                      Upload
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {wishlist && (
          <button
            className="removeBtn border rounded-pill bg-white"
            onClick={handleRemoveWishlistItem}
          >
            Remove
          </button>
        )}
        {myVehicle && (
          <>
            <button
              className={`removeBtn border rounded-pill bg-white ${
                vehicle.status === "approved"
                  ? "successMsg"
                  : vehicle.status === "rejected" || vehicle.status === "deleted"
                  ? "rejectMsg"
                  : vehicle.status === "pending" || vehicle.status === "draft"
                  ? "warningMsg"
                  : ""
              }`}
              onClick={handleRemoveWishlistItem}
            >
              {parseCamelKey(vehicle.status)}
            </button>
          </>
        )}
      </div>

      {
        <DeletePopup
          userAction={userAction}
          setUserAction={setUserAction}
          onDelete={handleDeletePost}
        />
      }
    </>
  );
}
