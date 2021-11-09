import getNotificationPermissions from "./getNotificationPermissions";
import { setToken } from "../store/actions/user/user";

const uploadToken = (localId, inputTokenValue) => {
  return async (dispatch) => {
    let tokenValue;
    if (inputTokenValue === "") {
      tokenValue = inputTokenValue;
    } else {
      tokenValue = await getNotificationPermissions();
    }

    if (tokenValue !== false) {
      dispatch(setToken(localId, tokenValue));
    }
  };
};

export default uploadToken;
