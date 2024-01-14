import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// img
import { ReactComponent as OpenEye } from "../../../Assets/icons/openEye.svg";
import { ReactComponent as CloseEye } from "../../../Assets/icons/closedEye.svg";
import mainLogo from "../../../Assets/Images/mainLogo.png";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { login } from "../../../redux/auth/thunk";
import { Button } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const { rememberedUser } = useSelector((state) => state.auth);
  const [userCreds, setUserCreds] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserCreds((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    const response = await handleApiRequest(login, userCreds);

    // console.log("login response", response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userCreds.email) {
      return setErrors({ email: "Please enter email" });
    } else if (!userCreds.password) {
      return setErrors({ password: "Please enter Password" });
    }

    handleLogin();
  };

  useEffect(() => {
    if (rememberedUser.email) {
      setUserCreds({ ...rememberedUser, remember: false });
    }
  }, [rememberedUser]);

  // console.log("userCreds", userCreds);
  // console.log("rememberedUser", rememberedUser);

  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link to="/home" className="logo d-flex align-items-center w-auto">
                    <img src={mainLogo} alt="" style={{ maxHeight: 100 }} />
                  </Link>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="text-center pb-0 fs-4 fw-bold">Login</h5>
                      <p className="text-center small">
                        New to Autotitanic{" "}
                        <Link to="/register" className="text-danger">
                          Create Account
                        </Link>
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="row g-3 needs-validation">
                      <>
                        <div className="col-12">
                          <label for="yourUsername" className="form-label mb-0">
                            Email Address*
                          </label>
                          <div className="input-group has-validation">
                            <span className="input-group-text bg-dark" id="inputGroupPrepend">
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
                          {errors.email && <p className="errorMsg">*{errors.email}</p>}
                        </div>
                      </>

                      <>
                        <div className="col-12">
                          <label for="yourPassword" className="form-label mb-0">
                            Password*
                          </label>
                          <div className="input-group has-validation iconWithText">
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
                              className="icn position-absolute pointer"
                              style={{ left: "unset", right: "10px" }}
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? <CloseEye /> : <OpenEye />}
                            </span>
                          </div>
                          {errors.password && <p className="errorMsg">*{errors.password}</p>}
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="remember"
                              value={userCreds.remember}
                              onChange={handleChange}
                              id="rememberMe"
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                              Remember me
                            </label>
                          </div>
                        </div>
                      </>

                      <div className="col-12">
                        <Button variant="danger" type="submit" className="btn w-100 ">
                          {/* hvr-float */}
                          Login
                        </Button>
                      </div>
                      <div className="col-12 d-flex justify-content-between">
                        <p className="small mb-0">
                          Forgot Password?{" "}
                          <span
                            onClick={() => {
                              navigate("/resetPassword");
                            }}
                            className="pointer theme-clr"
                          >
                            Reset Here
                          </span>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <div className="credits">
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
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
