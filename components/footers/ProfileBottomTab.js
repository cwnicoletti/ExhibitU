import React, { useEffect, useRef, useState } from "react";
import { View, TouchableWithoutFeedback, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import useDidMountEffect from "../helper/useDidMountEffect";

import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import {
  resetScroll,
  onScreen,
  setHideProfileFooter,
} from "../../store/actions/user";

const ProfileBottomTab = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const onProfileScreen = useSelector((state) => state.user.onProfileScreen);
  const showcasingProfile = useSelector(
    (state) => state.user.showcasingProfile
  );
  const [hiddenProfileFooter, setHiddenProfileFooter] = useState(false);

  let slideAnim = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 350,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        slideAnim.setValue(100);
      }
    });
  };

  useDidMountEffect(() => {
    if (showcasingProfile === false) {
      setHiddenProfileFooter(false);
    }

    if (showcasingProfile === false && hiddenProfileFooter === false) {
      slideUp();
    }
  }, [hiddenProfileFooter]);

  useEffect(() => {
    if (showcasingProfile === true && hiddenProfileFooter === false) {
      slideDown();
      setHiddenProfileFooter(true);
    }
  }, []);

  return (
    <View>
      {!hiddenProfileFooter ? (
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate("Feed");
              }}
            >
              <View
                style={{
                  flex: 1,
                  padding: 20,
                  borderTopWidth: 1,
                  borderColor: "gray",
                  backgroundColor: darkModeValue ? "black" : "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ios-home"
                  size={25}
                  color={
                    props.navigation.isFocused()
                      ? "gray"
                      : [darkModeValue ? "white" : "black"]
                  }
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate("Explore");
              }}
            >
              <View
                style={{
                  flex: 1,
                  padding: 20,
                  borderTopWidth: 1,
                  borderColor: "gray",
                  backgroundColor: darkModeValue ? "black" : "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ios-search"
                  size={25}
                  color={
                    props.navigation.isFocused()
                      ? "gray"
                      : [darkModeValue ? "white" : "black"]
                  }
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                if (onProfileScreen) {
                  dispatch(resetScroll("Profile"));
                } else {
                  dispatch(onScreen("Profile"));
                }
                props.navigation.navigate("Profile");
              }}
            >
              <View
                style={{
                  flex: 1,
                  padding: 20,
                  borderTopWidth: 1,
                  borderColor: "gray",
                  backgroundColor: darkModeValue ? "black" : "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SimpleLineIcons
                  name="trophy"
                  size={25}
                  color={darkModeValue ? "white" : "black"}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: darkModeValue ? "black" : "white",
            }}
          />
        </Animated.View>
      ) : null}
    </View>
  );
};

export default ProfileBottomTab;
