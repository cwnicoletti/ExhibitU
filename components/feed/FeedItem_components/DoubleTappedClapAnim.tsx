import React from "react";
import { Animated, StyleSheet } from "react-native";
import Cheerfill from "../../../assets/Icons/clap-fill.svg";
import Cheer from "../../../assets/Icons/clap.svg";

const DoubleTappedClapAnim = (props) => {
  return (
    <Animated.View
      style={{
        ...styles.container,
        opacity: props.fadeAnim,
        transform: [{ translateY: props.slideAnim }],
      }}
    >
      {props.clap ? (
        <Cheerfill
          style={{
            marginTop: props.height,
            ...props.clapContainer,
          }}
          height={props.height / 5}
          width={props.width / 5}
          fill={props.darkModeValue ? "white" : "black"}
        />
      ) : (
        <Cheer
          style={{
            marginTop: props.height,
            ...props.clapContainer,
            transform: [{ rotate: "5deg" }],
          }}
          height={props.height / 5}
          width={props.width / 5}
          fill={props.darkModeValue ? "white" : "black"}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DoubleTappedClapAnim;
