import getNotificationPermissions from "./getNotificationPermissions";
import { setToken } from "../store/actions/user/user";

const uploadToken = async (dispatch, localId, login) => {
  let tokenValue = "";
  if (login === true) {
    tokenValue = await getNotificationPermissions();
  }
  await dispatch(setToken(localId, tokenValue));
};

export default uploadToken;
