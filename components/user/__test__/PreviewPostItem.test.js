import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import authReducer from "../../../store/reducers/auth";
import signupReducer from "../../../store/reducers/signup";
import userReducer from "../../../store/reducers/user";
import PreviewPostItem from "../PreviewPostItem";

test("renders default", () => {
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
          <PreviewPostItem />
        </SafeAreaProvider>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders with dummy links", () => {
  const rootReducer = combineReducers({
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
          <PreviewPostItem links={links} />
        </SafeAreaProvider>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
