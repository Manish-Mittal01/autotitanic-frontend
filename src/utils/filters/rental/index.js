import {
  colorsList,
  conditionOptions,
  fuelTypeOptions,
  getYearList,
  sellerOptions,
} from "../common/options";
import { vansMileageList } from "../vans/options";
import { rentalsPriceTypeOptions } from "./options";

export const rentalsFilters = [
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
    label: "Exterior Color",
    name: "exteriorColor",
    filterOptions: colorsList,
    filterType: "normal",
  },
  {
    label: "Fuel type",
    name: "fueltype",
    filterOptions: fuelTypeOptions,
    filterType: "normal",
  },
  {
    label: "Price type",
    name: "priceType",
    filterOptions: rentalsPriceTypeOptions,
    filterType: "normal",
  },
];

export const rentalsPostFeatures = [
  { label: "Country", value: "country", options: [] },
  { label: "City", value: "city", options: [] },
  { label: "Make", value: "make", options: [] },
  { label: "Model", value: "model", options: [] },
  {
    label: "Year",
    value: "year",
    options: getYearList(),
  },
  {
    label: "Fuel Type",
    value: "fuelType",
    options: fuelTypeOptions,
  },
  {
    label: "Exterior Color",
    value: "exteriorColor",
    options: colorsList,
  },

  {
    label: "Condition",
    value: "condition",
    options: conditionOptions,
  },
  {
    label: "Price type",
    value: "priceType",
    options: rentalsPriceTypeOptions,
  },
];

export const rentalsDetailsList = [
  { value: "condition", label: "Condition" },
  { value: "year", label: "Year" },
  { value: "fuelType", label: "Fuel Type" },
  { value: "mileage", label: "Mileage" },
  { value: "exteriorColor", label: "Colour" },
  { value: "priceType", label: "Price type" },
];
