import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import isEmail from "validator/lib/isEmail";
import { ReactComponent as BackIcon } from "../../../Assets/icons/leftArrow.svg";
import logo from "../../../Assets/Images/logo.png";
import {
  forgotPassword,
  resendForgotOtp,
  resetPassword,
  verifyOtp,
} from "../../../redux/auth/thunk";
import { validateFields } from "../../../services/validator";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { logData } from "../../../services/logService";
import { errorMsg, successMsg } from "../../../utils/toastMsg";

/**
 * Description This component is to reset the password. if a user forgot password he/she can go to this page. Enter its email and verigy otp received on the registered email.
 * @returns {any}
 */

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCreds, setUserCreds] = useState({});
  const [forgotPasswordStep, setForgotPasswordStep] = useState("sendOtp");

  const handleChange = (e) => {
    setUserCreds((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleForgotPassword = async () => {
    if (!userCreds.email || !isEmail(userCreds.email)) {
      return errorMsg("Invalid email");
    }

    const response = await handleApiRequest(forgotPassword, {
      email: userCreds.email,
    });
    if (response.isSuccess) {
      setForgotPasswordStep("verifyOtp");
      successMsg("OTP sent to your mail successfully");
    }
  };

  const handleResetPassword = async () => {
    try {
      logData("userCreds", userCreds);

      if (!userCreds.password) {
        return errorMsg("Please enter password");
      }

      const request = {
        email: userCreds.email,
        OTP: userCreds.otp,
      };
      const otpVerified = await dispatch(verifyOtp(request)).unwrap();
      console.log("resend otp response", otpVerified);
      if (!otpVerified.isSuccess) {
        return errorMsg(otpVerified.error);
      }

      const newPasswordRequest = {
        ...userCreds,
      };
      const response = await dispatch(resetPassword(newPasswordRequest)).unwrap();
      if (!response.isSuccess) {
        errorMsg(response.error);
      } else {
        navigate("/login");
      }
      console.log("password reset response", response);
    } catch (error) {
      errorMsg(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateFields(userCreds);
    if (validationError) {
      return errorMsg(validationError);
    }

    if (forgotPasswordStep === "sendOtp") {
      handleForgotPassword();
    } else if (forgotPasswordStep === "verifyOtp") {
      handleResetPassword();
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await dispatch(resendForgotOtp({ email: userCreds.email })).unwrap();
      if (response.isSuccess) {
        successMsg("OTP sent successfully");
      } else {
        errorMsg(response.error);
      }
      console.log("resebd otp response", response);
    } catch (error) {
      errorMsg(error.message);
    }
  };

  // logData("userCreds", userCreds);

  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link to="/home" className="logo d-flex align-items-center w-auto">
                    <img src={logo} alt="" style={{ maxHeight: 100 }} />
                  </Link>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <Link to="/login" className="border-0 btn p-0 backBtn" variant="transparent">
                        <span className="icn">
                          <BackIcon />
                        </span>
                      </Link>
                      <h5 className="text-center pb-0 fs-4 fw-bold">
                        To Unlock The Best of
                        <span className="text-primary">VSL.AI</span>
                      </h5>
                      <p className="text-center small">Reset your password</p>
                    </div>

                    <form onSubmit={handleSubmit} className="row g-3 needs-validation">
                      {forgotPasswordStep === "verifyOtp" ? (
                        <>
                          <div className="col-12">
                            <div className="input-group has-validation">
                              <input
                                type="text"
                                name="otp"
                                value={userCreds.otp || ""}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter OTP"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="input-group has-validation">
                              <input
                                type="password"
                                name="password"
                                value={userCreds.password || ""}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter new password"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="input-group has-validation">
                              <input
                                type="password"
                                name="confirmPassword"
                                value={userCreds.confirmPassword || ""}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter new password again               "
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-12">
                            {/* <label for="yourUsername" className="form-label">Email</label> */}
                            <div className="input-group has-validation">
                              <span className="input-group-text bg-primary" id="inputGroupPrepend">
                                <i className="bi bi-envelope text-white" />
                              </span>
                              <input
                                type="email"
                                name="email"
                                value={userCreds.email || ""}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Email Address"
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 hvr-float">
                          {forgotPasswordStep === "sendOtp"
                            ? "Send OTP"
                            : forgotPasswordStep === "verifyOtp"
                            ? "Reset Password"
                            : ""}
                        </button>
                      </div>
                      <div className="col-12 d-flex justify-content-between">
                        {forgotPasswordStep ? (
                          <>
                            <p className="small mb-0">
                              Remember Password?{" "}
                              <span
                                onClick={() => {
                                  navigate("/login");
                                }}
                                className="pointer"
                              >
                                Login
                              </span>
                            </p>
                            {forgotPasswordStep === "verifyOtp" && (
                              <p
                                className="small mb-0 pointer"
                                onClick={() => {
                                  handleResendOtp();
                                }}
                              >
                                Resend OTP
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="small mb-0">
                            Forgot Password?{" "}
                            <span
                              onClick={() => {
                                setForgotPasswordStep("sendOtp");
                              }}
                              className="pointer"
                            >
                              Reset Here
                            </span>
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="credits">
                  By continuing you agree to our
                  <Link to="/terms_of_use" className="pointer">
                    {" "}
                    Terms
                  </Link>{" "}
                  &amp;
                  <Link to="/privacy_policies" className="pointer">
                    {" "}
                    Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ResetPassword;
