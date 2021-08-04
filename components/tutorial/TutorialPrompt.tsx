import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import TutorialModalNoBackgroundNoX from "../UI/modals/TutorialModalNoBackgroundNoX";
import { useAppDispatch } from "../../hooks";
import { setTutorialing, setTutorialPrompt } from "../../store/actions/user";

const TutorialPrompt = (props) => {
  const dispatch = useAppDispatch();

  const ExhibitUId = props.ExhibitUId;
  const localId = props.localId;

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const startTutorialHandler = async () => {
    dispatch(setTutorialing(localId, ExhibitUId, true, "Start"));
    await dispatch(setTutorialPrompt(localId, ExhibitUId, false));
  };

  const skipTutorialHandler = async () => {
    dispatch(setTutorialing(localId, ExhibitUId, false, "Start"));
    await dispatch(setTutorialPrompt(localId, ExhibitUId, false));
  };

  return (
    <TutorialModalNoBackgroundNoX>
      <AntDesign
        name="arrowup"
        size={25}
        color="white"
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          justifyContent: "center",
          zIndex: 3,
          alignSelf: "center",
        }}
      />
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          width: "90%",
          backgroundColor: "black",
          zIndex: 3,
        }}
      >
        <FontAwesome
          name="graduation-cap"
          size={100}
          color="white"
          style={{ alignSelf: "center", margin: 20 }}
        />
        <View style={{ margin: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              margin: 5,
              alignSelf: "center",
            }}
          >
            Heads up!
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              margin: 5,
              alignSelf: "center",
            }}
          >
            A tutorial can be found in the right side bar by tapping on the
            icon:
          </Text>
          <Feather
            name="settings"
            size={21}
            color={"white"}
            style={{ alignSelf: "center", margin: 20 }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              margin: 5,
              alignSelf: "center",
            }}
          >
            Thats all! Enjoy ExhibitU
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "center",
            margin: 5,
          }}
        >
          <TouchableCmp
            style={{
              flex: 1,
              borderColor: "#007AFF",
              borderWidth: 1,
              margin: 5,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={startTutorialHandler}
          >
            <Text
              style={{
                color: "#007AFF",
                fontSize: 14,
                padding: 5,
              }}
            >
              Start the tutorial!
            </Text>
            <FontAwesome
              name="graduation-cap"
              size={16}
              color={"#007AFF"}
              style={{ alignSelf: "center" }}
            />
          </TouchableCmp>
          <TouchableCmp
            style={{
              flex: 1,
              borderColor: "#007AFF",
              borderWidth: 1,
              margin: 5,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={skipTutorialHandler}
          >
            <Text
              style={{
                padding: 5,
                color: "#007AFF",
                fontSize: 14,
              }}
            >
              Continue to profile
            </Text>
            <Feather
              name="arrow-right"
              size={16}
              color={"#007AFF"}
              style={{ alignSelf: "center" }}
            />
          </TouchableCmp>
        </View>
      </View>
    </TutorialModalNoBackgroundNoX>
  );
};

export default TutorialPrompt;
