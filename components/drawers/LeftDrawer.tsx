import React from "react";
import { Image, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setDarkMode } from "../../store/actions/user/user";
import FilterSwitch from "../UI_general/FilterSwitch";

const LeftDrawer = () => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const fullname = useAppSelector((state) => state.user.fullname);
  const profilePictureUrl = useAppSelector(
    (state) => state.user.profilePictureUrl
  );

  return (
    <View
      style={{
        ...styles.drawerContainer,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <View
        style={{
          ...styles.userHeaderContainer,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
      >
        <SafeAreaView>
          <View style={styles.userHeader}>
            <Image
              style={styles.profileIcon}
              source={
                profilePictureUrl
                  ? { uri: profilePictureUrl }
                  : require("../../assets/default-profile-icon.jpg")
              }
            />
            <Text
              style={{
                ...styles.fullname,
                color: darkModeValue ? "white" : "black",
              }}
            >
              {fullname}
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <View style={styles.switchContainer}>
        <SafeAreaView>
          <FilterSwitch
            viewStyle={styles.switchStyle}
            labelStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            label="Dark Mode"
            state={darkModeValue}
            onChange={async (newValue) => {
              dispatch(setDarkMode(localId, ExhibitUId, newValue));
            }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 20,
  },

  userHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },

  userHeader: {
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },

  fullname: {
    fontSize: 16,
    margin: 10,
  },

  switchContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  switchStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
});

export default LeftDrawer;
