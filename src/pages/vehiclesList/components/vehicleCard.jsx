import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { ReactComponent as StarRegular } from "../../../Assets/icons/star-regular.svg";
import { ReactComponent as LocationIcon } from "../../../Assets/icons/location.svg";
import { ReactComponent as CompareIcon } from "../../../Assets/icons/compare.svg";
import { ReactComponent as HeartIcon } from "../../../Assets/icons/heart.svg";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { parseCamelKey } from "../../../utils/parseKey";
import {
  addToCompare,
  addToWishlist,
  getVehicleList,
  getWishlist,
  removeWishlistItem,
  updateVehicle,
} from "../../../redux/vehicles/thunk";
import DeletePopup from "../../../components/Modals/DeletePop";
import { errorMsg, successMsg } from "../../../utils/toastMsg";
import { getUserProfile } from "../../../redux/profile/thunk";
import { useSelector } from "react-redux";
import isUserLoggedin from "../../../utils/isUserLoggedin";
import moment from "moment";

export default function VehicleCard({ vehicle, wishlist, myVehicle }) {
  const navigate = useNavigate();
  const imageRef = useRef();
  const { wishlist: myWishlist } = useSelector((state) => state.vehicles);
  const { userProfile } = useSelector((state) => state.profile);
  const [userAction, setUserAction] = useState(null);
  // const [isVehicleWishlisted, setIsVehicleWishlisted] = useState(false);

  const isVehicleWishlisted = myWishlist.data?.find((item) => vehicle._id === item.vehicle._id);

  const handleWishlist = async () => {
    await handleApiRequest(getWishlist);
  };

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();

    if (!isUserLoggedin()) {
      return errorMsg("Please sign-in or register to compare items");
    }

    const response = await handleApiRequest(addToWishlist, { id: vehicle._id });
    if (response?.status) {
      successMsg("Added to Wishlist");
      handleWishlist();
    }
  };

  const handleRemoveWishlistItem = async (e) => {
    e.stopPropagation();
    const response = await handleApiRequest(removeWishlistItem, { id: wishlist });
    if (response.status) {
      handleWishlist();
    }
  };

  const handleUserProfile = async () => {
    await handleApiRequest(getUserProfile);
  };

  const handleAddToCompare = async (e) => {
    e.stopPropagation();

    if (!isUserLoggedin()) {
      return errorMsg("Please sign-in or register to compare items");
    }

    const response = await handleApiRequest(addToCompare, { vehicle: vehicle._id });
    if (userProfile.data?.compareCount >= 4) {
      navigate("/CompareList");
    }
    if (response?.status) {
      successMsg("Added to compare list");
      handleUserProfile();
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
    console.log("response", response);
    if (response.status) {
      handleVehicleList();
    }
  };

  // console.log("vehicle", vehicle);
  // console.log("myWishlist", myWishlist.data);

  return (
    <>
      <div className={`position-relative`} onClick={() => navigate(`/details/${vehicle._id}`)}>
        <div className={`vehicleCardWrapper ${vehicle?.isFeatured ? "shadow-none" : ""} `}>
          <div
            className={`pointer py-2 d-flex m-0 ${
              vehicle?.isFeatured ? "featuredVehicleCard" : ""
            }`}
          >
            <div className="vehicleCardImageWrapper d-flex">
              <div className="vehicleCardMainImage position-relative">
                <img ref={imageRef} src={vehicle.media?.[0]?.url} className="mainImage" />
                {vehicle?.isFeatured && <button className="featuredBtn">Featured</button>}
              </div>
              <div className="vehicleCardSideImage px-0 d-flex flex-column">
                {vehicle.media?.slice(1, 4).map((image, i) => (
                  <img
                    key={image?.url}
                    src={image?.url}
                    className={`sideImage`}
                    style={{ marginBlock: i === 1 ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>
            <div className="vehicleCardDetails px-2 my-2 my-lg-0 d-flex flex-column">
              <h6 className="d-flex align-items-center justify-content-between">
                <Button
                  className={`rounded-pill py-1 ${
                    vehicle?.condition === "used" ? "bg-danger" : "mainDarkColor"
                  }`}
                >
                  {parseCamelKey(vehicle?.condition)}
                </Button>
                {!myVehicle && !wishlist && (
                  <div className="d-flex gap-10">
                    <Button
                      variant=""
                      className={`border rounded-pill py-1 `}
                      onClick={handleAddToWishlist}
                    >
                      {isVehicleWishlisted ? (
                        <FaHeart className="text-danger" />
                      ) : (
                        <HeartIcon className="redIcon" />
                      )}
                    </Button>
                    <Button
                      className={`rounded-pill py-1 ${
                        vehicle?.user?.userType === "dealer" ? "bg-danger" : "mainDarkColor"
                      }`}
                    >
                      {parseCamelKey(vehicle?.user?.userType)}
                    </Button>
                  </div>
                )}
              </h6>
              <h6 className="d-flex align-items-center justify-content-between">
                <div
                  className="darkColor d-flex align-items-center gap-1 m-0 fw-bold"
                  style={{ fontSize: 18 }}
                >
                  <p className="m-0">{vehicle?.currency} </p>
                  <p className="m-0"> {vehicle?.price?.toLocaleString()}</p>
                </div>
                {!myVehicle && !wishlist && (
                  <Button
                    variant=""
                    className={`border rounded-pill py-1 `}
                    onClick={handleAddToCompare}
                  >
                    <CompareIcon className="redIcon" />
                    Add to Compare
                  </Button>
                )}
              </h6>
              <p className="m-0">
                {vehicle.make?.label ? vehicle.make?.label + " " + vehicle.model?.label : ""}
              </p>
              <p className={`fw-bold text-danger`}>{vehicle?.title}</p>
              <p className="vehicleCardVehicleDetails mb-3 fw-bold">
                {vehicle.year ? `${vehicle.year} Reg | ` : ""}
                {vehicle.bodyStyle ? `${parseCamelKey(vehicle.bodyStyle)} | ` : ""}
                {vehicle.mileage ? `${vehicle.mileage} Miles | ` : ""}
                {vehicle.engineSize ? `${vehicle.engineSize} | ` : ""}
                {vehicle.gearBox ? `${parseCamelKey(vehicle.gearBox)} | ` : ""}
                {vehicle.fuelType ? `${parseCamelKey(vehicle.fuelType)} | ` : ""}
                {vehicle.type === "partAndAccessories"
                  ? `${parseCamelKey(vehicle.category)} | ${parseCamelKey(vehicle.subCategory)}`
                  : ""}
              </p>
              <div style={{ flex: 1 }} />
              <div className="d-flex align-items-end justify-content-between">
                <div>
                  {vehicle?.user?.userType === "dealer" && (
                    <p className="">{vehicle?.user?.name}</p>
                  )}
                  <p className="">
                    <StarRegular />
                    {vehicle.rating || "No Rating yet"} ({vehicle.reviews?.length} reviews)
                  </p>
                  <p className="darkColor mb-2 fw-bold">
                    <LocationIcon />
                    {vehicle.city?.name}, {vehicle.country?.name}
                    <img src={vehicle?.country?.flag} className="mx-1" style={{ width: 18 }} />
                  </p>
                  <p className="darkColor mb-2">
                    <FaRegClock className="me-1" />
                    Posted on {moment(vehicle.createdAt).format("DD MMM, YYYY")}
                  </p>
                </div>
                {vehicle?.user?.userType === "dealer" && (
                  <img src={vehicle?.user?.dealerLogo} className="dealerLogo mb-1" />
                )}
              </div>
              {myVehicle && (
                <div className="d-flex gap-10 ">
                  {vehicle.status !== "deleted" && (
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUserAction({ action: "deletePost", id: vehicle._id });
                      }}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    className="mainDarkColor"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/postAdvert?id=${vehicle._id}`);
                    }}
                  >
                    Edit
                  </Button>
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
          >
            {vehicle.status === "pending" ? "Under Review" : parseCamelKey(vehicle.status)}
          </button>
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
