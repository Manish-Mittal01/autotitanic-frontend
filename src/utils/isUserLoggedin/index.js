import { store } from "../../redux/store";

export default function isUserLoggedin() {
  const { loggedinUser } = store.getState((state) => state.auth);
  return loggedinUser?.data?.token;
}
