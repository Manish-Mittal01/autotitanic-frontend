import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllContact = createAsyncThunk(
  "contactus/getAll",
  async (filters, Thunk) => {
    try {
      const queryParams = [];

      if (filters?.page) {
        queryParams.push(`pageNo=${filters.page}`);
      }
      if (filters?.limit) {
        queryParams.push(`pageSize=${filters.limit}`);
      }
      if (filters?.order) {
        queryParams.push(`order=${filters.order}`);
      }
      if (filters?.orderBy) {
        queryParams.push(`orderBy=${filters.orderBy}`);
      }
      if (filters?.serverPaging) {
        queryParams.push(`serverPaging=${filters.serverPaging}`);
      }
      if (filters?.search) {
        queryParams.push(`search=${filters.search}`);
      }
      const query = queryParams.join("&");

      const response = await axios.get(`contactus/${query ? `?${query}` : ""}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getContactusDetails = createAsyncThunk(
  "contactus/getDetails",
  async (contactId, Thunk) => {
    try {
      const response = await axios.get(`contactus/${contactId}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const updateContactusDetails = createAsyncThunk(
  "contactus/update",
  async (contactusDetails, Thunk) => {
    try {
      const response = await axios.put(
        `contactus/${contactusDetails.id}`,
        contactusDetails
      );
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const deleteContactus = createAsyncThunk(
  "contactus/delete",
  async (contactusId, Thunk) => {
    try {
      const response = await axios.delete(`contactus/${contactusId}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const contactUs = createAsyncThunk(
  "profile/contactus",
  async (details, Thunk) => {
    try {
      const response = await axios.post(`contactus`, details);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
