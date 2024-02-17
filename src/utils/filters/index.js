export function getYearList() {
  const yearList = [];
  for (let i = new Date().getFullYear(); i >= 2000; i--) {
    yearList.push({ value: i, label: i });
  }
  for (let i = 1990; i >= 1930; i -= 10) {
    yearList.push({ value: i, label: `${i}s` });
  }
  return yearList;
}

export const getEngineSizeOptions = () => {
  const engineSizes = [];
  for (let i = 1; i <= 8; i += 0.5) {
    engineSizes.push({ value: `${i}L`, label: `${i}L` });
  }
  return engineSizes;
};

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
  { value: 50, label: "At least 50 miles" },
  { value: 100, label: "At least 100 miles" },
  { value: 500, label: "At least 500 miles" },
  { value: 5000, label: "At least 5,000 miles" },
  { value: 10000, label: "At least 10,000 miles" },
  { value: 20000, label: "At least 20,000 miles" },
  { value: 30000, label: "At least 30,000 miles" },
  { value: 40000, label: "At least 40,000 miles" },
  { value: 50000, label: "At least 50,000 miles" },
  { value: 60000, label: "At least 60,000 miles" },
  { value: 70000, label: "At least 70,000 miles" },
  { value: 80000, label: "At least 80,000 miles" },
  { value: 90000, label: "At least 90,000 miles" },
  { value: 100000, label: "At least 100,000 miles" },
  { value: 125000, label: "At least 125,000 miles" },
  { value: 150000, label: "At least 150,000 miles" },
  { value: 175000, label: "At least 175,000 miles" },
  { value: 200000, label: "At least 200,000 miles" },
  { value: 250000, label: "At least 250,000 miles" },
  { value: 299000, label: "At least 299,000 miles" },
  { value: 999999, label: "Over 300,000 miles" },
];

export const colorsList = [
  { value: "Beige", label: "Beige" },
  { value: "Black", label: "Black" },
  { value: "Blue", label: "Blue" },
  { value: "Bronze", label: "Bronze" },
  { value: "Brown", label: "Brown" },
  { value: "Burgundy", label: "Burgundy" },
  { value: "Gold", label: "Gold" },
  { value: "Green", label: "Green" },
  { value: "Grey", label: "Grey" },
  { value: "Indigo", label: "Indigo" },
  { value: "Magenta", label: "Magenta" },
  { value: "Maroon", label: "Maroon" },
  { value: "Navy", label: "Navy" },
  { value: "Orange", label: "Orange" },
  { value: "Pink", label: "Pink" },
  { value: "Purple", label: "Purple" },
  { value: "Red", label: "Red" },
  { value: "Silver", label: "Silver" },
  { value: "White", label: "White" },
  { value: "Turquoise", label: "Turquoise" },
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
  { value: 3, label: "3 Seat" },
  { value: 4, label: "4 Seat" },
  { value: 5, label: "5 Seat" },
  { value: 7, label: "7 Seat" },
  { value: 8, label: "8 Seat" },
  { value: 9, label: "9 Seat" },
];

export const bootSpaceOptions = [
  // { value: "No space", label: "No space" },
  { value: "1 - 3 suitcases (100 - 300 liters)", label: "1 - 3 suitcases (100 - 300 liters)" },
  { value: "3 - 5 suitcases (300 - 500 liters)", label: "3 - 5 suitcases (300 - 500 liters)" },
  {
    value: "More than 5 suitcase (over 500 liters)",
    label: "More than 5 suitcase (over 500 liters)",
  },
];

export const accelerationOptions = [
  { value: "0-5s (0-60mph)", label: "0-5s (0-60mph)" },
  { value: "5-8s (0-60mph)", label: "5-8s (0-60mph)" },
  { value: "8-12s (0-60mph)", label: "8-12s (0-60mph)" },
  { value: "12+s (0-60mph)", label: "12+s (0-60mph)" },
];

export const fuelConsumtionOptions = [
  { value: "30+ mpg", label: "30+ mpg" },
  { value: "40+ mpg", label: "40+ mpg" },
  { value: "50+ mpg", label: "50+ mpg" },
  { value: "60+ mpg", label: "60+ mpg" },
];

export const co2EmmisionOptions = [
  { value: "upto 0 g / km CO2", label: "upto 0 g / km CO2" },
  { value: "upto 75 g / km CO2", label: "upto 75 g / km CO2" },
  { value: "upto 100 g / km CO2", label: "upto 100 g / km CO2" },
  { value: "upto 110 g / km CO2", label: "upto 110 g / km CO2" },
  { value: "upto 120 g / km CO2", label: "upto 120 g / km CO2" },
  { value: "upto 130 g / km CO2", label: "upto 130 g / km CO2" },
  { value: "upto 150 g / km CO2", label: "upto 150 g / km CO2" },
  { value: "upto 165 g / km CO2", label: "upto 165 g / km CO2" },
  { value: "upto 175 g / km CO2", label: "upto 175 g / km CO2" },
  { value: "upto 185 g / km CO2", label: "upto 185 g / km CO2" },
  { value: "upto 200 g / km CO2", label: "upto 200 g / km CO2" },
  { value: "upto 225 g / km CO2", label: "upto 225 g / km CO2" },
  { value: "upto 255 g / km CO2", label: "upto 255 g / km CO2" },
  { value: "upto 255+ g / km CO2", label: "upto 255+ g / km CO2" },
];

