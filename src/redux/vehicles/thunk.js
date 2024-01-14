import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getVehicleCount = createAsyncThunk(
  "vehicles/getVehicleCount",
  async (filters, Thunk) => {
    try {
      const response = await axios.post(`getResultCount`, filters);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getVehicleList = createAsyncThunk(
  "vehicles/getVehicleList",
  async (filters, Thunk) => {
    try {
      const response = await axios.post(`AllVehicles`, filters);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const addVehicle = createAsyncThunk("vehicles/addVehicle", async (details, Thunk) => {
  try {
    const response = await axios.post(`addVehicle`, details);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});
