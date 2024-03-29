import { farmsCategoryOptions, farmsFuelTypeOptions, farmsUsedHoursOptions } from "./options";
import { colorsList, conditionOptions, getYearList, sellerOptions } from "../common/options";

export const farmsFilters = [
  { label: "Country", name: "country", filterOptions: [], filterType: "normal" },
  { label: "City", name: "city", filterOptions: [], filterType: "normal" },
  { label: "Make", name: "make", filterOptions: [], filterType: "normal" },
  { label: "Model", name: "model", filterOptions: [], filterType: "normal" },
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
      To: { options: getYearList(), key: "maxYear" },
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
    label: "Private or Dealer",
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
    label: "Category",
    name: "category",
    filterOptions: farmsCategoryOptions,
    filterType: "normal",
  },
  {
    label: "Sub Category",
    name: "subCategory",
    filterOptions: [],
    filterType: "normal",
  },
  {
    label: "Fuel Type",
    name: "fuelType",
    filterOptions: farmsFuelTypeOptions,
    filterType: "normal",
  },
  {
    label: "Hours Used",
    name: "farmsUsedHours",
    filterOptions: farmsUsedHoursOptions,
    filterType: "normal",
  },
];

export const farmsPostFeatures = [
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
    label: "Fuel Type",
    value: "fuelType",
    options: farmsFuelTypeOptions,
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
  {
    label: "Category",
    value: "category",
    options: farmsCategoryOptions,
  },
  {
    label: "Sub Category",
    value: "subCategory",
    options: [],
  },
  {
    label: "Hours Used",
    value: "farmsUsedHours",
    options: farmsUsedHoursOptions,
  },
];

export const farmsDetailsList = [
  { value: "condition", label: "Condition" },
  { value: "year", label: "Year" },
  { value: "fuelType", label: "Fuel Type" },
  { value: "category", label: "Category" },
  { value: "subCategory", label: "Sub Category" },
  { value: "exteriorColor", label: "Colour" },
  { value: "farmsUsedHours", label: "Used Hours" },
];
