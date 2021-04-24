import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import FilterSwitch from "../UI/FilterSwitch";

import { setDarkMode } from "../../store/actions/switches";

const LeftDrawer = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const localId = useSelector((state) => state.auth.userId);
  const ExhibitUId = useSelector((state) => state.user.ExhibitUId);
  const fullname = useSelector((state) => state.user.fullname);
  const profilePictureUrl = useSelector(
    (state) => state.user.profilePictureUrl
  );

  return (
    <View
      forceInset={{ top: "always", horizontal: "never" }}
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: darkModeValue ? "black" : "white",
        borderRightWidth: 0.3,
        borderRightColor: darkModeValue ? "white" : "black",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
      >
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ height: 50, width: 50, borderRadius: 50 / 2 }}
              source={
                profilePictureUrl
                  ? { uri: profilePictureUrl }
                  : require("../../assets/default-profile-icon.jpg")
              }
            />
            <Text
              style={{
                color: darkModeValue ? "white" : "black",
                fontSize: 16,
                margin: 10,
              }}
            >
              {fullname}
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
          <FilterSwitch
            viewStyle={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
            }}
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

const styles = StyleSheet.create({});

export default LeftDrawer;
