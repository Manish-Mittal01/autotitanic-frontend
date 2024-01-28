import { store } from "../../redux/store";

export default function isUserLoggedin() {
  const { loggedinUser } = store.getState().auth;
  return loggedinUser?.data?.token;
}
