import {
  motorhomesBedroomLayoutOptions,
  motorhomesBirthOptions,
  motorhomesBodyStyleOptions,
  motorhomesEndLayoutOptions,
  motorhomesFuelTypeOptions,
  motorhomesGearBoxOptions,
  motorhomesLengthOptions,
  partsCategoryOptions,
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

export const partsFilters = [
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
    label: "Category",
    name: "partCategory",
    filterOptions: partsCategoryOptions,
    filterType: "normal",
  },
  {
    label: "Sub Category",
    name: "partSubCategory",
    filterOptions: partsSubCategoryOptions,
    filterType: "normal",
  },
];

export const partsPostFeatures = [
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
    label: "Birth",
    value: "birth",
    options: motorhomesBirthOptions,
  },
  {
    label: "Gear Box",
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

export const partsDetailsList = [
  { value: "condition", label: "Condition" },
  { value: "year", label: "Year" },
  { value: "bodyStyle", label: "Body" },
  { value: "engineSize", label: "Engine Size" },
  { value: "mileage", label: "Mileage" },
  { value: "fuelType", label: "Fuel Type" },
  { value: "exteriorColor", label: "Colour" },
  { value: "birth", label: "Birth" },
  { value: "gearBox", label: "Gear Box" },
  { value: "seat", label: "Belted Seat" },
  { value: "endLayout", label: "End Layout" },
  { value: "bedroomLayout", label: "Bedroom Layout" },
  { value: "length", label: "Length" },
];
