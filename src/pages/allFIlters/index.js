import React from "react";
import AllCarsFilters from "./components/carsFilters";
import { useLocation } from "react-router-dom";
import AllVansFilters from "./components/vansFilters";
import AllBikesFilters from "./components/bikesFilters";

export default function AllFilters() {
  const { pathname } = useLocation();

  return pathname.includes("cars") ? (
    <AllCarsFilters />
  ) : pathname.includes("vans") ? (
    <AllVansFilters />
  ) : pathname.includes("bikes") ? (
    <AllBikesFilters />
  ) : (
    <AllVansFilters />
  );
}
