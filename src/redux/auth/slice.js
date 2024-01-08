import { createSlice } from "@reduxjs/toolkit";
import { googleLogin, loginOrRegisterUser, logout } from "./thunk";

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
      .addCase(loginOrRegisterUser.pending, (state, action) => {})
      .addCase(loginOrRegisterUser.fulfilled, (state, action) => {
        state.loggedinUser = action.payload;
        state.rememberedUser = action.meta?.arg.remember
          ? action.meta?.arg
          : state.rememberedUser;
      })
      .addCase(loginOrRegisterUser.rejected, (state, action) => {});
    builder
      .addCase(googleLogin.pending, (state, action) => {})
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loggedinUser = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {});

    builder
      .addCase(logout.pending, (state, action) => {})
      .addCase(logout.fulfilled, (state, action) => {
        state.loggedinUser = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {});
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
