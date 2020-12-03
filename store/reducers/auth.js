// import { SIGNIN, SIGNUP } from "../actions/auth";
import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const intialState = {
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
