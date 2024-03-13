import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as FastforwardIcon } from "../../Assets/icons/fast-forward.svg";
import { ReactComponent as InstagramIcon } from "../../Assets/icons/instagram.svg";
import { ReactComponent as FacebookIcon } from "../../Assets/icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "../../Assets/icons/twitter.svg";
import { ReactComponent as YoutubeIcon } from "../../Assets/icons/youtube.svg";
import { useSelector } from "react-redux";
import { handleApiRequest } from "../../services/handleApiRequest";
import { getContentPageList } from "../../redux/contentPages/thunk";

const Footer = () => {
  const { contentPageList } = useSelector((state) => state.contentPage);

  const hanldePageList = async () => {
    await handleApiRequest(getContentPageList);
  };

  useEffect(() => {
    hanldePageList();
  }, []);

  return (
    <>
      <footer className="mainWrapper bg-white">
        <div className="fullSizeAddContainer">
          Add Container
          <br />
          (930 x 180)
        </div>
        <Row>
          <Col lg={12}>
            <Row>
              <Col lg={3} sm={6} className="socialLink d-flex justify-content-between py-2">
                <p className="m-0">FACEBOOK</p>
                <p className="m-0">
                  <FacebookIcon />
                </p>
              </Col>
              <Col lg={3} sm={6} className="socialLink d-flex justify-content-between py-2">
                <p className="m-0">INSTAGRAM</p>
                <p className="m-0">
                  <InstagramIcon />
                </p>
              </Col>
              <Col lg={3} sm={6} className="socialLink d-flex justify-content-between py-2">
                <p className="m-0">YOUTUBE</p>
                <p className="m-0">
                  <YoutubeIcon />
                </p>
              </Col>
              <Col lg={3} sm={6} className="socialLink d-flex justify-content-between py-2">
                <p className="m-0">TWITTER</p>
                <p className="m-0">
                  <TwitterIcon />
                </p>
              </Col>
            </Row>
          </Col>
          <hr />
          <Col lg="12" className="my-2">
            <Row className="d-flex align-items-start flex-wrap">
              {Array.from({ length: 2 }).map((page, i) => (
                <Col key={i} lg={3} sm={6} className="p-0 ps-2">
                  <ul className="list-unstyled ps-0 mb-0">
                    {i === 0 && (
                      <li className="py-1">
                        <Link to={"contactus"} className="text-dark">
                          <FastforwardIcon />
                          Contact Us
                        </Link>
                      </li>
                    )}
                    {contentPageList.data?.slice(i * 4, i * 4 + 4 + i).map((link) => (
                      <li key={link._id} className="py-1">
                        <Link to={`page/${link._id}`} className="text-dark">
                          <FastforwardIcon />
                          {link.page}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Col>
              ))}
              <Col lg={5}>
                <div
                  className="fullSizeAddContainer my-0 d-none d-xl-flex"
                  style={{ width: 400, height: 200 }}
                >
                  Add Container
                  <br />
                  (400 x 200)
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </footer>

      <Row className="gx-0">
        <Col lg="12" className="py-3 px-0 bg-dark text-white">
          <p className="m-0 text-center">© Copyright 2024 Autotitanic</p>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
