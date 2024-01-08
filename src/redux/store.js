import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfigs = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = (state, action) => {
  const split = action.type?.split("/");
  const stateName = split?.[0];
  const promiseStatus = split[split?.length - 1];
  const promiseTypes = ["pending", "fulfilled", "rejected"];
  var newState = null;
  // console.log("my action", action);
  // console.log("my state", state);
  if (
    split?.length > 2 &&
    promiseTypes?.includes(promiseStatus) &&
    !promiseTypes.includes(stateName)
  ) {
    newState = { ...state };
    if (promiseStatus === "pending") {
      newState[stateName] = {
        ...newState[stateName],
        // showLoader: action.meta.arg?.showLoader === true ? true : false,
        showLoader: action.meta.arg?.showLoader === false ? false : true,
      };
    } else if (promiseStatus === "fulfilled") {
      newState[stateName] = {
        ...newState[stateName],
        showLoader: false,
      };
    } else if (promiseStatus === "rejected") {
      newState[stateName] = {
        ...newState[stateName],
        showLoader: false,
      };
    }
    return appReducer(newState, action);
  } else if (action.type.includes("logout")) {
    return appReducer({ auth: state.auth }, action);
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfigs, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
