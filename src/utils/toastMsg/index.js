import { toast } from "react-toastify";

export const successMsg = (msg) => {
  toast.dismiss();
  toast.success(msg);
};

export const errorMsg = (msg) => {
  toast.dismiss();
  toast.error(msg);
};
