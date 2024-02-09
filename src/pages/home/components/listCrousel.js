import React, { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import PostCard from "../../../components/postcard";

export default function ListCrousel({ dataList = [] }) {
  var settings = {
    className: "slider variable-width",
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 40000,
    cssEase: "linear",
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 2400,
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
    [dataList]
  );

  const sliderItemsCountFix = (settings, itemsCount) => {
    if (!settings.responsive) return settings;
    const responsiveArray = settings.responsive.map((responsiveItem) => {
      const responsive = responsiveItem.settings !== "unslick" && responsiveItem.settings;
      if (!responsive) return;
      const slidesToShow = responsive.slidesToShow || 1;
      const isItemsMoreThanSlidesToShow = itemsCount > slidesToShow;

      return isItemsMoreThanSlidesToShow
        ? responsiveItem
        : {
            ...responsiveItem,
            settings: { ...responsiveItem.settings, slidesToShow: itemsCount },
          };
    });

    return { ...settings, responsive: responsiveArray };
  };

  return (
    <>
      {splitList(dataList, 3, 60).map((rows, i) => {
        return (
          <Row key={i + "parent"} className="align-items-center justify-content-between">
            <Col xs={12} xl={10} className="homePostRow">
              {splitList(rows, 2, 30).map((row, ind) => (
                <Row key={ind + "child"}>
                  <Col xs={12}>
                    <Slider {...sliderItemsCountFix(settings, row.length)}>
                      {row.map((post, i) => (
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
        );
      })}
    </>
  );
}
