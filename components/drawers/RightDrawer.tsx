import {
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  SafeAreaView,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useAppSelector } from "../../hooks";

const RightDrawer = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View
      style={{
        ...styles.drawerContainer,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <View
        style={{
          ...styles.settingsTitleContainer,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
      >
        <SafeAreaView>
          <View style={styles.settingsTitleSafeAreaContainer}>
            <Feather
              name="settings"
              size={21}
              color={darkModeValue ? "white" : "black"}
            />
            <Text
              style={{
                ...styles.settingsTitleText,
                color: darkModeValue ? "white" : "black",
              }}
            >
              Settings
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.drawerFirstItemContainer}>
        <SimpleLineIcons
          name="trophy"
          size={20}
          color={darkModeValue ? "white" : "black"}
        />
        <TouchableCmp onPress={props.ShowcaseOnPress}>
          <View>
            <Text
              style={{
                ...styles.drawerItemText,
                color: darkModeValue ? "#bababa" : "black",
              }}
            >
              Profile
            </Text>
          </View>
        </TouchableCmp>
      </View>
      <View style={styles.drawerMiddleItemContainer}>
        <MaterialCommunityIcons
          name="update"
          size={20}
          color={darkModeValue ? "white" : "black"}
        />
        <TouchableCmp onPress={props.updatesOnPress}>
          <View>
            <Text
              style={{
                ...styles.drawerItemText,
                color: darkModeValue ? "#bababa" : "black",
              }}
            >
              Future Updates
            </Text>
          </View>
        </TouchableCmp>
      </View>
      <View style={styles.drawerLastItemContainer}>
        <View style={styles.drawerLastItemSubContainer}>
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={darkModeValue ? "white" : "black"}
          />
          <TouchableCmp onPress={props.logoutOnPress}>
            <View>
              <Text
                style={{
                  ...styles.drawerItemText,
                  color: darkModeValue ? "#bababa" : "black",
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableCmp>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  settingsTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  settingsTitleSafeAreaContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  settingsTitleText: {
    margin: 10,
    fontSize: 20,
  },
  drawerFirstItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    marginTop: 20,
  },
  drawerMiddleItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  drawerLastItemContainer: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 5,
  },
  drawerLastItemSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  drawerItemText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default RightDrawer;
