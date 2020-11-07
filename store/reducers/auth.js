// import { SIGNIN, SIGNUP } from "../actions/auth";
import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const intialState = {
  token: null,
  userId: null,
};

export default (state = intialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    // case SIGNIN:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId,
    //   };
    case LOGOUT:
      return intialState;
    default:
      return state;
  }
};
