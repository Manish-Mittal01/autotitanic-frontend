import React, { Fragment, useEffect, useRef, useState } from "react";
import { ReactComponent as StarRegular } from "../../../Assets/icons/star-regular.svg";
import { ReactComponent as LocationIcon } from "../../../Assets/icons/location.svg";
import { ReactComponent as HeartIcon } from "../../../Assets/icons/heart.svg";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getWishlist, removeWishlistItem } from "../../../redux/vehicles/thunk";

export default function VehicleCard({ vehicle, wishlist }) {
  const navigate = useNavigate();
  const imageRef = useRef();
  const [mainImageWidth, setMainImageWidth] = useState();

  const handleWishlist = async () => {
    await handleApiRequest(getWishlist);
  };

  const handleRemoveWishlistItem = async () => {
    const response = await handleApiRequest(removeWishlistItem, { id: wishlist });
    if (response.status) {
      handleWishlist();
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      setMainImageWidth(imageRef.current.offsetWidth);
    }
  }, [imageRef.current]);

  return (
    <div className="position-relative">
      <Row
        className="vehicleCardWrapper pointer"
        onClick={() => navigate(`/details/${vehicle._id}`)}
      >
        <Col lg={3} xs={9} className="" style={{ paddingInline: 1 }}>
          <img
            ref={imageRef}
            src={vehicle.media?.[0].url}
            className="mainImage w-100"
            style={{ height: mainImageWidth }}
          />
        </Col>
        <Col lg={1} xs={3} className="px-0 d-flex flex-column">
          {vehicle.media?.slice(1, 4).map((image, i) => (
            <img
              key={image}
              src={image.url}
              className={`sideImage`}
              style={{ marginBlock: i === 1 ? 1 : 0 }}
            />
          ))}
        </Col>
        <Col lg={8} xs={12} className="my-2 my-lg-0">
          <h6 className="d-flex align-items-center">
            <p className="m-0">{vehicle?.currency} </p>
            <p className="m-0"> {vehicle?.price}</p>
          </h6>
          <div className="vehicledetails">
            <p>{vehicle.make.label + " " + vehicle.model.label}</p>
            <p>{vehicle.variant?.label}</p>
            <p className="my-2 fw-bold">
              {vehicle.year} | {vehicle.bodyStyle} | {vehicle.mileage}M | {vehicle.engineSize} |{" "}
              {vehicle.gearBox} | {vehicle.fuelType} | {vehicle.condition}
            </p>
            <p className="my-2">{vehicle?.user?.name}</p>
            <p>
              <StarRegular />
              {vehicle.rating || "No Rating yet"} ({vehicle.reviews?.length} reviews)
            </p>
            <p>
              <LocationIcon />
              {vehicle.country?.name}, {vehicle.city?.name}
            </p>
          </div>
        </Col>
      </Row>
      {wishlist && (
        <button
          className="removeBtn border rounded-pill bg-white"
          onClick={handleRemoveWishlistItem}
        >
          Remove
          {/* <HeartIcon style={{ width: 14, height: 14 }} className="removeWishlistIcon ms-1" /> */}
        </button>
      )}
    </div>
  );
}
