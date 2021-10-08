import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  resetScroll,
  onScreen,
  refreshNotifications,
} from "../../store/actions/user/user";
import { useAppSelector, useAppDispatch } from "../../hooks";

const Notifications = (props) => {
  const dispatch = useAppDispatch();
  const localId = useAppSelector((state) => state.auth.userId);

  const onNotificationscreen = useAppSelector(
    (state) => state.user.onNotificationsScreen
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (props.isCurrentScreen) {
          if (onNotificationscreen) {
            dispatch(resetScroll("Notifications"));
          } else {
            dispatch(onScreen("Notifications"));
          }
          props.parentProps.navigation.navigate("Notifications");
        } else {
          dispatch(refreshNotifications(localId));
          props.parentProps.navigation.navigate("Notifications");
        }
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 20,
          borderTopWidth: 1,
          borderColor: "gray",
          backgroundColor: props.darkModeValue ? "black" : "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Entypo
          name="notification"
          size={25}
          color={
            props.isCurrentScreen
              ? props.darkModeValue
                ? "white"
                : "black"
              : props.parentProps.navigation.isFocused()
              ? "gray"
              : props.darkModeValue
              ? "white"
              : "black"
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Notifications;
