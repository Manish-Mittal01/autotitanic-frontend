export const accelerationOptions = [
  { value: "0-5s (0-60mph)", label: "0-5s (0-60mph)" },
  { value: "5-8s (0-60mph)", label: "5-8s (0-60mph)" },
  { value: "8-12s (0-60mph)", label: "8-12s (0-60mph)" },
  { value: "12+s (0-60mph)", label: "12+s (0-60mph)" },
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

export const conditionOptions = [
  { value: "used", label: "Used" },
  { value: "new", label: "New" },
];

export const doorOptions = [
  { value: 2, label: "2 Doors" },
  { value: 3, label: "3 Doors" },
  { value: 4, label: "4 Doors" },
  { value: 5, label: "5 Doors" },
  { value: 6, label: "6 Doors" },
  { value: 7, label: "7 Doors" },
];

export const driverPositionsOptions = [
  { value: "Left hand drive", label: "Left hand drive" },
  { value: "Right hand drive", label: "Right hand drive" },
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

export const fuelConsumtionOptions = [
  // { value: "", label: "Any" },
  { value: "30+ mpg", label: "30+ mpg" },
  { value: "40+ mpg", label: "40+ mpg" },
  { value: "50+ mpg", label: "50+ mpg" },
  { value: "60+ mpg", label: "60+ mpg" },
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

export const gearBoxOptions = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
  { value: "unspecified", label: "Unspecified" },
];

export const sellerOptions = [
  { value: "private", label: "Private" },
  { value: "dealer", label: "Dealer" },
];
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
