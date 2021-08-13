import { Platform, Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";

const getPhotoPermissions = async () => {
  if (Platform.OS === "ios") {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted !== true) {
      await Alert.alert(
        "Permission Denied",
        "Sorry, we need permission to access your photo library to make this work!",
        [
          {
            text: "Go to Settings",
            onPress: () => {
              Linking.openURL("app-settings:");
            },
            style: "default",
          },
          {
            text: "Cancel",
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
      return true;
    }
  } else if (Platform.OS === "android") {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted !== true) {
      await Alert.alert(
        "Permission Denied",
        "Sorry, we need permission to access your photo library to make this work!",
        [
          {
            text: "OK",
            style: "default",
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
      return true;
    }
  }
};

export default getPhotoPermissions;
