import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setDarkMode } from "../../store/actions/user";
import FilterSwitch from "../UI/FilterSwitch";

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
        <SafeAreaView>
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
        <SafeAreaView>
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

export default LeftDrawer;
