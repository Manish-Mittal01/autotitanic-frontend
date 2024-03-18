import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { TiInfoLarge } from "react-icons/ti";
import star1 from "../../../Assets/Images/star-filled.jpeg";
import { ReactComponent as StarRegular } from "../../../Assets/icons/star-regular.svg";
import { GiCheckMark } from "react-icons/gi";
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
  removeCompareListItem,
  removeWishlistItem,
  updateVehicle,
} from "../../../redux/vehicles/thunk";
import DeletePopup from "../../../components/Modals/DeletePop";
import { errorMsg, successMsg } from "../../../utils/toastMsg";
import { getUserProfile } from "../../../redux/profile/thunk";
import { useSelector } from "react-redux";
import isUserLoggedin from "../../../utils/isUserLoggedin";
import moment from "moment";
import { MyTooltip } from "../../../components/myTooltip/myTooltip";
import { isArray } from "../../../utils/dataTypes";
import ReviewDrawer from "../../../components/Modals/ReviewsPop";

export default function VehicleCard({
  vehicle,
  wishlist,
  myVehicle,
  setVehiclesList = () => {},
  i,
  paginationDetails = {},
}) {
  const navigate = useNavigate();
  const imageRef = useRef();
  const { userProfile } = useSelector((state) => state.profile);
  const { filters } = useSelector((state) => state.filters);
  const [userAction, setUserAction] = useState(null);

  const rating =
    isArray(vehicle?.sellerReviews)?.reduce((a, b) => a + Number(b.rating), 0) /
    vehicle?.sellerReviews?.length;

  const handleWishlist = async () => {
    await handleApiRequest(getWishlist);
  };

  const refreshVehicleList = async () => {
    const newFilters = {};
    Object.entries(filters).forEach((filter) => {
      newFilters[filter[0]] = filter[1].value || filter[1]._id;
    });
    const request = {
      filters: { ...newFilters, status: "approved" },
      paginationDetails: paginationDetails,
    };
    const response = await handleApiRequest(getVehicleList, request);
    if (response.status) {
      setVehiclesList(response.data);
    }
  };

  const handleWishlistItem = async (e, actionType) => {
    e.stopPropagation();

    if (!isUserLoggedin()) {
      return errorMsg("Please sign-in or register to compare items");
    }

    if (actionType === "add") {
      const response = await handleApiRequest(addToWishlist, {
        id: vehicle._id,
      });
      if (response?.status) {
        successMsg("Added to Wishlist");
        refreshVehicleList();
      }
    } else {
      const response = await handleApiRequest(removeWishlistItem, {
        id: vehicle?.wishlistItem?._id,
      });
      if (response?.status) {
        successMsg("Removed from Wishlist");
        setVehiclesList((prev) => {
          const newList = JSON.parse(JSON.stringify([...(prev.items || [])]));
          newList[i].wishlistItem = null;
          return { ...prev, items: newList };
        });
      }
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

  const handleCompareItem = async (e, actionType) => {
    e.stopPropagation();

    if (!isUserLoggedin()) {
      return errorMsg("Please sign-in or register to compare items");
    }

    if (actionType === "add") {
      const response = await handleApiRequest(addToCompare, { vehicle: vehicle._id });

      if (userProfile.data?.compareCount >= 4) {
        navigate("/CompareList");
      }
      if (response?.status) {
        successMsg("Added to compare list");
        handleUserProfile();
        refreshVehicleList();
      }
    } else {
      const response = await handleApiRequest(removeCompareListItem, {
        id: vehicle?.compareItem?._id,
      });
      if (response?.status) {
        successMsg("Removed from compare list");
        handleUserProfile();
        setVehiclesList((prev) => {
          const newList = JSON.parse(JSON.stringify([...(prev.items || [])]));
          newList[i].compareItem = null;
          return { ...prev, items: newList };
        });
      }
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

  const handleReviews = (e) => {
    e.stopPropagation();
    setUserAction({ action: "showReviews" });
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
                    {vehicle?.wishlistItem ? (
                      <Button variant="" className={`border border-danger rounded-pill py-1 `}>
                        <FaHeart
                          className="text-danger"
                          style={{ width: 20 }}
                          onClick={(e) => handleWishlistItem(e, "remove")}
                        />
                      </Button>
                    ) : (
                      <Button variant="" className={`border rounded-pill py-1 `}>
                        <HeartIcon
                          className="redIcon"
                          style={{ width: 20 }}
                          onClick={(e) => handleWishlistItem(e, "add")}
                        />
                      </Button>
                    )}
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
                {!myVehicle && !wishlist ? (
                  vehicle?.compareItem ? (
                    <Button
                      variant=""
                      className={`border border-danger rounded-pill py-1 `}
                      onClick={(e) => handleCompareItem(e, "remove")}
                    >
                      <CompareIcon className="redIcon" />
                      Added to Compare
                      <GiCheckMark className="checkMark ms-1" />
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      className={`border rounded-pill py-1 `}
                      onClick={(e) => handleCompareItem(e, "add")}
                    >
                      <CompareIcon className="redIcon" />
                      Add to Compare
                    </Button>
                  )
                ) : (
                  ""
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
                    <img src={star1} className="ratingStar" />
                    {rating || "No Rating yet"}
                    <span onClick={handleReviews}> ({vehicle?.sellerReviews?.length} reviews)</span>
                    <MyTooltip
                      text="Reviews are not verified by AutoTitanic however we check and will review fake reviews when it is spotted"
                      placement="auto"
                    >
                      <TiInfoLarge className="infoIcon mainDarkColor" />
                    </MyTooltip>
                  </p>
                  <p className="darkColor mb-2 fw-bold">
                    <LocationIcon />
                    {vehicle.city?.name}, {vehicle.country?.name}
                    <img src={vehicle?.country?.flag} className="mx-1" style={{ width: 18 }} />
                  </p>
                  <p className="darkColor mb-2">
                    <FaRegClock className="me-1" />
                    Posted on {moment(vehicle.createdAt).format("DD MMM. YYYY")}
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

      {userAction?.action === "deletePost" && (
        <DeletePopup
          userAction={userAction}
          setUserAction={setUserAction}
          onDelete={handleDeletePost}
        />
      )}

      {userAction?.action === "showReviews" && (
        <ReviewDrawer userAction={userAction} setUserAction={setUserAction} />
      )}
    </>
  );
}
