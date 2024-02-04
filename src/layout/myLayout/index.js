import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/sidebar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "../../utils/dataTypes";
import Gallery from "../../components/postcard/components/gallery";
import { mediaGallery } from "../../redux/vehicles/slice";

const MyLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { gallery } = useSelector((state) => state.vehicles);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (pathname !== "/home") {
      dispatch(mediaGallery({}));
    }
  }, [pathname]);

  return (
    <>
      {pathname === "/home" && isArray(gallery).length > 0 ? (
        <Gallery />
      ) : (
        <>
          {sidebar && <Navbar sidebar={sidebar} setSidebar={setSidebar} />}
          <main className="bg-white">
            <Header sidebar={sidebar} setSidebar={setSidebar} />
            <div className="mainWrapper">
              <Outlet />
            </div>
            <Footer />
          </main>
        </>
      )}
    </>
  );
};

export default MyLayout;
