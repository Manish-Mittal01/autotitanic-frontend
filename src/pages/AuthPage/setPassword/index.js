import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../../Assets/Images/logo.png";
import { validateFields } from "../../../services/validator";
import { setNewPassword } from "../../../redux/auth/thunk";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { errorMsg, successMsg } from "../../../utils/toastMsg";

/**
 * Description:- New user created by admin can set their password here. After successfull password setup user can login with email and password.
 * @returns {any}
 */

const SetNewUserPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState({});

  const handleChange = (e) => {
    setUserCreds((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSetPassword = async () => {
    const request = {
      ...userCreds,
      id: searchParams.get("id"),
      token: searchParams.get("auth"),
    };
    const response = await handleApiRequest(setNewPassword, request);
    console.log("new password response", response);
    if (response.isSuccess) {
      successMsg("Password updated successfully");
      navigate("/login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateFields(userCreds);
    if (validationError) {
      return errorMsg(validationError);
    }
    handleSetPassword();
  };

  console.log("userCreds", userCreds);
  // console.log("rememberedUser", rememberedUser);

  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link to="/cars" className="logo d-flex align-items-center w-auto">
                    <img src={logo} alt="" style={{ maxHeight: 100 }} />
                  </Link>
                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <Link
                        to={"/login"}
                        className="border-0 btn p-0 backBtn"
                        variant="transparent"
                      >
                        <span className="icn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                          >
                            <mask
                              id="mask0_2_9"
                              style={{ maskType: "luminance" }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="2"
                              width="28"
                              height="24"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M25.6666 23.821C22.8123 20.3368 20.2778 18.3598 18.0623 17.8897C15.8473 17.4201 13.7386 17.3489 11.7354 17.6768V23.9167L2.33325 13.7346L11.7354 4.08334V10.0141C15.439 10.0433 18.5873 11.3721 21.1808 14C23.7737 16.6279 25.2693 19.9016 25.6666 23.821Z"
                                fill="white"
                                stroke="white"
                                strokeWidth="4"
                                strokeLinejoin="round"
                              />
                            </mask>
                            <g mask="url(#mask0_2_9)">
                              <path d="M0 0H28V28H0V0Z" fill="black" />
                            </g>
                          </svg>
                        </span>
                      </Link>
                      <h4 className="fw-bold m-0 py-2 text-center">
                        Forgot <span className="theme-clr"> Password</span>
                      </h4>
                      <h5 className="text-center pb-0 fs-4 fw-bold">
                        To Unlock The Best of
                        <span className="text-primary"> VSL.AI</span>
                      </h5>
                      <p className="text-center small">Set your password to login</p>
                    </div>

                    <form onSubmit={handleSubmit} className="row g-3 needs-validation">
                      <>
                        <div className="col-12">
                          <div className="input-group has-validation iconWithText">
                            <input
                              type="password"
                              name="password"
                              value={userCreds.password || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter new password"
                            />
                            <span
                              className="icn position-absolute"
                              style={{ left: "unset", right: "10px" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="10"
                                viewBox="0 0 18 10"
                                fill="none"
                              >
                                <path
                                  d="M1.5 5.83334C4.5 -0.833323 13.5 -0.833323 16.5 5.83334"
                                  stroke="#A0A0A0"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 9.16669C8.6717 9.16669 8.34661 9.10202 8.04329 8.97639C7.73998 8.85075 7.46438 8.6666 7.23223 8.43445C7.00009 8.20231 6.81594 7.92671 6.6903 7.6234C6.56466 7.32008 6.5 6.99499 6.5 6.66669C6.5 6.33838 6.56466 6.01329 6.6903 5.70998C6.81594 5.40666 7.00009 5.13107 7.23223 4.89892C7.46438 4.66677 7.73998 4.48262 8.04329 4.35699C8.34661 4.23135 8.6717 4.16669 9 4.16669C9.66304 4.16669 10.2989 4.43008 10.7678 4.89892C11.2366 5.36776 11.5 6.00365 11.5 6.66669C11.5 7.32973 11.2366 7.96561 10.7678 8.43445C10.2989 8.9033 9.66304 9.16669 9 9.16669Z"
                                  stroke="#A0A0A0"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="input-group has-validation iconWithText">
                            <input
                              type="password"
                              name="confirmPassword"
                              value={userCreds.confirmPassword || ""}
                              onChange={handleChange}
                              className="form-control"
                              placeholder="Enter new password again               "
                            />
                            <span
                              className="icn position-absolute"
                              style={{ left: "unset", right: "10px" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="10"
                                viewBox="0 0 18 10"
                                fill="none"
                              >
                                <path
                                  d="M1.5 5.83334C4.5 -0.833323 13.5 -0.833323 16.5 5.83334"
                                  stroke="#A0A0A0"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 9.16669C8.6717 9.16669 8.34661 9.10202 8.04329 8.97639C7.73998 8.85075 7.46438 8.6666 7.23223 8.43445C7.00009 8.20231 6.81594 7.92671 6.6903 7.6234C6.56466 7.32008 6.5 6.99499 6.5 6.66669C6.5 6.33838 6.56466 6.01329 6.6903 5.70998C6.81594 5.40666 7.00009 5.13107 7.23223 4.89892C7.46438 4.66677 7.73998 4.48262 8.04329 4.35699C8.34661 4.23135 8.6717 4.16669 9 4.16669C9.66304 4.16669 10.2989 4.43008 10.7678 4.89892C11.2366 5.36776 11.5 6.00365 11.5 6.66669C11.5 7.32973 11.2366 7.96561 10.7678 8.43445C10.2989 8.9033 9.66304 9.16669 9 9.16669Z"
                                  stroke="#A0A0A0"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </>

                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 hvr-float">
                          Set Password
                        </button>
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

export default SetNewUserPassword;
