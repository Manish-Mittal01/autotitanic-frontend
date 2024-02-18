import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Dropdown } from "react-bootstrap";
import { isEmail } from "validator";
import { phone } from "phone";
import { ReactComponent as OpenEye } from "../../../Assets/icons/openEye.svg";
import { ReactComponent as CloseEye } from "../../../Assets/icons/closedEye.svg";
import mainLogo from "../../../Assets/Images/mainLogo.png";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { register } from "../../../redux/auth/thunk";
import { getAllCountry } from "../../../redux/countryAndCity/thunk";
import SelectBox from "../../../components/selectBox";
import Asterik from "../../../components/common/asterik";
import { uploadFile } from "../../../redux/common/thunk";

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
  const [selectedCountry, setSelectedCountry] = useState({});

  const ghanaFlag = useMemo(() => {
    if (allCountries.data) {
      const ghana = allCountries.data?.items?.find((country) => country.name === "Ghana");
      return ghana?.flag;
    }
  }, [allCountries]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.type === "file"
        ? e.target.files[0]
        : e.target.value;
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
    let myErrors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    for (let value of Object.keys(userCreds)) {
      if (!userCreds[value]) {
        myErrors = { ...myErrors, [value]: `Please enter ${value}` };
      } else {
        myErrors = { ...myErrors, [value]: "" };
      }
    }

    if (Object.values(myErrors).filter((value) => value)?.length > 0) {
      return setErrors(myErrors);
    }

    if (userCreds.email && !isEmail(userCreds.email)) return setErrors({ email: `Invalid email` });
    if (userCreds.mobile && (!phone(userCreds.mobile).isValid || !selectedCountry.mobile))
      return setErrors({ mobile: `Invalid mobile or country` });
    if (userCreds.whatsapp && (!phone(userCreds.whatsapp).isValid || !selectedCountry.whatsapp))
      return setErrors({ whatsapp: `Invalid whatsApp or country` });
    if (!passwordRegex.test(userCreds.password))
      return setErrors({
        password:
          "Password must include number, small letter, capital, special character atleast 8 character long",
      });
    if (userCreds.password !== userCreds.confirmPassword)
      return setErrors({ password: "Password and confirm password should be same" });

    let image = "";
    if (userCreds.image) {
      const formData = new FormData();
      formData.append("images", userCreds.image);
      const response = await handleApiRequest(uploadFile, formData);
      if (response.status) {
        image = response.data[0]?.url;
      }
    }
    const request = {
      ...userCreds,
      country: userCreds.country?._id,
      userType: userCreds.userType?.value,
      image: image,
    };

    const response = await handleApiRequest(register, request);
    if (response.status) {
      navigate("/login");
    }
  };

  useEffect(() => {
    handleCountryList();
  }, []);

  useEffect(() => {
    if (userCreds.mobile) {
      const mobileCode = userCreds.mobile.split(" ")[0].slice(1);
      const selectedCountry = allCountries.data?.items.find((country) =>
        country.countryCode.startsWith(mobileCode)
      );

      setSelectedCountry((prev) => ({ ...prev, mobile: selectedCountry }));
    }
    if (userCreds.whatsapp) {
      const mobileCode = userCreds.whatsapp.split(" ")[0].slice(1);
      const selectedCountry = allCountries.data?.items.find((country) =>
        country.countryCode.startsWith(mobileCode)
      );

      setSelectedCountry((prev) => ({ ...prev, whatsapp: selectedCountry }));
    }
  }, [userCreds.mobile, userCreds.whatsapp]);

  // console.log("userCreds", userCreds);
  // console.log("rememberedUser", rememberedUser);
  //   console.log("allCountries", allCountries);
  console.log("selectedCountry", selectedCountry);

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
                        <span className="primaryColor">Already have a account </span>
                        <Link to="/login" className="text-danger">
                          Login
                        </Link>
                      </p>
                    </div>

                    <form onSubmit={handleRegister} className="row g-3 needs-validation">
                      <div className="col-12">
                        <label
                          for="name"
                          className="darkColor darkColor form-label fw-bold fw-bold mb-0"
                        >
                          User Type
                          <Asterik />
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
                        <label for="name" className="darkColor form-label fw-bold mb-0">
                          {userCreds.userType?.value === "dealer" ? "Business Name" : "Full Name"}
                          <Asterik />
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="text"
                            maxLength={15}
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
                        <label for="email" className="darkColor form-label fw-bold mb-0">
                          Email Address
                          <Asterik />
                        </label>
                        <div className="input-group has-validation">
                          <span className="input-group-text bg-dark" id="inputGroupPrepend">
                            <i className="bi bi-envelope text-white" />
                          </span>
                          <input
                            type="email"
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
                        <label for="name" className="darkColor form-label fw-bold mb-0">
                          Country
                          <Asterik />
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
                            onChange={(selected) => {
                              setUserCreds((prev) => ({
                                ...prev,
                                country: selected,
                                mobile: `+${selected.countryCode}`,
                                whatsapp: `+${selected.countryCode}`,
                              }));
                            }}
                          />
                        </div>
                        {errors.country && <p className="errorMsg">*{errors.country}</p>}
                      </div>
                      <div className="col-12">
                        <label for="name" className="darkColor form-label fw-bold mb-0">
                          Phone Number
                          <Asterik />
                        </label>
                        <div className="input-group has-validation">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant=""
                              id="dropdown-basic"
                              className="countryCodeSelector"
                            >
                              <img src={selectedCountry.mobile?.flag || ghanaFlag} width={18} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="countryCodeSelectorBox">
                              {allCountries.data?.items?.map((country) => (
                                <Dropdown.Item
                                  className="countryCodeSelectorItem"
                                  onClick={() => {
                                    setUserCreds((prev) => ({
                                      ...prev,
                                      mobile: `+${country.countryCode}`,
                                    }));
                                  }}
                                >
                                  <p>
                                    <img src={country.flag} width={15} className="me-2" />
                                    {country?.name}
                                    {` (+${country?.countryCode})`}
                                  </p>
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone"
                            name="mobile"
                            value={userCreds.mobile || "+233"}
                            onChange={(e) => {
                              const value = e.target.value.slice(1);
                              const updatedValue = value.replace(/\D+/g, "");

                              setUserCreds((prev) => ({
                                ...prev,
                                mobile: "+" + updatedValue,
                              }));
                            }}
                          />
                        </div>

                        {errors.mobile && <p className="errorMsg">*{errors.mobile}</p>}
                      </div>
                      <div className="col-12">
                        <label for="name" className="darkColor form-label fw-bold mb-0">
                          WhatsApp Number
                        </label>
                        <div className="input-group has-validation">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant=""
                              id="dropdown-basic"
                              className="countryCodeSelector"
                            >
                              <img src={selectedCountry.whatsapp?.flag || ghanaFlag} width={18} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="countryCodeSelectorBox">
                              {allCountries.data?.items?.map((country) => (
                                <Dropdown.Item
                                  className="countryCodeSelectorItem"
                                  onClick={() => {
                                    setUserCreds((prev) => ({
                                      ...prev,
                                      whatsapp: `+${country.countryCode}`,
                                    }));
                                  }}
                                >
                                  <p>
                                    <img src={country.flag} width={15} className="me-2" />
                                    {country?.name}
                                    {` (+${country?.countryCode})`}
                                  </p>
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Phone"
                            name="whatsapp"
                            value={userCreds.whatsapp || "+233"}
                            onChange={(e) => {
                              const value = e.target.value.slice(1);
                              const updatedValue = value.replace(/\D+/g, "");

                              setUserCreds((prev) => ({
                                ...prev,
                                whatsapp: "+" + updatedValue,
                              }));
                            }}
                          />
                        </div>
                        {errors.whatsapp && <p className="errorMsg">*{errors.whatsapp}</p>}
                      </div>
                      <div className="col-12">
                        <label for="name" className="darkColor form-label fw-bold mb-0">
                          {userCreds.userType?.value === "dealer"
                            ? "Business logo "
                            : "Profile Image "}
                          (png, jpg, jpeg)
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
                        <label for="password" className="darkColor form-label fw-bold mb-0">
                          Password
                          <Asterik />
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
                        <label for="password" className="darkColor form-label fw-bold mb-0">
                          Confirm Password
                          <Asterik />
                        </label>
                        <div className="input-group has-validation iconWithText">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={userCreds.confirmPassword || ""}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="ReEnter Password "
                          />
                          <span
                            className="icn position-absolute pointer"
                            style={{ left: "unset", right: "10px" }}
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? <CloseEye /> : <OpenEye />}
                          </span>
                        </div>
                        {errors.confirmPassword && (
                          <p className="errorMsg">*{errors.confirmPassword}</p>
                        )}
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
