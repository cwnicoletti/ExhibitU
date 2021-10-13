import getNotificationPermissions from "./getNotificationPermissions";
import { setToken } from "../store/actions/user/user";

const uploadToken = async (dispatch, localId) => {
  const tokenValue = await getNotificationPermissions();

  if (tokenValue !== false) {
    dispatch(setToken(localId, tokenValue));
  }
};

export default uploadToken;
