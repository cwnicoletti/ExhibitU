import React from "react";
import renderer from "react-test-renderer";
import BackTitleFollow from "../BackTitleFollow";
import authReducer from "../../../store/reducers/auth";
import signupReducer from "../../../store/reducers/signup";
import userReducer from "../../../store/reducers/user";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  signup: signupReducer,
  auth: authReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

test("matches previous snapshot and renders correctly", () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <BackTitleFollow navigation={{ getParam: jest.fn() }} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
