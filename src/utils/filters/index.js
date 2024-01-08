export const priceList = [
  { value: 0, label: 0 },
  { value: 1000, label: 1000 },
  { value: 2000, label: 2000 },
  { value: 5000, label: 5000 },
  { value: 10000, label: 10000 },
  { value: 15000, label: 15000 },
  { value: 20000, label: 20000 },
  { value: 30000, label: 30000 },
  { value: 50000, label: 50000 },
  { value: 100000, label: 100000 },
];

export const mileageList = [
  { value: 10, label: 10 },
  { value: 20, label: 20 },
  { value: 30, label: 30 },
  { value: 40, label: 40 },
  { value: 50, label: 50 },
  { value: 60, label: 60 },
  { value: 70, label: 70 },
  { value: 80, label: 80 },
  { value: 90, label: 90 },
  { value: 100, label: 100 },
];

export function getYearList() {
  const yearList = [];
  for (let i = 2000; i <= new Date().getFullYear(); i++) {
    yearList.push({ value: i, label: i });
  }
  return yearList;
}

export const colorsList = [
  { value: "Red", label: "Red" },
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
  { value: "Brown", label: "Brown" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
  { value: "Grey", label: "Grey" },
  { value: "Biege", label: "Biege" },
  { value: "Silver", label: "Silver" },
  { value: "Yellow", label: "Yellow" },
  { value: "Multicolour", label: "Multicolour" },
];

export const driverPositions = [
  { value: "Left hand drive", label: "Left hand drive" },
  { value: "Right hand drive", label: "Right hand drive" },
];
export const seatOptions = [
  { value: 1, label: "1 Seat" },
  { value: 2, label: "2 Seat" },
  { value: 4, label: "4 Seat" },
  { value: 5, label: "5 Seat" },
  { value: 7, label: "7 Seat" },
  { value: 8, label: "8 Seat" },
  { value: 10, label: "10 Seat" },
];
export const bootSpaceOptions = [
  { value: "No space", label: "No space" },
  { value: "1 - 3 suitcases (100 - 300 liters)", label: "1 - 3 suitcases (100 - 300 liters)" },
  { value: "3 - 5 suitcases (300 - 500 liters)", label: "3 - 5 suitcases (300 - 500 liters)" },
  {
    value: "More than 5 suitcase (over 500 liters)",
    label: "More than 5 suitcase (over 500 liters)",
  },
];

export const accelerationOptions = [
  { value: "4-6s (0-60mph)", label: "4-6s (0-60mph)" },
  { value: "6-8s (0-60mph)", label: "6-8s (0-60mph)" },
  { value: "8-10s (0-60mph)", label: "8-10s (0-60mph)" },
  { value: "10-12s (0-60mph)", label: "10-12s (0-60mph)" },
  { value: "12+s (0-60mph)", label: "12+s (0-60mph)" },
];

export const fuelConsumtionOptions = [
  { value: "10+ mpg", label: "10+ mpg" },
  { value: "20+ mpg", label: "20+ mpg" },
  { value: "30+ mpg", label: "30+ mpg" },
  { value: "40+ mpg", label: "40+ mpg" },
  { value: "50+ mpg", label: "50+ mpg" },
  { value: "60+ mpg", label: "60+ mpg" },
];

export const co2EmmisionOptions = [
  { value: "upto 100 g / km CO2", label: "upto 100 g / km CO2" },
  { value: "upto 110 g / km CO2", label: "upto 110 g / km CO2" },
  { value: "upto 120 g / km CO2", label: "upto 120 g / km CO2" },
  { value: "upto 130 g / km CO2", label: "upto 130 g / km CO2" },
  { value: "upto 150 g / km CO2", label: "upto 150 g / km CO2" },
  { value: "upto 170 g / km CO2", label: "upto 170 g / km CO2" },
  { value: "upto 180 g / km CO2", label: "upto 180 g / km CO2" },
  { value: "upto 200 g / km CO2", label: "upto 200 g / km CO2" },
  { value: "upto 220 g / km CO2", label: "upto 220 g / km CO2" },
  { value: "upto 250 g / km CO2", label: "upto 250 g / km CO2" },
  { value: "upto 250+ g / km CO2", label: "upto 250+ g / km CO2" },
];

export const sortingOptions = [
  { value: "relevance", label: "Relevance", order: 1, key: "_id" },
  { value: "createdAt", label: "Most recent first", order: 1, key: "createdAt" },
  { value: "minPrice", label: "Price: Low to High", order: 1, key: "price" },
  { value: "maxPrice", label: "Price: High to Low", order: -1, key: "price" },
  { value: "minMileage", label: "Mileage: Low to High", order: 1, key: "mileage" },
  { value: "maxMileage", label: "Mileage: High to Low ", order: -1, key: "mileage" },
  { value: "minYear", label: "Age: Newest first", order: -1, key: "year" },
  { value: "maxYear", label: "Age: Oldest first", order: 1, key: "year" },
];

export const filterOptions = [
  { label: "Country", name: "country", filterOptions: [], filterType: "normal" },
  { label: "City", name: "city", filterOptions: [], filterType: "normal" },
  { label: "Make", name: "make", filterOptions: [], filterType: "normal" },
  { label: "Model", name: "model", filterOptions: [], filterType: "normal" },
  { label: "Variant", name: "variant", filterOptions: [], filterType: "normal" },
  {
    label: "Price",
    name: "price",
    filterOptions: {
      Min: { options: priceList.slice(0, -2), key: "minPrice" },
      Max: { options: priceList.slice(2), key: "maxPrice" },
    },
    filterType: "range",
  },
  {
    label: "Year",
    name: "year",
    filterOptions: {
      From: { options: getYearList().slice(0, -2), key: "minYear" },
      To: { options: getYearList().slice(2), key: "maxYear" },
    },
    filterType: "range",
  },
  {
    label: "Mileage",
    name: "mileage",
    filterOptions: {
      Min: { options: mileageList.slice(0, -2), key: "minMileage" },
      Max: { options: mileageList.slice(2), key: "maxMileage" },
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
    filterOptions: [
      { value: "used", label: "Used" },
      { value: "new", label: "New" },
    ],
    filterType: "normal",
  },
  {
    label: "Door",
    name: "door",
    filterOptions: [
      { value: 2, label: "2 Doors" },
      { value: 4, label: "4 Doors" },
    ],
    filterType: "normal",
  },
  {
    label: "Exterior Color",
    name: "exteriorColor",
    filterOptions: colorsList,
    filterType: "normal",
  },
  {
    label: "Interior Color",
    name: "interiorColor",
    filterOptions: colorsList,
    filterType: "normal",
  },
  { label: "Seat", name: "seat", filterOptions: seatOptions, filterType: "normal" },
  {
    label: "Driver Position",
    name: "driverPosition",
    filterOptions: driverPositions,
    filterType: "normal",
  },
  { label: "Boot Space", name: "bootSpace", filterOptions: bootSpaceOptions, filterType: "normal" },
  {
    label: "Acceleration",
    name: "accelration",
    filterOptions: accelerationOptions,
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
