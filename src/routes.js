import Login from "./pages/AuthPage/Login/Index";
import Register from "./pages/AuthPage/register";
import ResetPassword from "./pages/AuthPage/resetPassword";
import AllFilters from "./pages/allFIlters";
import ContentPage from "./pages/contentPages";
import ContactUs from "./pages/contentPages/contact";
import Home from "./pages/home";
import VehiclesList from "./pages/vehiclesList";

export const publicRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/cars",
    element: <VehiclesList />,
  },
  {
    path: "/page/:pageId",
    element: <ContentPage />,
  },
  {
    path: "/contactus",
    element: <ContactUs />,
  },
  {
    path: "/allFilters",
    element: <AllFilters />,
  },
];

export const privateRoutes = [
  {
    path: "/home",
    element: <Home />,
  },
];

export const authRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
];
