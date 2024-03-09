import React from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import VehiclesList from "../vehiclesList";
import { categories } from "../../utils";
import Home from "../home";

export default function NavComponent() {
  const { pathname } = useLocation();
  const { categoryFilter } = useParams();

  const categoryHome = categories.find((category) => pathname.includes(category.value));

  return categoryFilter === "new" || categoryFilter === "used" || categoryFilter === "all" ? (
    <VehiclesList />
  ) : categoryHome ? (
    <Home />
  ) : (
    <Navigate to="/login" />
  );
}
