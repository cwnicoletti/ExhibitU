import { Platform, Alert, Linking } from "react-native";
import * as Notifications from "expo-notifications";

const getNotificationPermissions = async () => {
  let token;
  if (Platform.OS === "ios") {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      await Alert.alert(
        "Notifications Denied",
        "We understand you don't want to recieve notifications. You can always change this at any time by going to settings.",
        [
          {
            text: "Continue",
            style: "default",
          },
          {
            text: "Go to Settings",
            onPress: () => {
              Linking.openURL("app-settings:");
            },
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () =>
            Alert.alert(
              "This alert was dismissed by tapping outside of the alert dialog."
            ),
        }
      );
      return false;
    } else {
      token = (await Notifications.getExpoPushTokenAsync()).data;
      return token;
    }
  } else if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

export default getNotificationPermissions;
