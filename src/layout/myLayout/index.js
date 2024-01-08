import React from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/sidebar/Navbar";
import FilterBar from "../../components/sidebar/Filterbar";

const MyLayout = () => {
  const [sidebar, setSidebar] = useState(false);
  const [filterBar, setFilterBar] = useState(false);

  return (
    <>
      {sidebar && <Navbar sidebar={sidebar} setSidebar={setSidebar} />}
      {filterBar && <FilterBar sidebar={filterBar} setSidebar={setFilterBar} />}
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
