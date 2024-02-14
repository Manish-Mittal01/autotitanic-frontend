export const currencySymbols = {
  USD: "$",
  INR: "₹",
  usd: "$",
  inr: "₹",
};

export const categories = [
  { value: "cars", label: "Cars" },
  { value: "vans", label: "Vans" },
  { value: "bikes", label: "Bikes" },
  { value: "motorhomesAndCCaravans", label: "Motorhomes & Caravans" },
  { value: "trucks", label: "Trucks" },
  { value: "farms", label: "Farms" },
  { value: "plants", label: "Plants" },
  { value: "carRentals", label: "Rentals" },
  { value: "partAndAccessories", label: "Part & Accessories" },
];

export const preventMinus = (e) => {
  if (e.code === "Minus" || e.code === "KeyE") {
    e.preventDefault();
  }
};
