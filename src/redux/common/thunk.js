import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadFile = createAsyncThunk("common/fileUpload", async (file, Thunk) => {
  try {
    const response = await axios.post(`uploadFiles`, file);
    return response?.data;
  } catch (error) {
    return Thunk.rejectWithValue(error);
  }
});
