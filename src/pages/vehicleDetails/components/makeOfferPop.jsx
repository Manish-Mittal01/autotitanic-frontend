import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { makeOffer } from "../../../redux/vehicles/thunk";
import { useParams } from "react-router-dom";
import { successMsg } from "../../../utils/toastMsg";
import { preventMinus } from "../../../utils";

export default function MakeOfferPop({ action, setAction }) {
  const { id } = useParams();
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
    } else {
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
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text h-100 rounded-0">{action.currency}</div>
              </div>
              <input
                type="number"
                class="form-control"
                id="inlineFormInputGroup"
                placeholder="Enter your price"
                min={0}
                onKeyDown={preventMinus}
                name="price"
                value={offerDetails.price}
                onChange={handleChange}
              />
            </div>
            <div class="form-check mb-2">
              <input
                type="checkbox"
                class="form-check-input"
                name="whatsapp"
                checked={offerDetails.whatsapp}
                onChange={handleChange}
              />
              <label class="form-check-label">Recieve update on Whatsapp</label>
            </div>
            <div class="form-check mb-2">
              <input
                type="checkbox"
                class="form-check-input"
                name="call"
                checked={offerDetails.call}
                onChange={handleChange}
              />
              <label class="form-check-label">Recieve update via Call</label>
            </div>
            <div class="form-check mb-2">
              <input
                type="checkbox"
                class="form-check-input"
                name="email"
                checked={offerDetails.email}
                onChange={handleChange}
              />
              <label class="form-check-label">Recieve update on Email</label>
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
