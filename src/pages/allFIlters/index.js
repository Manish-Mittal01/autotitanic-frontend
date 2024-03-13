import React, { useEffect } from "react";
import AllCarsFilters from "./components/carsFilters";
import { useLocation } from "react-router-dom";
import AllVansFilters from "./components/vansFilters";
import AllBikesFilters from "./components/bikesFilters";
import { myArr } from "../../utils/constants";
import AllMotorhomesFilters from "./components/motorhomesFilters";
import AllCaravansFilters from "./components/caravansFilter";
import MoreFilters from "./components/filterIndex";
import AllRentalsFilters from "./components/rentalsFilters";
import AllPartsFilters from "./components/partAndAccessoriesFilters";

export default function AllFilters() {
  const { pathname } = useLocation();

  // const captitalize = (value) => {
  //   const myStr = value.toString();
  //   if (!myStr) return;

  //   return myStr.slice(0, 1).toUpperCase() + myStr.slice(1).toLowerCase();
  // };

  // useEffect(() => {
  //   const mmObj = {};

  //   // here myArr is exported json
  //   myArr.map((elem) => {
  //     const keys = Object.keys(elem);

  //     keys.map((key) => {
  //       if (Object.keys(mmObj).find((item) => captitalize(key) === item)) {
  //         mmObj[captitalize(key)].push(captitalize(elem[key]));
  //       } else {
  //         mmObj[captitalize(key)] = [captitalize(elem[key])];
  //       }
  //     });
  //   });

  // }, []);

  return pathname.includes("rent") ? (
    <AllRentalsFilters />
  ) : pathname.includes("cars") ? (
    <AllCarsFilters />
  ) : pathname.includes("caravans") ? (
    <AllCaravansFilters />
  ) : pathname.includes("vans") ? (
    <AllVansFilters />
  ) : pathname.includes("bikes") ? (
    <AllBikesFilters />
  ) : pathname.includes("motorhomes") ? (
    <AllMotorhomesFilters />
  ) : pathname.includes("trucks") || pathname.includes("farms") || pathname.includes("plants") ? (
    <MoreFilters />
  ) : pathname.includes("partAndAccessories") ? (
    <AllPartsFilters />
  ) : (
    <AllCarsFilters />
  );
}
