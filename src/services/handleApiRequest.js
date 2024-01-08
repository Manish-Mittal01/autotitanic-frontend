import { store } from "../redux/store";
import { errorMsg } from "../utils/toastMsg";

export async function handleApiRequest(
  method,
  request = "",
  showErrorToast = true,
  onError = () => {}
) {
  try {
    const response = await store.dispatch(method(request)).unwrap();
    if (!response.isSuccess) {
      onError();
      showErrorToast && errorMsg(response.error);
      return {};
    } else {
      return response;
    }
  } catch (error) {
    console.log("api error", error);
    errorMsg(error.message);
  }
}
