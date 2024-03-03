import { caravansAxlesOptions, caravansBirthOptions, caravansMtplmOptions } from "./options";
import { colorsList, conditionOptions, getYearList, sellerOptions } from "../common/options";
import { vansMileageList } from "../vans/options";
import { motorhomesLengthOptions } from "../motorhomes/options";

export const caravansFilters = [
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
    label: "Birth",
    name: "birth",
    filterOptions: caravansBirthOptions,
    filterType: "normal",
  },
  {
    label: "Axle",
    name: "axle",
    filterOptions: caravansAxlesOptions,
    filterType: "normal",
  },
  {
    label: "Exterior Color",
    name: "exteriorColor",
    filterOptions: colorsList,
    filterType: "normal",
  },
  {
    label: "Length",
    name: "length",
    filterOptions: motorhomesLengthOptions,
    filterType: "normal",
  },
  {
    label: "MTPLM",
    name: "mtplm",
    filterOptions: caravansMtplmOptions,
    filterType: "normal",
  },
];

export const caravansPostFeatures = [
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
    label: "Birth",
    value: "birth",
    options: caravansBirthOptions,
  },
  {
    label: "Axles",
    value: "axle",
    options: caravansAxlesOptions,
  },
  {
    label: "Exterior Color",
    value: "exteriorColor",
    options: colorsList,
  },
  {
    label: "Length",
    value: "length",
    options: motorhomesLengthOptions,
  },
  {
    label: "MTPLM",
    value: "mtplm",
    options: caravansMtplmOptions,
  },

  {
    label: "Condition",
    value: "condition",
    options: conditionOptions,
  },
];

export const caravansDetailsList = [
  { value: "condition", label: "Condition" },
  { value: "year", label: "Year" },
  { value: "length", label: "Length" },
  { value: "birth", label: "Birth" },
  { value: "axle", label: "Axle" },
  { value: "mtplm", label: "MTPLM" },
  { value: "mileage", label: "Mileage" },
  { value: "exteriorColor", label: "Colour" },
];
