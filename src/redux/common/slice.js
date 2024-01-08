import { createSlice } from "@reduxjs/toolkit";
import { uploadFile } from "./thunk";

const initialState = {
  uploadedFile: {},
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: initialState,
  reducers: {
    emptyFile: (state, action) => {
      state.uploadedFile = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state, action) => {})
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploadedFile = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {});
  },
});

export const { emptyFile } = commonSlice.actions;
export default commonSlice.reducer;
