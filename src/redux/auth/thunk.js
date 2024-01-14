import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (userDetails, Thunk) => {
  try {
    const response = await axios.post(`login`, userDetails);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const register = createAsyncThunk("auth/register", async (userDetails, Thunk) => {
  try {
    const response = await axios.post(`register`, userDetails);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const sendOtp = createAsyncThunk("auth/sendotp", async (email, Thunk) => {
  try {
    const response = await axios.post(`sendotp`, email);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (userDetails, Thunk) => {
  try {
    const response = await axios.post(`resetPassword`, userDetails);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, Thunk) => {
  try {
    const response = await axios.post("user/logout");
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});
