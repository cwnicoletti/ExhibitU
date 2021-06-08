import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { onScreen, resetScroll } from "../../store/actions/user";



const ExploreBottomTab = ({ navigation }) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.user.darkMode);
  const onExploreScreen = useSelector((state) => state.user.onExploreScreen);

  return (
    <View>
      <MainBottomTabContainer
        parentProps={props}
        darkModeValue={darkModeValue}
        screen={"Explore"}
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

export default ExploreBottomTab;
