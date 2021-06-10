// Clapping icon & default project icon made by Freepik (https://www.flaticon.com/authors/freepik)
import React from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import NavigationContainer from "./navigation/NavigationContainer";
import authReducer from "./store/reducers/auth";
import signupReducer from "./store/reducers/signup";
import userReducer from "./store/reducers/user";
import * as firebase from "firebase";
// import * as Notifications from "expo-notifications";
import { apikey, authDomain, databaseURL, storageBucket } from "./config";

// Initialize Firebase
const firebaseConfig = {
  apiKey: apikey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  storageBucket: storageBucket,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

const rootReducer = combineReducers({
  signup: signupReducer,
  auth: authReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: "#000000" }}>
          <NavigationContainer />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
};
