import { Fragment, useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import AOS from "aos";
import { useSelector } from "react-redux";
import noPage from "./Assets/Images/noPage.png";
import runAxiosSetup from "./helpers/run-axios-setup";
import LoadIndicator from "./components/loader";
import MyLayout from "./layout/myLayout";
import { categories } from "./utils";
import NavComponent from "./pages/navComponent";
import { authRoutes, privateRoutes, publicRoutes } from "./routes";
import AllFilters from "./pages/allFIlters";
import { Button } from "react-bootstrap";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { loggedinUser } = useSelector((state) => state.auth);
  const token = loggedinUser?.data?.token;
  const adminId = loggedinUser?.data?.id;

  useLayoutEffect(() => {
    runAxiosSetup({ token, adminId, navigate });
  }, [token, adminId]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    // if (loggedinUser?.data?.token && pathname === "/login") navigate("/profile");
    if (pathname === "/") {
      navigate("/cars");
    }
  }, [loggedinUser]);

  return (
    <>
      <LoadIndicator />
      <Routes>
        <Route path="/" element={<MyLayout />}>
          {!loggedinUser?.data?.token &&
            authRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}

          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {privateRoutes.map((route) =>
            loggedinUser?.data?.token ? (
              <Route key={route.path} path={route.path} element={route.element} />
            ) : (
              <Route key={route.path} path={route.path} element={<Navigate to="/login" />} />
            )
          )}

          {categories.map((category) => (
            <Fragment key={category.value}>
              <Route path={`${category.value}/allFilters`} element={<AllFilters />} />
              <Route path={`${category.value}/rent/allFilters`} element={<AllFilters />} />
              <Route path={`${category.value}`} element={<NavComponent />} />
              <Route path={`${category.value}/:categoryFilter`} element={<NavComponent />} />
              <Route path={`${category.value}/rent`} element={<NavComponent />} />
              <Route path={`${category.value}/rent/:categoryFilter`} element={<NavComponent />} />
            </Fragment>
          ))}
          <Route path={"*"} element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

export const NoPage = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center my-5">
      <h2>Oops!</h2>
      <img src={noPage} width={"100%"} />
      <h2 className="fw-bold">PAGE NOT FOUND</h2>
      <p className="fw-bold mb-0">Sorry, the page you're looking for doesn't exist.</p>
      <p className="fw-bold">If you think something is broken, report a problem</p>
      <div className="d-flex justify-content-center gap-10">
        <Button className="mainDarkColor rounded-pill" onClick={() => navigate("/cars")}>
          GO HOME
        </Button>
        <Button
          variant=""
          className="outlineBtn rounded-pill"
          onClick={() => navigate("/contactus")}
        >
          CONTACT US
        </Button>
      </div>
    </div>
  );
};
