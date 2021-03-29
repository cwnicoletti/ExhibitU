import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ReduxThunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import authReducer from "./store/reducers/auth";
import switchesReducer from "./store/reducers/switches";
import userReducer from "./store/reducers/user";
import signupReducer from "./store/reducers/signup";

import NavigationContainer from "./navigation/NavigationContainer";

// Clapping, default project icon made by Freepik (https://www.flaticon.com/authors/freepik)

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

const rootReducer = combineReducers({
  switches: switchesReducer,
  signup: signupReducer,
  auth: authReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer />
      </SafeAreaProvider>
    </Provider>
  );
};
