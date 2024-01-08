import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { ReactComponent as EmailIcon } from "../../Assets/icons/email.svg";
import { ReactComponent as LocationIcon } from "../../Assets/icons/location-filled.svg";
import { ReactComponent as PhoneIcon } from "../../Assets/icons/phone.svg";
import { ReactComponent as FaxIcon } from "../../Assets/icons/fax.svg";
import { ReactComponent as ClockIcon } from "../../Assets/icons/clock.svg";

export default function ContactUs() {
  const [contactDetails, setContactDetails] = useState({});

  const handleChange = (e) => {
    setContactDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section>
        <div className="text-center my-5">
          <p>We’d Love to Hear From You</p>
          <h3>LET'S GET IN TOUCH!</h3>
        </div>
        <Row>
          <Col lg={3} className="contactDetailBox p-2">
            <div>
              <LocationIcon />
              <p className="fw-bold my-2">ADDRESS</p>
              <p className="font-small m-0">220E Front St. Burlington NC 215</p>
            </div>
          </Col>
          <Col lg={3} className="contactDetailBox p-2">
            <div>
              <PhoneIcon />
              <p className="fw-bold my-2">PHONE</p>
              <p className="font-small m-0">(007) 123 456 7890</p>
            </div>
          </Col>
          <Col lg={3} className="contactDetailBox p-2">
            <div>
              <EmailIcon />
              <p className="fw-bold my-2">EMAIL</p>
              <p className="font-small m-0">support@example.com</p>
            </div>
          </Col>
          <Col lg={3} className="contactDetailBox p-2">
            <div>
              <FaxIcon />
              <p className="fw-bold my-2">FAX</p>
              <p className="font-small m-0">(007) 123 456 7890</p>
            </div>
          </Col>
        </Row>

        <Row className="my-5">
          <Col lg={7} className="mx-3">
            <Row>
              <Col lg={4}>
                <input
                  type="text"
                  className="myInput"
                  placeholder="Name*"
                  name="name"
                  value={contactDetails.name}
                  onChange={handleChange}
                />
              </Col>
              <Col lg={4}>
                <input
                  type="text"
                  className="myInput"
                  placeholder="Email*"
                  name="name"
                  value={contactDetails.email}
                  onChange={handleChange}
                />
              </Col>
              <Col lg={4}>
                <input
                  type="text"
                  className="myInput"
                  placeholder="Phone*"
                  name="name"
                  value={contactDetails.phone}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="my-2">
                <textarea
                  className="myInput"
                  rows={7}
                  placeholder="Comment*"
                  name="name"
                  value={contactDetails.comment}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Button variant="danger" className="w-100">
              Send
            </Button>
          </Col>
          <Col lg={4} className="timingBox">
            <p className="fw-bold border-bottom border-danger py-2 my-2 fit-content">
              OPENING HOURS
            </p>
            <Row className="mt-4">
              <Col xs={4}>
                <p>Monday</p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
                <p>Friday</p>
                <p>Saturday</p>
                <p>Sunday</p>
              </Col>
              <Col xs={8}>
                <p>9:00 AM to 9:00 PM</p>
                <p>9:00 AM to 9:00 PM</p>
                <p>9:00 AM to 9:00 PM</p>
                <p>9:00 AM to 9:00 PM</p>
                <p>9:00 AM to 9:00 PM</p>
                <p>9:00 AM to 9:00 PM</p>
                <p>Closed</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </>
  );
}
