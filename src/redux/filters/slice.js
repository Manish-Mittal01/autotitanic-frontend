import { createSlice } from "@reduxjs/toolkit";
import africaFlag from "../../Assets/Images/africa-flag.png";

const initialState = {
  filters: { country: { value: "", label: "Africa", flag: africaFlag } },
};

const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState: initialState,
  reducers: {
    selectFilters: (state, action) => {
      console.log("first", action.payload);
      return { ...state, filters: { ...state.filters, ...action.payload } };
    },
    resetFilters: (state, action) => {
      console.log("second", action.payload);
      return {
        ...state,
        filters: {
          country: { value: "", label: "Africa", flag: africaFlag },
          ...(action.payload || {}),
        },
      };
    },
  },
  extraReducers: (builder) => {},
});

export const { selectFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
