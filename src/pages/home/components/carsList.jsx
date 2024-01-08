import React, { memo, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import PostCard from "../../../components/postcard";
import { getVehicleList } from "../../../redux/vehicles/thunk";
import { handleApiRequest } from "../../../services/handleApiRequest";

function CarsList() {
  var settings = {
    className: "slider variable-width",
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const vehiclesList = useSelector((state) => state.vehicles.vehiclesList);

  const handleCarsList = async () => {
    await handleApiRequest(getVehicleList, { paginationDetails: { page: 1, limit: 200 } });
  };

  useEffect(() => {
    handleCarsList();
  }, []);

  return (
    <>
      <h3 className="my-2 text-center text-danger">Featured Cars</h3>

      {Array.from({ length: 3 }).map((_, i) => (
        <Row key={i + "parent"} className="align-items-center justify-content-between">
          <div className="homePostRow">
            {Array.from({ length: 2 }).map((_, ind) => {
              return (
                <Row key={ind + "child"}>
                  <Col xs={12}>
                    <Slider {...settings}>
                      {vehiclesList.data?.items.slice(0 * 20, 0 * 20 + 20).map((post) => (
                        <PostCard key={1} post={post} />
                      ))}
                    </Slider>
                  </Col>
                </Row>
              );
            })}
          </div>
          <div
            className={`fullSizeAddContainer me-3 d-none d-xl-flex ms-0`}
            style={{ width: 160, height: 600 }}
          >
            Add Container
            <br />
            (160 x 600)
          </div>
        </Row>
      ))}

      <div className="fullSizeAddContainer" style={{ width: 980, height: 120 }}>
        Add Container
        <br />
        (980 x 120)
      </div>

      <h3 className="my-2 text-center">Recently Posted Cars</h3>
      {Array.from({ length: 6 }).map((_, i) => (
        <Row key={i + "parent"} className="align-items-center justify-content-between">
          <Col xs={12} xl={10} className="homePostRow">
            {Array.from({ length: 2 }).map((_, ind) => (
              <Row key={ind + "child"}>
                <Col>
                  <Slider {...settings}>
                    {vehiclesList.data?.items.slice(0 * 20, 0 * 20 + 20).map((post) => (
                      <PostCard key={1} post={post} />
                    ))}
                  </Slider>
                </Col>
              </Row>
            ))}
          </Col>
          <Col
            xl={2}
            className={`fullSizeAddContainer me-3 d-none d-xl-flex ms-0`}
            style={{ width: 160, height: 600 }}
          >
            Add Container
            <br />
            (160 x 600)
          </Col>
        </Row>
      ))}
    </>
  );
}

export default memo(CarsList);
