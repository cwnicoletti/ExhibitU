import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import TutorialModalWithBackground from "../UI/TutorialModalNoBackground";
import { useDispatch } from "react-redux";
import { setTutorialing, setTutorialPrompt } from "../../store/actions/user";

const TutorialPrompt = (props) => {
  const dispatch = useDispatch();
  const [isLoadingTutorial, setIsLoadingTutorial] = useState(false);
  const [isLoadingSkip, setIsLoadingSkip] = useState(false);

  const ExhibitUId = props.ExhibitUId;
  const localId = props.localId;

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const startTutorialHandler = async () => {
    await setIsLoadingTutorial(true);
    dispatch(setTutorialing(localId, ExhibitUId, true, "Start"));
    await setIsLoadingTutorial(false);
    await dispatch(setTutorialPrompt(localId, ExhibitUId, false));
  };

  const skipTutorialHandler = async () => {
    await setIsLoadingSkip(true);
    dispatch(setTutorialing(localId, ExhibitUId, false, "Start"));
    await setIsLoadingSkip(false);
    await dispatch(setTutorialPrompt(localId, ExhibitUId, false));
  };

  return (
    <TutorialModalWithBackground>
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
            A tutorial can be found in the right side bar.
          </Text>
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
          {isLoadingTutorial ? (
            <View
              style={{
                flex: 1,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
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
                  margin: 5,
                  color: "#007AFF",
                  fontSize: 14,
                }}
              >
                Wait, start the tutorial!
              </Text>
              <FontAwesome
                name="graduation-cap"
                size={16}
                color={"#007AFF"}
                style={{ alignSelf: "center" }}
              />
            </TouchableCmp>
          )}
          {isLoadingSkip ? (
            <View
              style={{
                flex: 1,
                margin: 5,
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
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
                  margin: 5,
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
          )}
        </View>
      </View>
    </TutorialModalWithBackground>
  );
};

export default TutorialPrompt;
