import React from "react";
import {
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setTutorialing } from "../../../store/actions/user";

const TutorialModalNoBackgroundNoX = (props) => {
  const dispatch = useDispatch();

  const ExhibitUId = props.ExhibitUId;
  const localId = props.localId;

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const endTutorialHandler = async () => {
    dispatch(setTutorialing(localId, ExhibitUId, false, props.screen));
  };

  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        zIndex: 1,
        ...props.modalContainerStyle,
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
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          justifyContent: "center",
          width: "90%",
          backgroundColor: "black",
          zIndex: 3,
          ...props.modalStyle,
        }}
      >
        {props.children}
      </View>
    </View>
  );
};

export default TutorialModalNoBackgroundNoX;
