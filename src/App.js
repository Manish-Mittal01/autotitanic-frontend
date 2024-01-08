import { useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import { useSelector } from "react-redux";
import "./Assets/css/style.css";
import "./Assets/css/hover.css";
import "./Assets/css/Main.css";
import runAxiosSetup from "./helpers/run-axios-setup";
import LoadIndicator from "./components/loader";
import MyLayout from "./layout/myLayout";
import Home from "./pages/home";
import VehiclesList from "./pages/vehiclesList";
import ContentPage from "./pages/contentPages";
import ContactUs from "./pages/contentPages/contact";
import { categories } from "./utils";
import NavComponent from "./pages/navComponent";
import AllFilters from "./pages/allFIlters";

function App() {
  const { pathname } = useLocation();
  const naviagte = useNavigate();
  const { loggedinUser } = useSelector((state) => state.auth);
  const token = loggedinUser?.data?.token;
  const adminId = loggedinUser?.data?.id;

  useLayoutEffect(() => {
    runAxiosSetup({ token, adminId });
  }, [token, adminId]);

  useEffect(() => {
    AOS.init();
    if (pathname === "/") {
      naviagte("/home");
    }
  }, []);

  return (
    <>
      <LoadIndicator />
      <Routes>
        <Route path="/" element={<MyLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/cars" element={<VehiclesList />} />
          <Route path="/page/:pageId" element={<ContentPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/allFilters" element={<AllFilters />} />
          {categories.map((category) => (
            <Route
              key={category.label}
              path={`${category.label}/:categoryFilter`}
              element={<NavComponent />}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
