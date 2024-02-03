import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CloseEye } from "../../../Assets/icons/closedEye.svg";
import { ReactComponent as OpenEye } from "../../../Assets/icons/openEye.svg";
import { Button, Row } from "react-bootstrap";
import Asterik from "../../../components/common/asterik";

export default function ChangePassword() {
  const [errors, setErrors] = useState({});
  const [userCreds, setUserCreds] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <section className="section register  d-flex flex-column align-items-center justify-content-center">
          <form onSubmit={handleSubmit} className="row g-3 needs-validation">
            <Row className="align-items-center my-3">
              <label for="" className="form-label mb-0 col-sm-4">
                <h6 className="m-0">
                  Old Password
                  <Asterik />
                </h6>
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  placeholder="Enter Old password"
                  name="oldPassword"
                  value={userCreds.oldPassword || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              {errors.oldPassword && <p className="errorMsg">*{errors.oldPassword}</p>}
            </Row>
            <Row className="align-items-center my-3">
              <label for="" className="form-label mb-0 col-sm-4">
                <h6 className="m-0">
                  Password
                  <Asterik />
                </h6>
              </label>
              <div className="iconWithText position-relative col-sm-8">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userCreds.password || ""}
                  onChange={handleChange}
                  className="form-control"
                  id="yourPassword"
                  placeholder="Password"
                />
                <span
                  className="icn pointer position-absolute"
                  style={{ left: "unset", right: "20px" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <CloseEye /> : <OpenEye />}
                </span>
              </div>
              {errors.password && <p className="errorMsg">*{errors.password}</p>}
            </Row>
            <Row className="align-items-center my-3">
              <label for="" className="form-label mb-0 col-sm-4">
                <h6 className="m-0">
                  Confirm Password
                  <Asterik />
                </h6>
              </label>
              <div className="iconWithText col-sm-8 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={userCreds.confirmPassword || ""}
                  onChange={handleChange}
                  className="form-control"
                  id="yourPassword"
                  placeholder="Password"
                />
                <span
                  className="icn position-absolute pointer"
                  style={{ left: "unset", right: "20px" }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <CloseEye /> : <OpenEye />}
                </span>
              </div>
              {errors.confirmPassword && <p className="errorMsg">*{errors.confirmPassword}</p>}
            </Row>

            <div className="col-12">
              <Button variant="danger" type="submit" className="btn w-100 ">
                Change Password
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
