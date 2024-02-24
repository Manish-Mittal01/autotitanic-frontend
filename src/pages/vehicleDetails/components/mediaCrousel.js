import React, { useRef, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import Slider from "react-slick";
import { isArray } from "../../../utils/dataTypes";
import SharePop from "./sharePop";
import Gallery from "../../../components/gallery";
import { manageGallery } from "../../../redux/common/slice";
import { useDispatch, useSelector } from "react-redux";

const OverlayCarousal = ({ media, isFeatured }) => {
  const sliderRef = useRef(null);
  const childrenSliderRef = useRef(null);
  const dispatch = useDispatch();
  const { galleryMedia } = useSelector((state) => state.common);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [action, setAction] = useState(null);

  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (slideIndex) => {
      childrenSliderRef.current.slickGoTo(slideIndex);
      setCurrentSlide(slideIndex);
    },
  };

  const settingsThumbnails = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const handleSlideChange = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  const handleGallery = (media) => {
    dispatch(manageGallery(media));
  };

  // console.log("currentSlide", currentSlide);
  // console.log("galleryMedia", galleryMedia);

  return (
    <div>
      <Slider ref={sliderRef} {...settingsMain}>
        {isArray(media)
          .filter((item) => item.type?.includes("image"))
          ?.map((item, index) => (
            <div
              key={index}
              className="detailsPageMainImage position-relative"
              onClick={() => handleGallery(media)}
            >
              <img src={item.url} alt={`Slide ${index}`} className="detailCrouselImage pointer" />
              <p className="watermark">AutoTitanic</p>
            </div>
          ))}
      </Slider>

      <Slider ref={childrenSliderRef} {...settingsThumbnails} className="thumbs">
        {isArray(media)
          .filter((item) => item.type?.includes("image"))
          ?.map((item, index) => (
            <div
              key={index}
              className={`${index === currentSlide ? "selectedThum" : ""}`}
              onClick={() => handleSlideChange(index)}
            >
              <img
                src={item.url}
                alt={`Thumbnail ${index}`}
                className="detailsCrouselThumbnailImage"
              />
            </div>
          ))}
      </Slider>

      {action?.type === "sharePost" && <SharePop action={action} setAction={setAction} />}
      {isArray(galleryMedia).length > 0 && <Gallery media={media} />}
    </div>
  );
};

export default OverlayCarousal;
