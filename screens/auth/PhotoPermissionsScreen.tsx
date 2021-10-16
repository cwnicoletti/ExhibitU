import React, { useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import getPhotoPermissions from "../../helper/getPhotoPermissions";

const PhotoPermissionsScreen = (props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const authHandler = async () => {
    await props.navigation.navigate("SignupNotificationPermissions");
  };

  useEffect(() => {
    if (!getPhotoPermissions()) {
      return;
    }
  }, []);

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        extraHeight={200}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          <Text style={styles.text}>Enable photo access</Text>
          <Text style={styles.smallerText}>
            In order to post pictures ExhibitU must have permission to access
            your phone's photos
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/default-post-icon.png")}
          />
          <View style={styles.authContainer}>
            <TouchableCmp onPress={authHandler}>
              <View
                style={{
                  borderColor: "#007AFF",
                  borderWidth: 1,
                  margin: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    margin: 10,
                    marginRight: 5,
                    color: "#007AFF",
                    fontSize: 16,
                  }}
                >
                  Next
                </Text>
                <Feather name="arrow-right" size={16} color={"#007AFF"} />
              </View>
            </TouchableCmp>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

PhotoPermissionsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: () => (
      <MainHeaderTitle
        darkModeValue={true}
        fontFamily={"CormorantUpright"}
        titleName={"ExhibitU"}
      />
    ),
    headerStyle: {
      backgroundColor: "black",
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "black",
  },
  inner: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    color: "white",
    marginTop: 20,
    fontSize: 22,
  },
  fullname: {
    color: "white",
    padding: 5,
    fontSize: 20,
  },
  smallerText: {
    color: "white",
    padding: 5,
    paddingBottom: 10,
    fontSize: 12,
  },
  authContainer: {
    shadowColor: null,
    shadowOpacity: null,
    shadowOffset: {
      width: null,
      height: null,
    },
    shadowRadius: null,
    elevation: null,
    borderRadius: null,
    backgroundColor: "black",
    width: "90%",
    maxWidth: 400,
    maxHeight: 400,
  },
  activityContainer: {
    marginTop: 10,
  },
  buttons: {
    alignItems: "center",
    paddingVertical: 10,
    color: "#00B7DB",
  },
});

export default PhotoPermissionsScreen;
