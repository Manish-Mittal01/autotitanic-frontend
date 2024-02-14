import React from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/sidebar/Navbar";

const MyLayout = () => {
  const [sidebar, setSidebar] = useState(false);

  return (
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
  );
};

export default MyLayout;
