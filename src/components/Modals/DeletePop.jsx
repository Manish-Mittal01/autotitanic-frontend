import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ReactComponent as WarningSign } from "../../Assets/icons/warning.svg";

const DeletePopup = ({ userAction, setUserAction, onDelete }) => {
  const handleClosePop = () => {
    setUserAction(false);
  };
  const handleDeletePop = async () => {
    await onDelete();
    handleClosePop();
  };

  return (
    <>
      <Modal
        show={!!userAction}
        onHide={handleDeletePop}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
        className="delete-pop"
      >
        {/* <Modal.Header >
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="text-center py-3">
            <div className="icn my-3">
              <WarningSign />
            </div>
            <h2 className="pop-head m-0 pb-2">Are you Sure?</h2>
            <div className="btn-wrap my-2 d-flex align-items-center justify-content-center mt-3">
              <div className="pe-2 w-50">
                <Button
                  onClick={handleClosePop}
                  className="btn-2 w-100 d-flex align-items-center justify-content-center commonBtn"
                >
                  No Cancel!
                </Button>
              </div>
              <div className="pe-2 w-50">
                <Button
                  onClick={handleDeletePop}
                  className=" w-100 d-flex align-items-center justify-content-center commonBtn"
                >
                  Yes, Delete it
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeletePopup;
