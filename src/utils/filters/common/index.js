export const compareListDetails = {
  cars: [
    { value: "location", label: "Location" },
    { value: "price", label: "Price" },
    { value: "make", label: "Make" },
    { value: "model", label: "Model" },
    { value: "condition", label: "Condition" },
    { value: "year", label: "Year" },
    { value: "mileage", label: "Mileage" },
    { value: "fuelType", label: "Fuel Type" },
    { value: "bodyStyle", label: "Body Style" },
    { value: "gearBox", label: "Gear Box" },
    { value: "engineSize", label: "Engine Size" },
    { value: "door", label: "Door" },
    { value: "seat", label: "Seats" },
    { value: "driverPosition", label: "Driver Position" },
    { value: "exteriorColor", label: "Colour" },
    { value: "bootSpace", label: "Boot Space" },
    { value: "accelration", label: "Acceleration" },
    { value: "co2Emission", label: "Co2 Emission" },
    // { value: "reviews", label: "Reviews" },
  ],
};

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

export const sellerDetails = [
  { value: "userType", label: "Seller" },
  { value: "name", label: "Seller's Name" },
  { value: "mobile", label: "Mobile No." },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
  { value: "rating", label: "Rating" },
];
