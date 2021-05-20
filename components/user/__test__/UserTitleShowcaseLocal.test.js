import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "../../../store/reducers/auth";
import signupReducer from "../../../store/reducers/signup";
import { default as switchesReducer, default as userReducer } from "../../../store/reducers/user";
import UserTitleExhibitULocal from "../UserTitleExhibitULocal";



test("renders correctly", () => {
  const rootReducer = combineReducers({
    user: switchesReducer,
    signup: signupReducer,
    auth: authReducer,
    user: userReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  const tree = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <UserTitleExhibitULocal />
        </SafeAreaProvider>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
