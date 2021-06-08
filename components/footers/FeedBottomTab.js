import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { onScreen, resetScroll } from "../../store/actions/user";



const FeedBottomTab = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const onFeedScreen = useSelector((state) => state.user.onFeedScreen);

  return (
    <View>
      <MainBottomTabContainer
        parentProps={props}
        darkModeValue={darkModeValue}
        screen={"Feed"}
      />
      <View
        style={{
          padding: 8,
          backgroundColor: darkModeValue ? "black" : "white",
        }}
      />
    </View>
  );
};

export default FeedBottomTab;
