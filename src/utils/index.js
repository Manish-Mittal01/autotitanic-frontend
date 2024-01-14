export const currencySymbols = {
  USD: "$",
  INR: "₹",
  usd: "$",
  inr: "₹",
};

export const categories = [
  { value: "Cars", label: "Cars" },
  { value: "Vans", label: "Vans" },
  { value: "Bikes", label: "Bikes" },
  { value: "Motorhomes & Caravans", label: "Motorhomes & Caravans" },
  { value: "Trucks", label: "Trucks" },
  { value: "Farms", label: "Farms" },
  { value: "Plants", label: "Plants" },
  { value: "Car Rentals", label: "Car Rentals" },
  { value: "Part & Accessories", label: "Part & Accessories" },
];

export const preventMinusAndMinValue = (e, min, max) => {
  if (e.code === "Minus" || e.code === "KeyE" || (min && e.target.value < min)) {
    e.preventDefault();
  }
};
