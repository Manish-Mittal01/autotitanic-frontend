import { createSlice } from "@reduxjs/toolkit";
import { getAllMake, getAllModel, getAllVariant } from "./thunk";

const initialState = {
  allMakes: {},
  allModels: {},
  allVariants: {},
};

const makeSlice = createSlice({
  name: "makeSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMake.pending, (state, action) => {})
      .addCase(getAllMake.fulfilled, (state, action) => {
        state.allMakes = action.payload;
      })
      .addCase(getAllMake.rejected, (state, action) => {});
    builder
      .addCase(getAllModel.pending, (state, action) => {})
      .addCase(getAllModel.fulfilled, (state, action) => {
        state.allModels = action.payload;
      })
      .addCase(getAllModel.rejected, (state, action) => {});
    builder
      .addCase(getAllVariant.pending, (state, action) => {})
      .addCase(getAllVariant.fulfilled, (state, action) => {
        state.allVariants = action.payload;
      })
      .addCase(getAllVariant.rejected, (state, action) => {});
  },
});

export default makeSlice.reducer;
