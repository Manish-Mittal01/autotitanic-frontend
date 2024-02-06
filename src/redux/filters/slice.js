import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: { country: { value: "", label: "Africa" } },
};

const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState: initialState,
  reducers: {
    selectFilters: (state, action) => {
      return { ...state, filters: { ...state.filters, ...action.payload } };
    },
    resetFilters: (state, action) => {
      return { filters: { country: { value: "", label: "Africa" } } };
    },
  },
  extraReducers: (builder) => {},
});

export const { selectFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
