import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// img
import { ReactComponent as OpenEye } from "../../../Assets/icons/openEye.svg";
import { ReactComponent as CloseEye } from "../../../Assets/icons/closedEye.svg";
import logo from "../../../Assets/Images/logo.png";
import flatgoogle from "../../../Assets/Images/flat-color-icons_google.svg";
import { loginOrRegisterUser } from "../../../redux/auth/thunk";
import { validateFields } from "../../../services/validator";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { errorMsg } from "../../../utils/toastMsg";

/**
 * Description:- This is our login and registration page. User with existing mail will be loggedin as an existing user and user with new mail will be loggedin as a new user.
 * @returns {any} Componennt
 */

const Login = () => {
  const navigate = useNavigate();
  const { rememberedUser } = useSelector((state) => state.auth);
  const [userCreds, setUserCreds] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserCreds((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async (e) => {
    const request = {
      loginType: "email",
      ...userCreds,
    };

    const response = await handleApiRequest(loginOrRegisterUser, request);
    // console.log("login response", response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userCreds.email) {
      return setErrors({ email: "Please enter email" });
    } else if (!userCreds.password) {
      return setErrors({ password: "Please enter Password" });
    }

    const validationError = validateFields(userCreds);
    if (validationError) {
      return errorMsg(validationError);
    }

    handleLogin();
  };

  const handleGoogleLogin = async () => {
    try {
      let result = {};

      try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        result = await signInWithPopup(auth, provider);
      } catch (firebaseError) {
        console.log("google login firebaseError", firebaseError);
      }

      if (result.user) {
        const request = {
          loginType: "google",
          googleId: result?.user?.uid,
          email: result?.user?.email,
        };

        const response = await handleApiRequest(loginOrRegisterUser, request);
        if (response.isSuccess) {
          navigate("/dashboard");
        }
      }
      // console.log("google login responser", response);
    } catch (error) {
      errorMsg(error?.message);
    }
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
                    <img src={logo} alt="" style={{ maxHeight: 100 }} />
                  </Link>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="text-center pb-0 fs-4 fw-bold">
                        To Unlock The Best of <span className="text-primary">VSL.AI</span>
                      </h5>
                      <p className="text-center small">Login or Sign Up</p>
                    </div>

                    <form onSubmit={handleSubmit} className="row g-3 needs-validation">
                      <div className="col-12">
                        <p
                          onClick={() => {
                            handleGoogleLogin();
                          }}
                          className="btn btn-dark w-100 text-center hvr-float"
                        >
                          <img src={flatgoogle} className="me-1" /> Connect with Google
                        </p>
                      </div>
                      <div className="col-12 text-center">or</div>

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
                          {errors.email && <p className="errorMsg">*{errors.email}</p>}
                        </div>
                      </>

                      <>
                        <div className="col-12">
                          {/* <label for="yourPassword" className="form-label">Password</label> */}
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
                              onChange={(e) => {
                                setUserCreds({
                                  ...userCreds,
                                  remember: e.target.checked,
                                });
                              }}
                              id="rememberMe"
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                              Remember me
                            </label>
                          </div>
                        </div>
                      </>

                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 hvr-float">
                          Login
                        </button>
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

export default Login;
