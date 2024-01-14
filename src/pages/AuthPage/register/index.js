import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { Button } from "react-bootstrap";
import { isEmail } from "validator";
import { phone } from "phone";
import { ReactComponent as OpenEye } from "../../../Assets/icons/openEye.svg";
import { ReactComponent as CloseEye } from "../../../Assets/icons/closedEye.svg";
import mainLogo from "../../../Assets/Images/mainLogo.png";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { register } from "../../../redux/auth/thunk";
import { getAllCountry } from "../../../redux/countryAndCity/thunk";
import SelectBox from "../../../components/selectBox";

const Register = () => {
  const navigate = useNavigate();
  const { allCountries } = useSelector((state) => state.countryAndCity);
  const [userCreds, setUserCreds] = useState({
    name: "",
    email: "",
    mobile: "",
    userType: "",
    country: "",
    password: "",
  });
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

  const handleCountryList = async () => {
    await handleApiRequest(getAllCountry);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    Object.keys(userCreds).map((value) => {
      if (!userCreds[value])
        return setErrors((prev) => ({ ...prev, [value]: `Please enter ${value}` }));
      else setErrors((prev) => ({ ...prev, [value]: `` }));
    });

    if (userCreds.email && !isEmail(userCreds.email)) return setErrors({ email: `Invalid email` });
    if (userCreds.mobile && !phone(userCreds.mobile).isValid)
      return setErrors({ mobile: `Invalid mobile` });

    const request = {
      ...userCreds,
      country: userCreds.country?.name,
      userType: userCreds.userType?.value,
    };

    const response = await handleApiRequest(register, request);
    if (response.status) {
      navigate("/login");
    }
    console.log("login response", response);
  };

  useEffect(() => {
    handleCountryList();
  }, []);

  // console.log("userCreds", userCreds);
  // console.log("rememberedUser", rememberedUser);
  //   console.log("allCountries", allCountries);

  return (
    <>
      <div className="container">
        <section className="section register d-flex flex-column align-items-center justify-content-center">
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
                      <h5 className="text-center pb-0 fs-4 fw-bold">Register</h5>
                      <p className="text-center small">
                        Already have a account{" "}
                        <Link to="/login" className="text-danger">
                          Login
                        </Link>
                      </p>
                    </div>

                    <form onSubmit={handleRegister} className="row g-3 needs-validation">
                      <div className="col-12">
                        <label for="name" className="form-label mb-0">
                          Name*
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            name="name"
                            value={userCreds.name || ""}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.name && <p className="errorMsg">*{errors.name}</p>}
                      </div>

                      <div className="col-12">
                        <label for="email" className="form-label mb-0">
                          Email Address*
                        </label>
                        <div className="input-group has-validation">
                          <span className="input-group-text bg-dark" id="inputGroupPrepend">
                            <i className="bi bi-envelope text-white" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email Address"
                            name="email"
                            value={userCreds.email || ""}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.email && <p className="errorMsg">*{errors.email}</p>}
                      </div>

                      <div className="col-12">
                        <label for="name" className="form-label mb-0">
                          Phone Number*
                        </label>
                        <div className="input-group has-validation">
                          <PhoneInput
                            className="phoneInput"
                            country={"gh"}
                            value={userCreds.mobile}
                            onChange={(value, country, e, formattedValue) =>
                              setUserCreds((prev) => ({ ...prev, mobile: formattedValue }))
                            }
                          />
                        </div>
                        {errors.mobile && <p className="errorMsg">*{errors.mobile}</p>}
                      </div>

                      <div className="col-12">
                        <label for="name" className="form-label mb-0">
                          Country*
                        </label>
                        <div className="input-group has-validation">
                          <SelectBox
                            styles={{
                              container: (baseStyle) => ({ ...baseStyle, height: 45 }),
                              control: (baseStyle) => ({ ...baseStyle, height: "100%" }),
                            }}
                            options={allCountries.data?.items}
                            getOptionValue={(option) => option._id}
                            getOptionLabel={(option) => option.name}
                            value={userCreds.country}
                            onChange={(selected) =>
                              setUserCreds((prev) => ({ ...prev, country: selected }))
                            }
                          />
                        </div>
                        {errors.country && <p className="errorMsg">*{errors.country}</p>}
                      </div>

                      <div className="col-12">
                        <label for="name" className="form-label mb-0">
                          User Type*
                        </label>
                        <div className="input-group has-validation">
                          <SelectBox
                            styles={{
                              container: (baseStyle) => ({ ...baseStyle, height: 45 }),
                              control: (baseStyle) => ({ ...baseStyle, height: "100%" }),
                            }}
                            options={[
                              { value: "dealer", label: "Dealer" },
                              { value: "private", label: "Private" },
                            ]}
                            value={userCreds.userType}
                            onChange={(selected) =>
                              setUserCreds((prev) => ({ ...prev, userType: selected }))
                            }
                          />
                        </div>
                        {errors.userType && <p className="errorMsg">*{errors.userType}</p>}
                      </div>

                      <div className="col-12">
                        <label for="name" className="form-label mb-0">
                          Profile Image
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type={"file"}
                            name="image"
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        {errors.image && <p className="errorMsg">*{errors.image}</p>}
                      </div>

                      <div className="col-12">
                        <label for="password" className="form-label mb-0">
                          Password*
                        </label>
                        <div className="input-group has-validation iconWithText">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={userCreds.password || ""}
                            onChange={handleChange}
                            className="form-control"
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
                        <Button variant="danger" type="submit" className="btn w-100 ">
                          {/* hvr-float */}
                          Register
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
