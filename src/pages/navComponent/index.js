import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import VehiclesList from "../vehiclesList";
import Home from "../home";

export default function NavComponent() {
  const { categoryFilter } = useParams();

  useEffect(() => {
    if (categoryFilter.includes("sell")) {
      return <VehiclesList />;
    } else {
      return <Home />;
    }
  }, []);

  return null;
}
