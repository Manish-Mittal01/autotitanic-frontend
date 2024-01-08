import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginOrRegisterUser = createAsyncThunk(
  "auth/register",
  async (userDetails, Thunk) => {
    try {
      const response = await axios.post(`users/access`, userDetails);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/login",
  async (userDetails, Thunk) => {
    try {
      const response = await axios.post(`users/login`, userDetails);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot/password",
  async (userDetails, Thunk) => {
    try {
      const response = await axios.post(`users/forgot/password`, userDetails);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const resendForgotOtp = createAsyncThunk(
  "auth/resend/otp",
  async (userDetails, Thunk) => {
    try {
      const response = await axios.post(`users/resend/otp`, userDetails);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verify/otp",
  async (userDetails, Thunk) => {
    try {
      const response = await axios.post(`users/verify/otp`, userDetails);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset/password",
  async (userDetails, Thunk) => {
    try {
      const response = await axios.post(`users/reset/password`, userDetails);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, Thunk) => {
  try {
    const response = await axios.post("user/logout");
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async (passwordDetails, Thunk) => {
    try {
      const response = await axios.post("users/set/password", passwordDetails, {
        headers: {
          "x-access-token": passwordDetails.token,
        },
      });
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
