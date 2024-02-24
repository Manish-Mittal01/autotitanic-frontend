import { store } from "../../../redux/store";
import {
  carsBodyStyleOptions,
  carsBootSpaceOptions,
  carsMileageList,
  carsSeatOptions,
} from "./options";
import {
  accelerationOptions,
  co2EmmisionOptions,
  colorsList,
  conditionOptions,
  doorOptions,
  driverPositionsOptions,
  engineSizeOptions,
  fuelConsumtionOptions,
  fuelTypeOptions,
  gearBoxOptions,
  getYearList,
  sellerOptions,
} from "../common/options";

export const carsFilters = [
  { label: "Country", name: "country", filterOptions: [], filterType: "normal" },
  { label: "City", name: "city", filterOptions: [], filterType: "normal" },
  { label: "Make", name: "make", filterOptions: [], filterType: "normal" },
  { label: "Model", name: "model", filterOptions: [], filterType: "normal" },
  // { label: "Variant", name: "variant", filterOptions: [], filterType: "normal" },
  {
    label: "Price",
    name: "price",
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
      Min: { options: carsMileageList.slice(0, -2), key: "minMileage" },
      Max: { options: carsMileageList.slice(2), key: "maxMileage" },
    },
    filterType: "range",
  },
  //   {
  //     label: "Private or Seller",
  //     filterOptions: [
  //       { value: "private", label: "Private" },
  //       { value: "Seller", label: "Seller" },
  //     ],
  //     filterType: "normal",
  //   },
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
    label: "Body Type",
    name: "bodyStyle",
    filterOptions: carsBodyStyleOptions,
    filterType: "normal",
  },
  {
    label: "Engine Size",
    name: "engineSize",
    filterOptions: engineSizeOptions,
    filterType: "normal",
  },
  {
    label: "Door",
    name: "door",
    filterOptions: doorOptions,
    filterType: "normal",
  },
  {
    label: "Exterior Color",
    name: "exteriorColor",
    filterOptions: colorsList,
    filterType: "normal",
  },
  { label: "Seat", name: "seat", filterOptions: carsSeatOptions, filterType: "normal" },
  {
    label: "Driver Position",
    name: "driverPosition",
    filterOptions: driverPositionsOptions,
    filterType: "normal",
  },
  {
    label: "Boot Space",
    name: "bootSpace",
    filterOptions: carsBootSpaceOptions,
    filterType: "normal",
  },
  {
    label: "Gear Box",
    name: "gearBox",
    filterOptions: gearBoxOptions,
    filterType: "normal",
  },

  {
    label: "Acceleration",
    name: "accelration",
    filterOptions: accelerationOptions,
    filterType: "normal",
  },
  {
    label: "Fuel Type",
    name: "fuelType",
    filterOptions: fuelTypeOptions,
    filterType: "normal",
  },
  {
    label: "Fuel Consumption",
    name: "fuelConsumption",
    filterOptions: fuelConsumtionOptions,
    filterType: "normal",
  },
  {
    label: "CO2 Emission",
    name: "co2Emission",
    filterOptions: co2EmmisionOptions,
    filterType: "normal",
  },
];

export const carsPostFeatures = [
  { label: "Country", value: "country", options: [], category: ["cars"] },
  { label: "City", value: "city", options: [], category: ["cars"] },
  { label: "Make", value: "make", options: [], category: ["cars"] },
  { label: "Model", value: "model", options: [], category: ["cars"] },
  // { label: "Variant", value: "variant", options: [], category: ["cars"] },
  {
    label: "Year",
    value: "year",
    options: getYearList(),
    category: ["cars"],
  },
  {
    label: " body Style",
    value: "bodyStyle",
    options: carsBodyStyleOptions,
    category: ["cars"],
  },
  {
    label: "Fuel Type",
    value: "fuelType",
    options: fuelTypeOptions,
    category: ["cars"],
  },
  {
    label: "Engine Size",
    value: "engineSize",
    options: engineSizeOptions,
    category: ["cars"],
  },
  {
    label: "Gearbox",
    value: "gearBox",
    options: gearBoxOptions,
    category: ["cars"],
  },
  {
    label: "Fuel Consumption",
    value: "fuelConsumption",
    options: fuelConsumtionOptions,
    category: ["cars"],
  },
  {
    label: "Condition",
    value: "condition",
    options: conditionOptions,
    category: ["cars"],
  },
  {
    label: "Door",
    value: "door",
    options: doorOptions,
    category: ["cars"],
  },
  {
    label: "Exterior Color",
    value: "exteriorColor",
    options: colorsList,
    category: ["cars"],
  },
  { label: "Seat", value: "seat", options: carsSeatOptions, category: "normal" },
  {
    label: "Driver Position",
    value: "driverPosition",
    options: driverPositionsOptions,
    category: ["cars"],
  },
  {
    label: "Boot Space",
    value: "bootSpace",
    options: carsBootSpaceOptions,
    category: ["cars"],
  },
  {
    label: "Acceleration",
    value: "accelration",
    options: accelerationOptions,
    category: ["cars"],
  },
  {
    label: "CO2 Emission",
    value: "co2Emission",
    options: co2EmmisionOptions,
    category: ["cars"],
  },
];

export const carsDetailsList = [
  { value: "condition", label: "Condition" },
  { value: "year", label: "Year" },
  { value: "bodyStyle", label: "Body" },
  { value: "driverPosition", label: "Driver Position" },
  { value: "gearBox", label: "Gear Box" },
  { value: "engineSize", label: "Engine Size" },
  { value: "mileage", label: "Mileage" },
  { value: "fuelType", label: "Fuel Type" },
  { value: "seat", label: "Seats" },
  { value: "door", label: "Doors" },
  { value: "exteriorColor", label: "Colour" },
  { value: "bootSpace", label: "Boot Space" },
  { value: "accelration", label: "Acceleration" },
  { value: "co2Emission", label: "CO2 Emission" },
];

export const handlePopularCarsMakeList = async () => {
  const { allMakes } = store.getState().makeAndModel;
  const popularMakeLabels = [
    "Audi",
    "BMW",
    "Ford",
    "Jaguar",
    "Land Rover",
    "Mercedes Benz",
    "Nissan",
    "Porsches",
    "Toyota",
    "Vauxhall",
    "Volkswagen",
    "Volvo",
  ];

  const popularMakes = [];
  if (allMakes.data?.items?.length > 0) {
    allMakes.data?.items?.forEach((make) => {
      if (popularMakeLabels.includes(make.label)) {
        popularMakes.push(make);
      }
    });
  }

  return popularMakes;
};
