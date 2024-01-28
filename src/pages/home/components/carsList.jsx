import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import OwlCarousel from "react-owl-carousel";
import { useSelector } from "react-redux";
import PostCard from "../../../components/postcard";
import { getFeaturedList, getRecentList, getVehicleList } from "../../../redux/vehicles/thunk";
import { handleApiRequest } from "../../../services/handleApiRequest";

function CarsList() {
  var settings = {
    className: "slider variable-width",
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 40000,
    cssEase: "linear",
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
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

  const setting2 = {
    className: "owl-theme",
    loop: true,
    autoplay: true,
    nav: true,
    margin: 10,
    items: 5,
    dots: false,
    lazyLoad: true,
    autoplayTimeout: 4000,
    slideBy: 5,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1400: {
        items: 5,
      },
    },
  };

  const featuredList = useSelector((state) => state.vehicles.featuredList);
  const recentList = useSelector((state) => state.vehicles.recentList);

  const handleRecentList = async () => {
    const request = {
      filters: {
        isFeatured: true,
      },
      paginationDetails: { page: 1, limit: 240 },
    };
    await handleApiRequest(getFeaturedList, request);
  };

  const handleFeaturedList = async () => {
    const request = {
      paginationDetails: { page: 1, limit: 180, sortBy: "createdAt", order: -1 },
    };
    await handleApiRequest(getRecentList, request);
  };

  const splitList = useCallback(
    (list = [], rows, rowSize) => {
      const myList = [...list];
      const newList = [];

      for (let size = 0; size <= rows; size++) {
        if (myList?.length >= rowSize) {
          newList.push(myList.splice(0, rowSize));
        } else if (myList?.length > 0) {
          newList.push(myList.splice(0));
        }
      }
      return newList;
    },
    [featuredList, recentList]
  );

  useEffect(() => {
    handleRecentList();
    handleFeaturedList();
  }, []);

  console.log("recentList", recentList);
  console.log("splitList", splitList(recentList.data?.items, 4, 5));

  // console.log("featuredList", featuredList);

  return (
    <>
      <h3 className="my-2 text-center text-danger">Featured Cars</h3>
      {splitList(featuredList.data?.items, 3, 60).map((rows, i) => (
        <Row key={i + "parent"} className="align-items-center justify-content-between">
          <div className="homePostRow">
            {splitList(rows, 2, 30).map((row, ind) => {
              return (
                <Row key={ind + "child"}>
                  <Col xs={12}>
                    {/* <OwlCarousel {...setting2}>
                      {rows.slice(0 * 20, 0 * 20 + 20).map((post) => (
                        <PostCard key={1} post={post} />
                      ))}
                    </OwlCarousel> */}
                    <Slider {...settings}>
                      {row.map((post) => (
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
      {splitList(recentList.data?.items, 6, 40).map((_, i) => (
        <Row key={i + "parent"} className="align-items-center justify-content-between">
          <Col xs={12} xl={10} className="homePostRow">
            {Array.from({ length: 2 }).map((_, ind) => (
              <Row key={ind + "child"}>
                <Col>
                  {/* <OwlCarousel {...setting2}>
                    {recentList.data?.items.slice(0 * 20, 0 * 20 + 20).map((post, i) => (
                      <PostCard key={i} post={post} />
                    ))}
                  </OwlCarousel> */}
                  <Slider {...settings}>
                    {recentList.data?.items.slice(0 * 20, 0 * 20 + 20).map((post, i) => (
                      <PostCard key={i} post={post} />
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
