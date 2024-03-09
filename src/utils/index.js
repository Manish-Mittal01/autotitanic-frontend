export const categories = [
  { value: "cars", label: "Cars" },
  { value: "vans", label: "Vans" },
  { value: "bikes", label: "Bikes" },
  { value: "motorhomes", label: "Motorhomes" },
  { value: "caravans", label: "Caravans" },
  { value: "trucks", label: "Trucks" },
  { value: "farms", label: "Farms" },
  { value: "plants", label: "Plants" },
  { value: "rentals", label: "Rentals" },
  { value: "partAndAccessories", label: "Parts & Accessories" },
];

export const preventMinus = (e) => {
  if (e.code === "Minus" || e.code === "KeyE") {
    e.preventDefault();
  }
};
