import {
    INTROING,
    SIGNUP_EMAIL,
    SIGNUP_FULLNAME,
    SIGNUP_USERNAME
} from "../actions/signup";

const intialState = {
  introing: false,
  email: "",
  fullname: "",
  username: "",
};

export default (state = intialState, action) => {
  switch (action.type) {
    case INTROING:
      return {
        ...state,
        introing: action.introing,
      };
    case SIGNUP_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case SIGNUP_FULLNAME:
      return {
        ...state,
        fullname: action.fullname,
      };
    case SIGNUP_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};
