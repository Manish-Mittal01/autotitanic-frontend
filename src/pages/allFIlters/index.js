import React from "react";
import AllCarsFilters from "./components/carsFilters";
import { useLocation } from "react-router-dom";
import AllVansFilters from "./components/vansFilters";

export default function AllFilters() {
  const { pathname } = useLocation();

  return (
    <>
      {
        // pathname.includes()
      }
      <AllVansFilters />
    </>
  );
}
