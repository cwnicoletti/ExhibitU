import React from "react";
import ProfileHeader from "../ProfileHeader";
import renderer from "react-test-renderer";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ReduxThunk from "redux-thunk";

import authReducer from "../../../store/reducers/auth";
import switchesReducer from "../../../store/reducers/user";
import userReducer from "../../../store/reducers/user";
import signupReducer from "../../../store/reducers/signup";

test("renders default", () => {
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
          <ProfileHeader />
        </SafeAreaProvider>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders with dummy links", () => {
  const rootReducer = combineReducers({
    user: switchesReducer,
    signup: signupReducer,
    auth: authReducer,
    user: userReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  const links = {
    ["link1"]: {
      linktitle1: "test",
      linkUrl1: "test",
    },
  };

  const tree = renderer
    .create(
      <Provider store={store}>
        <SafeAreaProvider>
          <ProfileHeader links={links} />
        </SafeAreaProvider>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
