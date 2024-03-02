import { bikesBodyStyleOptions, bikesEnginePowerOptions, bikesFuelTypeOptions } from "./options";
import {
  colorsList,
  conditionOptions,
  fuelTypeOptions,
  getYearList,
  sellerOptions,
} from "../common/options";
import { vansMileageList } from "../vans/options";

export const bikesFilters = [
  { label: "Country", name: "country", filterOptions: [], filterType: "normal" },
  { label: "City", name: "city", filterOptions: [], filterType: "normal" },
  { label: "Make", name: "make", filterOptions: [], filterType: "normal" },
  { label: "Model", name: "model", filterOptions: [], filterType: "normal" },
  // { label: "Variant", name: "variant", filterOptions: [], filterType: "normal" },
  {
    label: "Price",
    name: "price",
    filterOptions: {
      Min: { options: [], key: "minPrice" },
      Max: { options: [], key: "maxPrice" },
    },
    filterType: "input",
  },
  {
    label: "Year",
    name: "year",
    filterOptions: {
      From: { options: getYearList(), key: "minYear" },
      // .slice(0, -2), key: "minYear" },
      To: { options: getYearList(), key: "maxYear" },
      // .slice(2), key: "maxYear" },
    },
    filterType: "range",
  },
  {
    label: "Mileage",
    name: "mileage",
    filterOptions: {
      Min: { options: vansMileageList.slice(0, -2), key: "minMileage" },
      Max: { options: vansMileageList.slice(2), key: "maxMileage" },
    },
    filterType: "range",
  },
  {
    label: "Condition",
    name: "condition",
    filterOptions: conditionOptions,
    filterType: "normal",
  },
  {
    label: "Private or dealer",
    name: "userType",
    filterOptions: sellerOptions,
    filterType: "normal",
  },
  {
    label: "Engine Power",
    name: "enginePower",
    filterOptions: bikesEnginePowerOptions,
    filterType: "normal",
  },
  {
    label: "Body Type",
    name: "bodyStyle",
    filterOptions: bikesBodyStyleOptions,
    filterType: "normal",
  },
  {
    label: "Exterior Color",
    name: "exteriorColor",
    filterOptions: colorsList,
    filterType: "normal",
  },
  {
    label: "Fuel Type",
    name: "fuelType",
    filterOptions: bikesFuelTypeOptions,
    filterType: "normal",
  },
];

export const bikesPostFeatures = [
  { label: "Country", value: "country", options: [], category: ["cars"] },
  { label: "City", value: "city", options: [], category: ["cars"] },
  { label: "Make", value: "make", options: [], category: ["cars"] },
  { label: "Model", value: "model", options: [], category: ["cars"] },
  // { label: "Variant", value: "variant", options: [], category: ["cars"] },
  {
    label: "Year",
    value: "year",
    options: getYearList(),
  },
  {
    label: " body Style",
    value: "bodyStyle",
    options: bikesBodyStyleOptions,
  },
  {
    label: "Fuel Type",
    value: "fuelType",
    options: bikesFuelTypeOptions,
  },
  {
    label: "Engine Power",
    name: "enginePower",
    options: bikesEnginePowerOptions,
  },
  {
    label: "Condition",
    value: "condition",
    options: conditionOptions,
  },
  {
    label: "Exterior Color",
    value: "exteriorColor",
    options: colorsList,
  },
];

export const carsDetailsList = [
  { value: "condition", label: "Condition" },
  { value: "year", label: "Year" },
  { value: "bodyStyle", label: "Body" },
  { value: "enginePower", label: "Engine Power" },
  { value: "mileage", label: "Mileage" },
  { value: "fuelType", label: "Fuel Type" },
  { value: "exteriorColor", label: "Colour" },
];
