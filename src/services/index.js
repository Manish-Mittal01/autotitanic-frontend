import { successMsg } from "../utils";

export function checkRequiredFields(fields) {
  const allFields = Object.entries(fields);

  for (let value of allFields) {
    if (!value[1] || !value[1].toString()?.trim()) {
      return `${value[0]} is required`;
    }
  }
}

export const copyToClipboard = async (text) => {
  const type = "text/plain";
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })];

  if (data) {
    const contentCopied = await navigator.clipboard.write(data);
    successMsg("Copied to clipboard");
  }
};
