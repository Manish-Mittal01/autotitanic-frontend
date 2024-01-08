import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCountry = createAsyncThunk(
  "countryAndCity/getAllCountry",
  async (filters, Thunk) => {
    try {
      const response = await axios.get(`allCountry`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getAllCity = createAsyncThunk(
  "countryAndCity/getAllCity",
  async (countryId, Thunk) => {
    try {
      const response = await axios.get(`allCities/${countryId}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
