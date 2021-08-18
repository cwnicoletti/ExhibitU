import { AUTHENTICATE, LOGOUT, AuthState } from "../actions/auth";

const intialState: AuthState = {
  userId: null,
  token: null,
};

export default (state = intialState, action) => {
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
