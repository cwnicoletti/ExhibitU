import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ReduxThunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import projectsReducer from "./store/reducers/projects";
import authReducer from "./store/reducers/auth";
import darkModeReducer from "./store/reducers/darkMode";

import NavigationContainer from "./navigation/NavigationContainer";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  projects: projectsReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer />
      </SafeAreaProvider>
    </Provider>
  );
}
