import axios from "axios";
import { REACT_APP_API_BASE_URL, REACT_APP_API_VERSION } from "../config";
import { logoutUser } from "../redux/auth/slice";
import { store } from "../redux/store";

const baseURL = REACT_APP_API_BASE_URL + REACT_APP_API_VERSION;

export default function runAxiosSetup({ token, adminId, headers = {} }) {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers = {
    Accept: "application/json",
    "x-access-token": token ? token : undefined,
    customerid: adminId,
    ...headers,
  };

  axios.interceptors.response.use(
    function (response) {
      return response;
      // if (response.data.isSuccess) {
      //   return response;
      // } else if (!response.data.isSuccess) {
      //   var errorObject = {};
      //   if (response) {
      //     if (response.data?.message === "Not Authorized!") {
      //       errorObject.message = "Not Authorized!!";
      //       errorObject.code = "X_SERVER_ERROR";
      //       errorObject.type = 0;
      //       // return store.dispatch(logout());
      //     }
      //     //  else {
      //     //   errorObject.message = response.data.message || "Server Error !!!";
      //     //   errorObject.code = response.data.code || "X_SERVER_ERROR";
      //     //   errorObject.type = response.status;
      //     //   errorObject.data = response.data;
      //     // }
      //   }
      //   return Promise.reject(errorObject);
      // }
    },
    function (error) {
      console.log("my axios error", error.response, error.code);
      var errorObject = {};
      if (
        error.response?.data.message === "Token expired" ||
        error.response?.data.message === "Unauthorized"
      ) {
        errorObject.message = "Session expired";
        errorObject.code = error.response.data.code;
        errorObject.type = error.response.status;
        errorObject.data = error.response.data;

        store.dispatch(logoutUser({}));
      } else if (error.response) {
        errorObject.message = error.response.data.message || "Server Error!!!";
        errorObject.code = error.response.data.code || "X_SERVER_ERROR";
        errorObject.type = error.response.status;
        errorObject.data = error.response.data;
      } else if (error.code === "X_NETWORK_ERROR") {
        errorObject.message = "Network Error!!!";
        errorObject.code = "X_NETWORK_ERROR";
        errorObject.type = 0;
      } else {
        errorObject.message = error.message || "Unknown Error!!!";
        errorObject.code = error.code || "X_UNKNOWN_ERROR";
        errorObject.type = error.type || 0;
        errorObject.data = error.data || null;
      }
      return Promise.reject(errorObject);
    }
  );
}