export const fuelTypeOptions = [
  { value: "biFuel", label: "Bi Fuel" },
  { value: "diesel", label: "Diesel" },
  { value: "dieselHybrid", label: "Diesel Hybrid" },
  { value: "deselPlugInHybrid", label: "Desel Plug-in-Hybrid" },
  { value: "electric", label: "Electric" },
  { value: "naturalGas", label: "Natural gas" },
  { value: "petrol", label: "Petrol" },
  { value: "petrolHybrid", label: "Petrol Hybrid" },
  { value: "petrolPlugInHybrid", label: "Petrol Plug-in-Hybrid" },
  { value: "unspecified", label: "Unspecified" },
];

export const bodyStyleOptions = [
  { value: "carDerivedVan", label: "Car Derived Van" },
  { value: "convertible", label: "Convertible" },
  { value: "coupe", label: "Coupe" },
  { value: "estate", label: "Estate" },
  { value: "hatchback", label: "Hatchback" },
  { value: "MPV", label: "MPV" },
  { value: "SUV/Pick-up", label: "SUV/Pick-up" },
  { value: "saloon", label: "Saloon" },
  { value: "unspecified", label: "Unspecified" },
];

export const engineSizeOptions = [
  { value: "0L", label: "0L" },
  { value: "1.0L", label: "1.0L" },
  { value: "1.2L", label: "1.2L" },
  { value: "1.4L", label: "1.4L" },
  { value: "1.6L", label: "1.6L" },
  { value: "1.8L", label: "1.8L" },
  { value: "1.9L", label: "1.9L" },
  { value: "2.0L", label: "2.0L" },
  { value: "2.2L", label: "2.2L" },
  { value: "2.4L", label: "2.4L" },
  { value: "2.6L", label: "2.6L" },
  { value: "2.8L", label: "2.8L" },
  { value: "3.0L", label: "3.0L" },
  { value: "3.5L", label: "3.5L" },
  { value: "4.0L", label: "4.0L" },
  { value: "4.5L", label: "4.5L" },
  { value: "5.0L", label: "5.0L" },
  { value: "5.5L", label: "5.5L" },
  { value: "6.0L", label: "6.0L" },
  { value: "6.5L", label: "6.5L" },
  { value: "7.0L", label: "7.0L" },
];

export const doorOptions = [
  { value: 2, label: "2 Doors" },
  { value: 3, label: "3 Doors" },
  { value: 4, label: "4 Doors" },
  { value: 5, label: "5 Doors" },
  { value: 6, label: "6 Doors" },
  { value: 7, label: "7 Doors" },
];

export const gearBoxOptions = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
  { value: "unspecified", label: "Unspecified" },
];

export const filterOptions = [
  { label: "Country", name: "country", filterOptions: [], filterType: "normal" },
  { label: "City", name: "city", filterOptions: [], filterType: "normal" },
  { label: "Make", name: "make", filterOptions: [], filterType: "normal" },
  { label: "Model", name: "model", filterOptions: [], filterType: "normal" },
  // { label: "Variant", name: "variant", filterOptions: [], filterType: "normal" },
  {
    label: "Price",
    name: "price",
    filterOptions: {
      Min: { options: priceList.slice(0, -2), key: "minPrice" },
      Max: { options: priceList.slice(2), key: "maxPrice" },
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
    label: "Private or dealer",
    name: "userType",
    filterOptions: [
      { value: "private", label: "Private" },
      { value: "Dealer", label: "dealer" },
    ],
    filterType: "normal",
  },
  {
    label: "Body Type",
    name: "bodyStyle",
    filterOptions: bodyStyleOptions,
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
  // {
  //   label: "Interior Color",
  //   name: "interiorColor",
  //   filterOptions: colorsList,
  //   filterType: "normal",
  // },
  { label: "Seat", name: "seat", filterOptions: seatOptions, filterType: "normal" },
  {
    label: "Driver Position",
    name: "driverPosition",
    filterOptions: driverPositions,
    filterType: "normal",
  },
  { label: "Boot Space", name: "bootSpace", filterOptions: bootSpaceOptions, filterType: "normal" },
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
  // {
  //   label: "Fuel Consumption",
  //   name: "fuelConsumption",
  //   filterOptions: fuelConsumtionOptions,
  //   filterType: "normal",
  // },
  {
    label: "CO2 Emission",
    name: "co2Emission",
    filterOptions: co2EmmisionOptions,
    filterType: "normal",
  },
];

export const postFeatures = [
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
    options: bodyStyleOptions,
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
    label: "Condition",
    value: "condition",
    options: [
      { value: "used", label: "Used" },
      { value: "new", label: "New" },
    ],
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
  // {
  //   label: "Interior Color",
  //   value: "interiorColor",
  //   options: colorsList,
  //   category: ["cars"],
  // },
  { label: "Seat", value: "seat", options: seatOptions, category: "normal" },
  {
    label: "Driver Position",
    value: "driverPosition",
    options: driverPositions,
    category: ["cars"],
  },
  {
    label: "Boot Space",
    value: "bootSpace",
    options: bootSpaceOptions,
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

export const detailsList = {
  cars: [
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
  ],
};

export const sellerDetails = [
  { value: "userType", label: "Seller" },
  { value: "name", label: "Seller's Name" },
  { value: "mobile", label: "Mobile No." },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
];

export const sortingOptions = [
  { value: "relevance", label: "Relevance", order: 1, key: "_id" },
  { value: "createdAt", label: "Most recent first", order: -1, key: "createdAt" },
  { value: "minPrice", label: "Price: Low to High", order: 1, key: "price" },
  { value: "maxPrice", label: "Price: High to Low", order: -1, key: "price" },
  { value: "minMileage", label: "Mileage: Low to High", order: 1, key: "mileage" },
  { value: "maxMileage", label: "Mileage: High to Low ", order: -1, key: "mileage" },
  { value: "minYear", label: "Age: Newest first", order: -1, key: "year" },
  { value: "maxYear", label: "Age: Oldest first", order: 1, key: "year" },
];
