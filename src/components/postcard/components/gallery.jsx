import React, { useEffect, useRef } from "react";
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
  const iframeRef = useRef();
  const dispatch = useDispatch();
  const { gallery } = useSelector((state) => state.vehicles);

  const handleCloseGallery = () => {
    dispatch(mediaGallery({}));
  };

  // useEffect(() => {
  //   console.log("content 1", $("#Iframe1").contents());
  //   console.log("content 2", $("#Iframe1").contents().find("img"));
  //   $("#Iframe1").contents().find("img").css({
  //     width: "100%",
  //     height: "90%",
  //   });
  // }, []);

  //   console.log("gallery", gallery);

  const handleIframeLoad = () => {
    // Access the content document when the iframe has loaded
    const iframeDocument = iframeRef.current.contentDocument;

    // You can now manipulate the content inside the iframe
    // Apply CSS to the img element, for example:
    const imgElement = iframeDocument.querySelector("img");
    if (imgElement) {
      imgElement.style.border = "2px solid red"; // Add your CSS styles here
    }
  };

  return (
    <div className="galleryContainer">
      {/* <iframe
        id="Iframe1"
        onLoad={handleIframeLoad}
        ref={iframeRef}
        src={
          "https://firebasestorage.googleapis.com/v0/b/autotitanic-fde97.appspot.com/o/autotitanic%2FScreenshot%20(48).png%2F1705216438454?alt=media&token=4c8a43fd-2a3f-4b83-abc4-f1f2e20d2ae8"
        }
        className="img-fluid w-100 h-100 iframeElement"
        border="none"
        scrolling="no"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      /> */}
      <Slider {...settings} style={{ position: "relative" }}>
        {isArray(gallery).map((media) => (
          <>
            {media?.type?.includes("image") ? (
              <img src={media?.url} style={{ height: "100%" }} />
            ) : (
              <ReactPlayer url={"http://www.example.com/waterfall-video.mp4"} />
            )}
            {/* <p className="postion-absolute">X</p> */}
          </>
        ))}
      </Slider>
    </div>
  );
}
