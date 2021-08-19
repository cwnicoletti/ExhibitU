import { AUTHENTICATE, LOGOUT, AuthState, Action } from "../actions/auth/types";

const intialState: AuthState = {
  userId: null,
  token: null,
};

export default (state = intialState, action: Action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userId: action.userId,
        token: action.token,
      };
    case LOGOUT:
      return intialState;
    default:
      return state;
  }
};
