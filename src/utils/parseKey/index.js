import moment from "moment";

export default function parseKey(key) {
  const text = key ? key?.toString() : "";
  return text.slice(0, 1).toUpperCase() + text.slice(1) || "";
}

export const parseCamelKey = (inputString) => {
  const string = inputString ? inputString?.toString() : "";
  let splitString = string.replace(/([a-z])([A-Z])/g, "$1 $2");

  let outputString = splitString.charAt(0).toUpperCase() + splitString.slice(1);

  return outputString || "";
};

export const parseDate = (date) => {
  return moment(date).format("DD MMM. YYYY");
};
