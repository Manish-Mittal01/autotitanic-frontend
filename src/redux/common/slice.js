import { createSlice } from "@reduxjs/toolkit";
import { uploadFile } from "./thunk";

const initialState = {
  uploadedFile: {},
  showFilterBar: false,
  galleryMedia: [],
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState: initialState,
  reducers: {
    emptyFile: (state, action) => {
      state.uploadedFile = {};
    },
    handleFilterBar: (state, action) => {
      state.showFilterBar = !state.showFilterBar;
    },
    manageGallery: (state, action) => {
      state.galleryMedia = action.payload;
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

export const { emptyFile, handleFilterBar, manageGallery } = commonSlice.actions;
export default commonSlice.reducer;
