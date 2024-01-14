import { createSlice } from "@reduxjs/toolkit";
import { getVehicleCount, getVehicleList } from "./thunk";

const initialState = {
  vehiclesList: {},
  vehiclesCount: {},
  gallery: {},
};

const vehiclesSlice = createSlice({
  name: "vehiclesSlice",
  initialState: initialState,
  reducers: {
    mediaGallery: (state, action) => {
      state.gallery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleList.pending, (state, action) => {})
      .addCase(getVehicleList.fulfilled, (state, action) => {
        state.vehiclesList = action.payload;
      })
      .addCase(getVehicleList.rejected, (state, action) => {});
    builder
      .addCase(getVehicleCount.pending, (state, action) => {})
      .addCase(getVehicleCount.fulfilled, (state, action) => {
        state.vehiclesCount = action.payload;
      })
      .addCase(getVehicleCount.rejected, (state, action) => {});
  },
});

export const { mediaGallery } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
