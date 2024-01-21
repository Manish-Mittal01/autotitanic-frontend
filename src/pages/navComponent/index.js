import React from "react";
import { Navigate, useParams } from "react-router-dom";
import VehiclesList from "../vehiclesList";
import { useSelector } from "react-redux";
import SellVehicle from "../SellVehicle";

export default function NavComponent() {
  const { categoryFilter } = useParams();
  const { loggedinUser } = useSelector((state) => state.auth);

  return categoryFilter === "new" || categoryFilter === "used" ? (
    <VehiclesList />
  ) : loggedinUser?.data?.token ? (
    <SellVehicle />
  ) : (
    <Navigate to="/login" />
  );
}
