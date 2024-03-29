import React, { useEffect, useRef } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MainHeaderTitle from "../../components/UI_general/MainHeaderTitle";
import getPhotoPermissions from "../../helper/getPhotoPermissions";

const PhotoPermissionsScreen = (props) => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const authHandler = async () => {
    await props.navigation.navigate("SignupNotificationPermissions");
  };

  useEffect(() => {
    Animated.spring(fadeInAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    if (!getPhotoPermissions()) {
      return;
    }
  }, []);

  return (
    <View style={styles.screen}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "black",
          opacity: fadeInAnim,
        }}
      >
        <View style={styles.inner}>
          <Text style={styles.text}>Enable photo access</Text>
          <Text style={styles.smallerText}>
            In order to post pictures to your profile, ExhibitU must have
            permission to access your phone's photos
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
      </Animated.View>
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
    headerLeft: () => {},
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
    width: 300,
    height: 300,
  },

  text: {
    color: "white",
    marginTop: 20,
    fontSize: 22,
  },

  smallerText: {
    color: "white",
    padding: 5,
    paddingBottom: 10,
    fontSize: 12,
  },

  authContainer: {
    width: "90%",
    maxWidth: 400,
    maxHeight: 400,
  },

  activityContainer: {
    marginTop: 10,
  },
});

export default PhotoPermissionsScreen;
