import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ReactComponent as WarningSign } from "../../Assets/icons/warning.svg";

const ConfirmationPopup = ({
  title,
  onCancel,
  onSubmit,
  submitBtnLabel,
  show,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={onCancel}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
        className="delete-pop"
      >
        <Modal.Body>
          <div className="text-center py-3">
            <div className="icn my-3">
              <WarningSign />
            </div>
            <h2 className="pop-head m-0 pb-2">{title || "Are you Sure?"}</h2>
            <div className="btn-wrap my-2 d-flex align-items-center justify-content-center mt-3">
              <div className="pe-2 w-50">
                <Button
                  onClick={onCancel}
                  className="btn-2 w-100 d-flex align-items-center justify-content-center commonBtn"
                >
                  Cancel
                </Button>
              </div>
              <div className="pe-2 w-50">
                <Button
                  onClick={onSubmit}
                  className=" w-100 d-flex align-items-center justify-content-center commonBtn"
                >
                  {submitBtnLabel || "Yes"}
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmationPopup;
