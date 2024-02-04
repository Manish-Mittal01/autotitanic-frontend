import React, { useRef, useState, useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import { IoMdShare } from "react-icons/io";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import { isArray } from "../../../utils/dataTypes";
import SharePop from "./sharePop";

const OverlayCarousal = ({ media, isFeatured }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [action, setAction] = useState(null);

  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (slideIndex) => setCurrentSlide(slideIndex),
  };

  const settingsThumbnails = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const handleSlideChange = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div>
      <Slider ref={sliderRef} {...settingsMain}>
        {media?.map((item, index) => (
          <div key={index} className="position-relative">
            {item.type?.includes("image") ? (
              <img src={item.url} alt={`Slide ${index}`} className="detailCrouselImage" />
            ) : (
              <ReactPlayer url={item.url} className="detailCrouselImage" />
            )}
            <p className="watermark">AutoTitanic</p>
            {/* <IoMdShare
              className="shareIcon pointer"
              onClick={() => {
                setAction({ type: "sharePost" });
              }}
            /> */}
            {/* {isFeatured && <FaStar className="starIcon" style={{ left: 0, top: 0 }} />} */}
          </div>
        ))}
      </Slider>

      <Slider {...settingsThumbnails} className="thumbs">
        {media?.map((item, index) => (
          <div key={index} onClick={() => handleSlideChange(index)}>
            <img
              src={item.url}
              alt={`Thumbnail ${index}`}
              className="detailsCrouselThumbnailImage"
            />
          </div>
        ))}
      </Slider>

      {action?.type === "sharePost" && <SharePop action={action} setAction={setAction} />}
    </div>
  );
};

export default OverlayCarousal;
