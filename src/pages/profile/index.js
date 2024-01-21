import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { handleApiRequest } from "../../services/handleApiRequest";
import { useSelector } from "react-redux";
import { isArray } from "../../utils/dataTypes";
import { getUserProfile } from "../../redux/profile/thunk";
import Sidebar from "./components/sidebar";
import Wishlist from "./components/wishlist";

export default function Profile({ Component }) {
  const { userProfile } = useSelector((state) => state.profile);

  // console.log("userProfile", userProfile);

  return (
    <>
      <section>
        <div className="d-flex justify-content-between">
          <div
            className="fullSizeAddContainer d-none d-xl-flex"
            style={{ width: 728, height: 90, marginInline: 0 }}
          >
            Add Container
            <br />
            (728 x 90)
          </div>
          <div className="personalAdd">Personal Add</div>
        </div>

        <Row className="my-2">
          <Col lg={3} className="filterBoxWrapper d-none d-lg-block">
            <Sidebar user={userProfile} />
          </Col>

          <Col xs={12} lg={9} className="vehicleListContainer">
            {Component ? <Component /> : <Wishlist />}
          </Col>
        </Row>
      </section>
    </>
  );
}
