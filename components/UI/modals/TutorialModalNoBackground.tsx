import React from "react";
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAppDispatch } from "../../../hooks";
import { setTutorialing } from "../../../store/actions/user";

const TutorialModalNoBackground = (props) => {
  const dispatch = useAppDispatch();

  const ExhibitUId = props.ExhibitUId;
  const localId = props.localId;

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 20,
          }}
        >
          <View style={{ flex: 1 }} />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              margin: 5,
              flex: 10,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            {props.title}
          </Text>
          <TouchableCmp onPress={endTutorialHandler} style={{ flex: 1 }}>
            <Feather name="x" size={23} color="red" />
          </TouchableCmp>
        </View>
        {props.children}
      </View>
    </View>
  );
};

export default TutorialModalNoBackground;
