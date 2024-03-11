import { partsCategoryOptions, partsSubCategoryOptions } from "./options";
import { conditionOptions, sellerOptions } from "../common/options";

export const partsFilters = [
  { label: "Country", name: "country", filterOptions: [], filterType: "normal" },
  { label: "City", name: "city", filterOptions: [], filterType: "normal" },
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
    name: "category",
    filterOptions: partsCategoryOptions,
    filterType: "normal",
  },
  {
    label: "Sub Category",
    name: "subCategory",
    filterOptions: [],
    filterType: "normal",
  },
];

export const partsPostFeatures = [
  { label: "Country", value: "country", options: [], category: ["cars"] },
  { label: "City", value: "city", options: [], category: ["cars"] },

  {
    label: "Condition",
    value: "condition",
    options: conditionOptions,
  },
  {
    label: "Category",
    value: "category",
    options: partsCategoryOptions,
  },
  {
    label: "Sub Category",
    value: "subCategory",
    options: [],
  },
];

export const partsDetailsList = [
  { value: "condition", label: "Condition" },
  { value: "category", label: "Category" },
  { value: "subCategory", label: "Sub Category" },
];
