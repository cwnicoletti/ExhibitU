import React from "react";
import UserTitleShowcaseLocal from "../UserTitleShowcaseLocal";
import renderer from "react-test-renderer";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ReduxThunk from "redux-thunk";

import authReducer from "../../../store/reducers/auth";
import switchesReducer from "../../../store/reducers/switches";
import userReducer from "../../../store/reducers/user";
import signupReducer from "../../../store/reducers/signup";

test("renders correctly", () => {
  const rootReducer = combineReducers({
    switches: switchesReducer,
    signup: signupReducer,
    auth: authReducer,
    user: userReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  const tree = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <UserTitleShowcaseLocal />
        </SafeAreaProvider>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});