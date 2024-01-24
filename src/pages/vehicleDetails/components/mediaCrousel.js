import React, { useRef, useState, useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import { isArray } from "../../../utils/dataTypes";
import ReactPlayer from "react-player";
import Slider from "react-slick";

const OverlayCarousal = ({ media }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

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
            <p className="watermark">Autotitanic</p>
          </div>
        ))}
      </Slider>

      <Slider {...settingsThumbnails}>
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
    </div>
  );
};

export default OverlayCarousal;
