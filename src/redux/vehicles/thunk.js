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

export const getFeaturedList = createAsyncThunk(
  "vehicles/getFeaturedList",
  async (filters, Thunk) => {
    try {
      const response = await axios.post(`AllVehicles`, filters);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getRecentList = createAsyncThunk("vehicles/getRecentList", async (filters, Thunk) => {
  try {
    const response = await axios.post(`AllVehicles`, filters);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const getRelatedVehicles = createAsyncThunk(
  "vehicles/getRelatedVehicles",
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

export const getVehicleDetails = createAsyncThunk(
  "vehicles/getVehicleDetails",
  async (id, Thunk) => {
    try {
      const response = await axios.get(`vehicleDetails/${id}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const updateVehicle = createAsyncThunk("vehicles/updateVehicle", async (details, Thunk) => {
  try {
    const response = await axios.post(`updateVehicle/${details._id}`, details);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const addToCompare = createAsyncThunk("vehicles/addToCompare", async (vehicle, Thunk) => {
  try {
    const response = await axios.post(`addToCompare`, vehicle);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const getCompareList = createAsyncThunk(
  "vehicles/getCompareList",
  async (vehicle, Thunk) => {
    try {
      const response = await axios.get(`getCompareList`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const removeCompareListItem = createAsyncThunk(
  "vehicles/removeCompareListItem",
  async (id, Thunk) => {
    try {
      const response = await axios.post(`removeCompareListItem`, id);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk("vehicles/addToWishlist", async (id, Thunk) => {
  try {
    const response = await axios.post(`addToWishlist`, id);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const getWishlist = createAsyncThunk("vehicles/getWishlist", async (vehicle, Thunk) => {
  try {
    const response = await axios.get(`getWishlist`);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});

export const removeWishlistItem = createAsyncThunk(
  "vehicles/removeWishlistItem",
  async (id, Thunk) => {
    try {
      const response = await axios.post(`removewishlistItem`, id);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const makeOffer = createAsyncThunk("vehicles/makeOffer", async (details, Thunk) => {
  try {
    const response = await axios.post(`makeOffer`, details);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});
