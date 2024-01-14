import { createSlice } from "@reduxjs/toolkit";
import { login } from "./thunk";

const initialState = {
  loggedinUser: {},
  rememberedUser: {},
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    logoutUser: (state, action) => {
      state.loggedinUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {})
      .addCase(login.fulfilled, (state, action) => {
        state.loggedinUser = action.payload;
        state.rememberedUser = action.meta?.arg.remember ? action.meta?.arg : state.rememberedUser;
      })
      .addCase(login.rejected, (state, action) => {});
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
