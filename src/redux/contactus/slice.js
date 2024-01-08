import { createSlice } from "@reduxjs/toolkit";
import { getAllContact, getContactusDetails } from "./thunk";

const initialState = {
  allContacts: {},
  contactDetails: {},
};

const contactSlice = createSlice({
  name: "contactSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContact.pending, (state, action) => {})
      .addCase(getAllContact.fulfilled, (state, action) => {
        state.allContacts = action.payload;
      })
      .addCase(getAllContact.rejected, (state, action) => {});
    builder
      .addCase(getContactusDetails.pending, (state, action) => {})
      .addCase(getContactusDetails.fulfilled, (state, action) => {
        state.contactDetails = action.payload;
      })
      .addCase(getContactusDetails.rejected, (state, action) => {});
  },
});

export default contactSlice.reducer;
