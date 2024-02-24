import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMake = createAsyncThunk("makeAndModel/getAllMake", async (filters, Thunk) => {
  try {
    const queryParams = [];
    if (filters?.type) {
      queryParams.push(`type=${filters.type}`);
    }

    const query = queryParams.join("&");
    const response = await axios.get(`allMake/${query ? `?${query}` : ""}`);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const getAllModel = createAsyncThunk("makeAndModel/getAllModel", async (filters, Thunk) => {
  try {
    const response = await axios.get(`allModel/${filters.makeId}?type=${filters.type || "cars"}`);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const getAllVariant = createAsyncThunk(
  "makeAndModel/getAllVariant",
  async (modelId, Thunk) => {
    try {
      const response = await axios.get(`allVariant/${modelId}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
