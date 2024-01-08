import { store } from "../redux/store";

export function loginChecker() {
  const { loggedinUser } = store.getState().auth;
  const userid = loggedinUser?.data?.id;
  return userid;
}
