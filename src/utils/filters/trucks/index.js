import {
  trucksAxleOptions,
  trucksBodyStyleOptions,
  trucksCabOptions,
  trucksCategoryOptions,
  trucksEnginePowerOptions,
  trucksFuelTypeOptions,
  trucksGtwOptions,
  trucksGvwOptions,
} from "./options";
import { colorsList, conditionOptions, getYearList, sellerOptions } from "../common/options";
import { vansMileageList } from "../vans/options";

export const trucksFilters = [
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
    label: "Fuel Type",
    name: "fuelType",
    filterOptions: trucksFuelTypeOptions,
    filterType: "normal",
  },
  {
    label: "Engine Power",
    name: "enginePower",
    filterOptions: trucksEnginePowerOptions,
    filterType: "normal",
  },
  {
    label: "Body Type",
    name: "bodyStyle",
    filterOptions: trucksBodyStyleOptions,
    filterType: "normal",
  },
  {
    label: "Category",
    name: "truckCategory",
    filterOptions: trucksCategoryOptions,
    filterType: "normal",
  },
  {
    label: "Axle",
    name: "axle",
    filterOptions: trucksAxleOptions,
    filterType: "normal",
  },
  {
    label: "GVW",
    name: "gvw",
    filterOptions: trucksGvwOptions,
    filterType: "normal",
  },
  {
    label: "GTW",
    name: "gtw",
    filterOptions: trucksGtwOptions,
    filterType: "normal",
  },
  {
    label: "Cab Type",
    name: "cabType",
    filterOptions: trucksCabOptions,
    filterType: "normal",
  },
  {
    label: "Exterior Color",
    name: "exteriorColor",
    filterOptions: colorsList,
    filterType: "normal",
  },
];

export const trucksPostFeatures = [
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
    label: "Condition",
    value: "condition",
    options: conditionOptions,
  },
  {
    label: "Fuel Type",
    value: "fuelType",
    options: trucksFuelTypeOptions,
  },
  {
    label: "Engine Power",
    value: "enginePower",
    options: trucksEnginePowerOptions,
  },
  {
    label: "Body Type",
    value: "bodyStyle",
    options: trucksBodyStyleOptions,
  },
  {
    label: "Category",
    value: "truckCategory",
    options: trucksCategoryOptions,
  },
  {
    label: "Axle",
    value: "axle",
    options: trucksAxleOptions,
  },
  {
    label: "GVW",
    value: "gvw",
    options: trucksGvwOptions,
  },
  {
    label: "GTW",
    value: "gtw",
    options: trucksGtwOptions,
  },
  {
    label: "Cab Type",
    value: "cabType",
    options: trucksCabOptions,
  },
  {
    label: "Exterior Color",
    value: "exteriorColor",
    options: colorsList,
  },
];

export const trucksDetailsList = [
  { value: "condition", label: "Condition" },
  { value: "year", label: "Year" },
  { value: "bodyStyle", label: "Body" },
  { value: "mileage", label: "Mileage" },
  { value: "exteriorColor", label: "Colour" },
  { label: "Fuel Type", value: "fuelType" },
  { label: "Engine Power", value: "enginePower" },
  { label: "Body Type", value: "bodyStyle" },
  { label: "Category", value: "truckCategory" },
  { label: "Axle", value: "axle" },
  { label: "GVW", value: "gvw" },
  { label: "GTW", value: "gtw" },
  { label: "Cab Type", value: "cabType" },
];
