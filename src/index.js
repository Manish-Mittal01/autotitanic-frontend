import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import "hover.css/css/hover-min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-input-2/lib/style.css";
import "./Assets/css/style.css";
import "./Assets/css/hover.css";
import "./Assets/css/Main.css";
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import { persistor, store } from "./redux/store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ScrollToTop />
        <ToastContainer
          theme="colored"
          // hideProgressBar
        />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
