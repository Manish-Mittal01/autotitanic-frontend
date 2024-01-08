import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPageContent = createAsyncThunk(
  "contentPage/getPageContent",
  async (pageId, Thunk) => {
    try {
      const response = await axios.get(`getContentPage/${pageId}`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);

export const getContentPageList = createAsyncThunk(
  "contentPage/getContentPageList",
  async (filters, Thunk) => {
    try {
      const response = await axios.get(`getContentPageList`);
      return response?.data;
    } catch (error) {
      return Thunk.rejectWithValue(error);
    }
  }
);
