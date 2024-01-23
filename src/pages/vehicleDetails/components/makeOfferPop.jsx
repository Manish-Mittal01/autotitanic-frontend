import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function MakeOfferPop({ action, setAction }) {
  const handleClosePop = () => {
    setAction(null);
  };

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
                type="text"
                class="form-control"
                id="inlineFormInputGroup"
                placeholder="Enter your price"
              />
            </div>
          </div>
          <Button variant="danger w-100">Send</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
