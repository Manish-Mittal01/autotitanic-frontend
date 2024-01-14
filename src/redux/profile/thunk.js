import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserProfile = createAsyncThunk("profile/getUserProfile", async (userId, Thunk) => {
  try {
    const response = await axios.get(`getUserProfile`);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (passworddetails, Thunk) => {
    try {
      const response = await axios.put(
        `users/update/password/${passworddetails.userId}`,
        passworddetails
      );
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileDetails, Thunk) => {
    try {
      const response = await axios.put(
        `users/update/profile/${profileDetails.userId}`,
        profileDetails
      );
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
