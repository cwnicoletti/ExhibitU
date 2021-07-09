import React from "react";
import { View } from "react-native";

const TutorialModalNoBackground = (props) => {
  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        zIndex: 1,
      }}
    >
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          backgroundColor: "white",
          opacity: 0.2,
          zIndex: 2,
        }}
      />
      {props.children}
    </View>
  );
};

export default TutorialModalNoBackground;
