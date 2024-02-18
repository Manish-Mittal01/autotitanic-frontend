import { useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import AOS from "aos";
import { useSelector } from "react-redux";
import runAxiosSetup from "./helpers/run-axios-setup";
import LoadIndicator from "./components/loader";
import MyLayout from "./layout/myLayout";
import { categories } from "./utils";
import NavComponent from "./pages/navComponent";
import { authRoutes, privateRoutes, publicRoutes } from "./routes";
import Gallery from "./components/gallery";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { loggedinUser } = useSelector((state) => state.auth);
  const token = loggedinUser?.data?.token;
  const adminId = loggedinUser?.data?.id;

  useLayoutEffect(() => {
    runAxiosSetup({ token, adminId });
  }, [token, adminId]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    // if (loggedinUser?.data?.token && pathname === "/login") navigate("/profile");
    if (pathname === "/") {
      navigate("/home");
    }
  }, [loggedinUser]);

  // console.log("loggedinUser", loggedinUser);
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
            <Route
              key={category.value}
              path={`${category.value}/:categoryFilter`}
              element={<NavComponent />}
            />
          ))}
          <Route path={"*"} element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
