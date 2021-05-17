import React, { useRef, useState } from "react";
import { View, Animated } from "react-native";
import { useSelector } from "react-redux";
import useDidMountEffect from "../../helper/useDidMountEffect";
import MainBottomTabContainer from "../footers_components/MainBottomTabContainer";

const ProfileBottomTab = (props) => {
  const darkModeValue = useSelector((state) => state.switches.darkMode);
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

  if (showcasingProfile === true && hiddenProfileFooter === false) {
    slideDown();
    setHiddenProfileFooter(true);
  }

  return (
    <View>
      {!hiddenProfileFooter ? (
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <MainBottomTabContainer
            parentProps={props}
            darkModeValue={darkModeValue}
            screen={"Profile"}
          />
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
