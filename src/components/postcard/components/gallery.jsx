import React from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { isArray } from "../../../utils/dataTypes";
import { mediaGallery } from "../../../redux/vehicles/slice";

export default function Gallery() {
  var settings = {
    className: "gallerySlider slider variable-width",
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 40000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const dispatch = useDispatch();
  const { gallery } = useSelector((state) => state.vehicles);

  const handleCloseGallery = () => {
    dispatch(mediaGallery({}));
  };

  //   console.log("gallery", gallery);

  return (
    <div className="galleryContainer">
      <Slider {...settings}>
        {isArray(gallery).map((media) => (
          <>
            {media?.type?.includes("image") ? (
              <img src={media?.url} style={{ height: "100%" }} />
            ) : (
              <ReactPlayer url={"http://www.example.com/waterfall-video.mp4"} />
            )}
          </>
        ))}
      </Slider>
    </div>
  );
}
