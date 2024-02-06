import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { parseCamelKey } from "../../../utils/parseKey";
import { handleApiRequest } from "../../../services/handleApiRequest";
import { getAllCountry } from "../../../redux/countryAndCity/thunk";
import PhoneInput from "react-phone-input-2";
import SelectBox from "../../../components/selectBox";
import { getUserProfile, updateProfile } from "../../../redux/profile/thunk";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const navigate = useNavigate();
  const { userProfile } = useSelector((state) => state.profile);
  const { allCountries } = useSelector((state) => state.countryAndCity);

  const [newProfile, setNewProfile] = useState({});
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const handleEditProfile = () => {
    setUpdatingProfile(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserProfile = async () => {
    await handleApiRequest(getUserProfile);
  };

  const handleUpdateProfile = async () => {
    const request = { ...newProfile };
    const response = await handleApiRequest(updateProfile, request);
    console.log("response", response);
    if (response.status) {
      handleUserProfile();
    }
    setUpdatingProfile(false);
  };

  const handleCountryList = async () => {
    await handleApiRequest(getAllCountry);
  };

  useEffect(() => {
    if (userProfile.data) {
      setNewProfile(userProfile.data);
      handleCountryList();
    }
  }, [userProfile]);

  // console.log("userProfile", userProfile);
  // console.log("allCountries", allCountries);
  // console.log("newProfile", newProfile);

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <Button variant="danger" onClick={() => navigate("/cars/sell")}>
          Post an Advert
        </Button>
        {!updatingProfile ? (
          <Button variant="danger" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        ) : (
          <Button variant="danger" onClick={handleUpdateProfile}>
            Update Profile
          </Button>
        )}
      </div>
      <Row className="align-items-center">
        <Col sm={3}>
          <h6>Name</h6>
        </Col>
        <Col lg={9}>
          <input
            className="profileInput form-control my-2"
            type="text"
            readOnly={!updatingProfile}
            maxLength={15}
            name={"name"}
            value={newProfile.name}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col sm={3}>
          <h6>Email</h6>
        </Col>
        <Col lg={9}>
          <input
            className="profileInput form-control my-2"
            type="email"
            readOnly={!updatingProfile}
            name={"email"}
            value={newProfile.email}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="align-items-center my-2">
        <Col sm={3}>
          <h6>Mobile</h6>
        </Col>
        <Col lg={9}>
          <PhoneInput
            className="phoneInput"
            disabled={!updatingProfile}
            value={newProfile.mobile}
            onChange={(value, country, e, formattedValue) =>
              setNewProfile((prev) => ({ ...prev, mobile: formattedValue }))
            }
          />
        </Col>
      </Row>
      <Row className="align-items-center my-2">
        <Col sm={3}>
          <h6>Whatsapp</h6>
        </Col>
        <Col lg={9}>
          <PhoneInput
            className="phoneInput"
            disabled={!updatingProfile}
            country="gh"
            value={newProfile.whatsapp}
            onChange={(value, country, e, formattedValue) =>
              setNewProfile((prev) => ({ ...prev, whatsapp: formattedValue }))
            }
          />
        </Col>
      </Row>
      <Row className="align-items-center my-2">
        <Col sm={3}>
          <h6>Country</h6>
        </Col>
        <Col lg={9}>
          <SelectBox
            styles={{
              container: (baseStyle) => ({ ...baseStyle, height: 45 }),
              control: (baseStyle) => ({ ...baseStyle, height: "100%" }),
            }}
            isDisabled={!updatingProfile}
            options={allCountries.data?.items}
            getOptionValue={(option) => option._id}
            getOptionLabel={(option) => option.name}
            value={newProfile.country}
            onChange={(selected) => setNewProfile((prev) => ({ ...prev, country: selected }))}
          />
        </Col>
      </Row>
      <Row className="align-items-center my-2">
        <Col sm={3}>
          <h6>user Type</h6>
        </Col>
        <Col lg={9}>
          <SelectBox
            styles={{
              container: (baseStyle) => ({ ...baseStyle, height: 45 }),
              control: (baseStyle) => ({ ...baseStyle, height: "100%" }),
            }}
            isDisabled={!updatingProfile}
            options={[
              { value: "dealer", label: "Dealer" },
              { value: "private", label: "Private" },
            ]}
            value={
              typeof newProfile.userType === "object"
                ? newProfile.userType
                : typeof newProfile.userType === "string"
                ? { value: newProfile.userType, label: parseCamelKey(newProfile.userType) }
                : ""
            }
            onChange={(selected) => setNewProfile((prev) => ({ ...prev, userType: selected }))}
          />
        </Col>
      </Row>
    </div>
  );
}
