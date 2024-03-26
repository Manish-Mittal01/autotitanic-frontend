import {
  motorhomesBedroomLayoutOptions,
  motorhomesBirthOptions,
  motorhomesBodyStyleOptions,
  motorhomesEndLayoutOptions,
  motorhomesFuelTypeOptions,
  motorhomesGearBoxOptions,
  motorhomesLengthOptions,
} from "./options";
import {
  colorsList,
  conditionOptions,
  engineSizeOptions,
  getYearList,
  sellerOptions,
} from "../common/options";
import { vansMileageList } from "../vans/options";
import { carsSeatOptions } from "../cars/options";

export const motorhomesFilters = [
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
      To: { options: getYearList(), key: "maxYear" },
    },
    filterType: "range",
  },
  {
    label: "Mileage",
    name: "mileage",
    filterOptions: {
      Min: { options: vansMileageList, key: "minMileage" },
      Max: { options: vansMileageList, key: "maxMileage" },
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
    label: "Engine Size",
    name: "engineSize",
    filterOptions: engineSizeOptions,
    filterType: "normal",
  },
  {
    label: "Body Type",
    name: "bodyStyle",
    filterOptions: motorhomesBodyStyleOptions,
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
    filterOptions: motorhomesFuelTypeOptions,
    filterType: "normal",
  },
  {
    label: "Berth",
    name: "birth",
    filterOptions: motorhomesBirthOptions,
    filterType: "normal",
  },
  {
    label: "Transmission",
    name: "gearBox",
    filterOptions: motorhomesGearBoxOptions,
    filterType: "normal",
  },
  {
    label: "Belted Seats",
    name: "seat",
    filterOptions: carsSeatOptions,
    filterType: "normal",
  },
  {
    label: "End Layout",
    name: "endLayout",
    filterOptions: motorhomesEndLayoutOptions,
    filterType: "normal",
  },
  {
    label: "Bedroom Layout",
    name: "bedroomLayout",
    filterOptions: motorhomesBedroomLayoutOptions,
    filterType: "normal",
  },
  {
    label: "Length",
    name: "length",
    filterOptions: motorhomesLengthOptions,
    filterType: "normal",
  },
];

export const motorhomesPostFeatures = [
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
    options: motorhomesBodyStyleOptions,
  },
  {
    label: "Fuel Type",
    value: "fuelType",
    options: motorhomesFuelTypeOptions,
  },
  {
    label: "Engine Size",
    value: "engineSize",
    options: engineSizeOptions,
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
    label: "Berth",
    value: "birth",
    options: motorhomesBirthOptions,
  },
  {
    label: "Transmission",
    value: "gearBox",
    options: motorhomesGearBoxOptions,
  },
  {
    label: "Belted Seats",
    value: "seat",
    options: carsSeatOptions,
  },
  {
    label: "End Layout",
    value: "endLayout",
    options: motorhomesEndLayoutOptions,
  },
  {
    label: "Bedroom Layout",
    value: "bedroomLayout",
    options: motorhomesBedroomLayoutOptions,
  },
  {
    label: "Length",
    value: "length",
    options: motorhomesLengthOptions,
  },
];

export const motorhomesDetailsList = [
  { value: "condition", label: "Condition" },
  { value: "year", label: "Year" },
  { value: "bodyStyle", label: "Body" },
  { value: "engineSize", label: "Engine Size" },
  { value: "mileage", label: "Mileage" },
  { value: "fuelType", label: "Fuel Type" },
  { value: "exteriorColor", label: "Colour" },
  { value: "birth", label: "Berth" },
  { value: "gearBox", label: "Transmission" },
  { value: "seat", label: "Belted Seat" },
  { value: "endLayout", label: "End Layout" },
  { value: "bedroomLayout", label: "Bedroom Layout" },
  { value: "length", label: "Length" },
];
