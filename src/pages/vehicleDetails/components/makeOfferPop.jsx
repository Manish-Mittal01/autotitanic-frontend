import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { makeOffer } from "../../../redux/vehicles/thunk";
import { useParams } from "react-router-dom";
import { successMsg } from "../../../utils/toastMsg";
import { preventMinus } from "../../../utils";
import { useSelector } from "react-redux";

export default function MakeOfferPop({ action, setAction }) {
  const { id } = useParams();
  const { userProfile } = useSelector((state) => state.profile);
  const [offerDetails, setOfferDetails] = useState({});
  const [error, setError] = useState("");

  const handleClosePop = () => {
    setAction(null);
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const value = type === "checkbox" ? e.target.checked : e.target.value;

    setOfferDetails((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleMakeOffer = async () => {
    if (!offerDetails.whatsapp && !offerDetails.call && !offerDetails.email) {
      return setError("*Select where you want to get update from the seller");
    } else if (!offerDetails.price) {
      return setError("*Enter offer price");
    }
    // else if (
    //   offerDetails.whatsapp &&
    //   (!userProfile.data?.whatsapp || userProfile.data?.whatsapp?.length < 10)
    // ) {
    //   return setError("*Update your whatsApp to receive updates");
    // }
    else {
      setError("");
    }

    const request = {
      vehicleId: id,
      currency: action.currency,
      ...offerDetails,
    };

    const response = await handleApiRequest(makeOffer, request);
    if (response.status) {
      successMsg("Offer sent to the seller!!");
      handleClosePop();
    }
  };

  // console.log("offerDetails", offerDetails);
  // console.log("postUrl", `${postUrl} abc`);
  // console.log("userProfile", userProfile);

  return (
    <>
      <Modal
        show={!!action}
        onHide={handleClosePop}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
        className="delete-pop"
      >
        <Modal.Header closeButton>Make an Offer</Modal.Header>
        <Modal.Body>
          <div className="">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text h-100 rounded-0">{action.currency}</div>
              </div>
              <input
                type="number"
                className="form-control"
                id="inlineFormInputGroup"
                placeholder="Enter your price"
                min={0}
                onKeyDown={preventMinus}
                name="price"
                value={offerDetails.price}
                onChange={handleChange}
              />
            </div>
            <div className="form-check mb-2">
              <input
                id="whatsappUpdate"
                className="form-check-input"
                type="checkbox"
                name="whatsapp"
                checked={offerDetails.whatsapp}
                onChange={handleChange}
              />
              <label htmlFor="whatsappUpdate" className="form-check-label">
                Recieve update on WhatsApp
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                id="callUpdate"
                className="form-check-input"
                type="checkbox"
                name="call"
                checked={offerDetails.call}
                onChange={handleChange}
              />
              <label htmlFor="callUpdate" className="form-check-label">
                Recieve update via Call
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                id="emailUpdate"
                className="form-check-input"
                type="checkbox"
                name="email"
                checked={offerDetails.email}
                onChange={handleChange}
              />
              <label htmlFor="emailUpdate" className="form-check-label">
                Recieve update on Email
              </label>
            </div>
          </div>
          {error && <p className="small text-danger">{error}</p>}
          <Button variant="danger w-100" onClick={handleMakeOffer}>
            Send
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
