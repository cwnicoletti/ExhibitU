import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ReduxThunk from "redux-thunk";
import * as Notifications from "expo-notifications";

import projectsReducer from "./store/reducers/projects";
import authReducer from "./store/reducers/auth";
import switchesReducer from "./store/reducers/switches";
import userReducer from "./store/reducers/user";

import NavigationContainer from "./navigation/NavigationContainer";

// Clapping Icon made by Freepik (https://www.flaticon.com/authors/freepik)

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

const rootReducer = combineReducers({
  switches: switchesReducer,
  projects: projectsReducer,
  auth: authReducer,
  user: userReducer,
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
