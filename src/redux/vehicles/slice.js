import { createSlice } from "@reduxjs/toolkit";
import {
  getCompareList,
  getVehicleCount,
  getVehicleDetails,
  getVehicleList,
  getWishlist,
} from "./thunk";

const initialState = {
  vehiclesList: {},
  vehiclesCount: {},
  vehicleDetails: {},
  compareList: {},
  wishlist: {},
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
    builder
      .addCase(getVehicleDetails.pending, (state, action) => {})
      .addCase(getVehicleDetails.fulfilled, (state, action) => {
        state.vehicleDetails = action.payload;
      })
      .addCase(getVehicleDetails.rejected, (state, action) => {});
    builder
      .addCase(getCompareList.pending, (state, action) => {})
      .addCase(getCompareList.fulfilled, (state, action) => {
        state.compareList = action.payload;
      })
      .addCase(getCompareList.rejected, (state, action) => {});
    builder
      .addCase(getWishlist.pending, (state, action) => {})
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {});
  },
});

export const { mediaGallery } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
