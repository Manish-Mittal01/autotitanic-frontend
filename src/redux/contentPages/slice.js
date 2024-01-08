import { createSlice } from "@reduxjs/toolkit";
import { getContentPageList, getPageContent } from "./thunk";

const initialState = {
  pageContent: {},
  contentPageList: {},
};

const contentPageSlice = createSlice({
  name: "contentPageSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPageContent.pending, (state, action) => {})
      .addCase(getPageContent.fulfilled, (state, action) => {
        state.pageContent = action.payload;
      })
      .addCase(getPageContent.rejected, (state, action) => {});
    builder
      .addCase(getContentPageList.pending, (state, action) => {})
      .addCase(getContentPageList.fulfilled, (state, action) => {
        state.contentPageList = action.payload;
      })
      .addCase(getContentPageList.rejected, (state, action) => {});
  },
});

export default contentPageSlice.reducer;
