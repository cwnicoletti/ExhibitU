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

test("renders with multiple dummy links", () => {
  const rootReducer = combineReducers({
    signup: signupReducer,
    auth: authReducer,
    user: userReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  const links = {
    ["link1"]: {
      linkId: "1",
      linktitle1: "link1",
      linkUrl1: "link1",
    },
    ["link2"]: {
      linkId: "2",
      linktitle1: "link2",
      linkUrl1: "link2",
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

test("renders with random image", () => {
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
          <PreviewPostItem image={"https://i.picsum.photos/id/431/200/300.jpg?hmac=aUpIWBq8svIaK2ruTnNG-BZuvcDsK9Mr9PuJuYAYEQ0"} />
        </SafeAreaProvider>
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

