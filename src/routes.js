import SuccessScreen from "./components/successScreen";
import Login from "./pages/AuthPage/Login/Index";
import Register from "./pages/AuthPage/register";
import ResetPassword from "./pages/AuthPage/resetPassword";
import AllFilters from "./pages/allFIlters";
import CompareList from "./pages/compareList";
import ContentPage from "./pages/contentPages";
import ContactUs from "./pages/contentPages/contact";
import Home from "./pages/home";
import Profile from "./pages/profile";
import ChangePassword from "./pages/profile/components/changePassword";
import MyItems from "./pages/profile/components/myItems";
import MyProfile from "./pages/profile/components/profile";
import Wishlist from "./pages/profile/components/wishlist";
import VehicleDetails from "./pages/vehicleDetails";
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
  {
    path: "/details/:id",
    element: <VehicleDetails />,
  },
];

export const privateRoutes = [
  {
    path: "/CompareList",
    element: <CompareList />,
  },
  {
    path: "/profile",
    element: <Profile Component={MyProfile} />,
  },
  {
    path: "/successMsg",
    element: <SuccessScreen />,
  },
  {
    path: "/my-wishlist",
    element: <Profile Component={Wishlist} />,
  },
  {
    path: "/my-items",
    element: <Profile Component={MyItems} />,
  },
  {
    path: "/change-password",
    element: <Profile Component={ChangePassword} />,
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
