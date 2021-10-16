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
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import { Feather } from "@expo/vector-icons";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import uploadToken from "../../helper/uploadToken";

const NotificationPermissionsScreen = (props) => {
  const dispatch = useAppDispatch();
  const localId = useAppSelector((state) => state.auth.userId);

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const authHandler = async () => {
    await props.navigation.navigate("Exhibit");
  };

  useEffect(() => {
    uploadToken(dispatch, localId);
  }, []);

  return (
    <View style={styles.screen}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        extraHeight={200}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          <Text style={styles.text}>Enable Notifications</Text>
          <Text style={styles.smallerText}>
            We can only send you notifications if you give us permission
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/default-profile-icon.jpg")}
          />
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
      </KeyboardAwareScrollView>
    </View>
  );
};

NotificationPermissionsScreen.navigationOptions = (navData) => {
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
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Back"
          iconName={"ios-arrow-back"}
          color={"white"}
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
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

export default NotificationPermissionsScreen;
