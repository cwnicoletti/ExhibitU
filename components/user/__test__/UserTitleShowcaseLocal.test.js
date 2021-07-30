import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "../../../store/reducers/auth";
import signupReducer from "../../../store/reducers/signup";
import userReducer from "../../../store/reducers/user";
import UserTitleShowcaseLocal from "../UserTitleShowcaseLocal";



test("renders correctly", () => {
  const rootReducer = combineReducers({
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
