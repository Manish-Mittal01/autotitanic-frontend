import { createSlice } from "@reduxjs/toolkit";
import { getAllCity, getAllCountry } from "./thunk";

const initialState = {
  allCountries: {},
  allCities: {},
};

const countryAndCitySlice = createSlice({
  name: "countryAndCitySlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountry.pending, (state, action) => {})
      .addCase(getAllCountry.fulfilled, (state, action) => {
        state.allCountries = action.payload;
      })
      .addCase(getAllCountry.rejected, (state, action) => {});
    builder
      .addCase(getAllCity.pending, (state, action) => {})
      .addCase(getAllCity.fulfilled, (state, action) => {
        state.allCities = action.payload;
      })
      .addCase(getAllCity.rejected, (state, action) => {});
  },
});

export default countryAndCitySlice.reducer;
