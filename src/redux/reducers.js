import { combineReducers } from "redux";
import commonSlice from "./common/slice";
import authSlice from "./auth/slice";
import profileSlice from "./profile/slice";
import contactSlice from "./contactus/slice";
import makeSlice from "./makeAndModel/slice";
import countryAndCitySlice from "./countryAndCity/slice";
import vehiclesSlice from "./vehicles/slice";
import contentPageSlice from "./contentPages/slice";
import filtersSlice from "./filters/slice";

const appReducer = combineReducers({
  common: commonSlice,
  auth: authSlice,
  profile: profileSlice,
  contactus: contactSlice,

  makeAndModel: makeSlice,
  countryAndCity: countryAndCitySlice,
  vehicles: vehiclesSlice,
  contentPage: contentPageSlice,
  filters: filtersSlice,
});

export default appReducer;
