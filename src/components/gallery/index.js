import React, { useEffect } from "react";
import { Col, Nav, Tab } from "react-bootstrap";
import { isArray } from "../../utils/dataTypes";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { manageGallery } from "../../redux/common/slice";
import ReactPlayer from "react-player";

export default function Gallery({ media }) {
  const dispatch = useDispatch();

  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleClose = () => {
    dispatch(manageGallery([]));
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      handleClose();
    };
  }, []);

  console.log("media", media);
  return (
    <div className="x-load-indicator-component bg-dark">
      <div className="text-white d-flex justify-content-end p-2">
        <p
          className="pointer text-white d-flex justify-content-end py-1 px-2 border rounded-pill"
          style={{ width: "fit-content" }}
          onClick={handleClose}
        >
          Close x
        </p>
      </div>
      <div className="py-3">
        <Tab.Container id="left-tabs-example" defaultActiveKey="images">
          <Col lg="6" className="mx-auto border-bottom">
            <Nav variant="pills" className="underLineTab" style={{ flexWrap: "unset " }}>
              <Nav.Item className="w-100">
                <Nav.Link
                  className="pointer w-100 text-white text-center bg-dark"
                  eventKey="images"
                >
                  Images
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="w-100">
                <Nav.Link
                  className="pointer w-100 text-white text-center bg-dark"
                  eventKey="videos"
                >
                  Video
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Tab.Content className="pt-3">
            <Tab.Pane eventKey="images" className="galleryTabPane">
              <div className="d-flex">
                <div className="galleryAdd border">Add Container</div>
                <Col lg="12" className="galleryContainer mx-auto">
                  <Slider {...settingsMain}>
                    {isArray(media)
                      .filter((item) => item.type?.includes("image"))
                      ?.map((item, index) => (
                        <div key={index} className="galleryImageWrapper position-relative">
                          <img
                            src={item.url}
                            alt={`Slide ${index}`}
                            className="detailCrouselImage d-flex algin-items-center"
                            style={{ height: "100%" }}
                          />
                        </div>
                      ))}
                  </Slider>
                </Col>
                <div className="galleryAdd border">Add Container</div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="videos" className="galleryTabPane">
              <div className="d-flex">
                <div className="galleryAdd border">Add Container</div>
                <Col lg="12" className="galleryContainer mx-auto ">
                  {isArray(media).filter((item) => item.type?.includes("video")).length > 0 ? (
                    <Slider {...settingsMain}>
                      {isArray(media)
                        .filter((item) => item.type?.includes("video"))
                        ?.map((item, index) => (
                          <div
                            key={index}
                            className="detailsPageMainImage galleryImageWrapper position-relative"
                          >
                            <ReactPlayer
                              className="react-player mx-auto"
                              url={item.url}
                              height="100%"
                              controls={true}
                            />
                          </div>
                        ))}
                    </Slider>
                  ) : (
                    <h4
                      className="text-white d-flex justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      No video found
                    </h4>
                  )}
                </Col>
                <div className="galleryAdd border">Add Container</div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        {/* <div className="x-overlay" /> */}
        <style>
          {`
      .x-load-indicator-component {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
      }
      .x-load-indicator-component .x-overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      .x-load-indicator-component .x-load-indicator-image {
        height: auto;
        width: 6.60416666vw;
        object-fit: contain;
        z-index: 1;
        padding: 0.20833333vw;
      }

      @media (max-width: 1200px) {
        .x-load-indicator-component .x-load-indicator-image {
            height: auto;
            width: 6.51041666vw;
            object-fit: contain;
            z-index: 1;
            background-color: #ffffff;
            padding: 0.52083333vw;
            border-radius:0.52083333vw;
            box-shadow: 0 0.13020833vw 0.390625vw rgba(0, 0, 0, 0.05),
              0 0.26041666vw 0.13020833vw rgba(0, 0, 0, 0.03), 0 0.13020833vw 0.13020833vw rgba(0, 0, 0, 0.04);
      }

      @media (max-width: 767.88px) {
        .x-load-indicator-component .x-load-indicator-image {
        height: auto;
        width: 13.33333333vw;
        object-fit: contain;
        z-index: 1;
        background-color: #ffffff;
        padding: 1.06666666vw;
        border-radius:1.06666666vw;
        box-shadow: 0 0.26666666vw 0.8vw rgba(0, 0, 0, 0.05),
          0 0.53333333vw 0.26666666vw rgba(0, 0, 0, 0.03), 0 0.26666666vw 0.26666666vw rgba(0, 0, 0, 0.04);
      }
    }
    `}
        </style>
      </div>
    </div>
  );
}
