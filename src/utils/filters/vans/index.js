import { store } from "../../../redux/store";
import {
  vansBodyStyleOptions,
  vansMileageList,
  vansSeatOptions,
  vansCabTypeOptions,
  vansWheelBaseOptions,
  vansEnginePowerOptions,
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

export const vansPostFeatures = [
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
    label: " body Style",
    value: "bodyStyle",
    options: vansBodyStyleOptions,
  },
  {
    label: "Fuel Type",
    value: "fuelType",
    options: fuelTypeOptions,
  },
  {
    label: "Cab Type",
    value: "cabType",
    options: vansCabTypeOptions,
  },
  {
    label: "Wheel Base",
    value: "wheelBase",
    options: vansWheelBaseOptions,
  },
  {
    label: "Engine Size",
    value: "engineSize",
    options: engineSizeOptions,
  },
  {
    label: "Engine Power",
    value: "enginePower",
    options: vansEnginePowerOptions,
  },
  {
    label: "Gearbox",
    value: "gearBox",
    options: gearBoxOptions,
  },
  {
    label: "Fuel Consumption",
    value: "fuelConsumption",
    options: fuelConsumtionOptions,
  },
  {
    label: "Condition",
    value: "condition",
    options: conditionOptions,
  },
  {
    label: "Door",
    value: "door",
    options: doorOptions,
  },
  {
    label: "Exterior Color",
    value: "exteriorColor",
    options: colorsList,
  },
  { label: "Seat", value: "seat", options: vansSeatOptions, category: "normal" },
  {
    label: "Driver Position",
    value: "driverPosition",
    options: driverPositionsOptions,
  },

  {
    label: "Acceleration",
    value: "accelration",
    options: accelerationOptions,
  },

  {
    label: "CO2 Emission",
    value: "co2Emission",
    options: co2EmmisionOptions,
  },
];

export const vansFilters = [
  { label: "Country", name: "country", filterOptions: [], filterType: "normal" },
  { label: "City", name: "city", filterOptions: [], filterType: "normal" },
  { label: "Make", name: "make", filterOptions: [], filterType: "normal" },
  { label: "Model", name: "model", filterOptions: [], filterType: "normal" },
  {
    label: "Price",
    name: "price",
    filterOptions: {
      Min: { options: getYearList(), key: "minPrice" },
      Max: { options: getYearList(), key: "maxPrice" },
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
    label: "Body Type",
    name: "bodyStyle",
    filterOptions: vansBodyStyleOptions,
    filterType: "normal",
  },
  {
    label: "Cab Type",
    value: "cabType",
    filterOptions: vansCabTypeOptions,
    filterType: "normal",
  },
  {
    label: "Engine Size",
    name: "engineSize",
    filterOptions: engineSizeOptions,
    filterType: "normal",
  },
  {
    label: "Engine Power",
    name: "enginePower",
    filterOptions: vansEnginePowerOptions,
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
  { label: "Seat", name: "seat", filterOptions: vansSeatOptions, filterType: "normal" },
  {
    label: "Driver Position",
    name: "driverPosition",
    filterOptions: driverPositionsOptions,
    filterType: "normal",
  },

  {
    label: "Gear Box",
    name: "gearBox",
    filterOptions: gearBoxOptions,
    filterType: "normal",
  },
  {
    label: "Wheel Base",
    name: "wheelBase",
    filterOptions: vansWheelBaseOptions,
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

export const vansDetailsList = [
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
