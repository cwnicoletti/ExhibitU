import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import TutorialModalNoBackground from "../UI/TutorialModalNoBackground";
import { useDispatch, useSelector } from "react-redux";
import { withNavigation } from "react-navigation";
import { setTutorialing, setTutorialPrompt } from "../../store/actions/user";

const TutorialCreateExhibit = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.user.darkMode);

  const ExhibitUId = props.ExhibitUId;
  const localId = props.localId;

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const nextTutorialHandler = async () => {
    dispatch(setTutorialing(localId, ExhibitUId, true, "ExhibitCreation"));
    props.navigation.navigate("AddProject");
  };

  return (
    <TutorialModalNoBackground
      localId={localId}
      ExhibitUId={ExhibitUId}
      screen="CreateExhibit"
      modalContainerStyle={{ justifyContent: "flex-end" }}
      modalStyle={{ bottom: "15%" }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          margin: 5,
          alignSelf: "center",
        }}
      >
        Create an exhibit!
      </Text>
      <View style={{ margin: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            margin: 5,
            alignSelf: "center",
          }}
        >
          ExhibitU's main feature is creating exhibits with:
        </Text>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableCmp onPress={props.onAddNewProjectPress}>
            <View
              style={{
                marginTop: 10,
                paddingHorizontal: "20%",
                flexDirection: "row",
                borderColor: darkModeValue ? "gray" : "#c9c9c9",
                borderWidth: 1,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ios-add"
                size={14}
                color={darkModeValue ? "white" : "black"}
              />
              <Text
                style={{
                  margin: 7,
                  color: darkModeValue ? "white" : "black",
                }}
              >
                Create exhibit
              </Text>
            </View>
          </TouchableCmp>
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            margin: 5,
            alignSelf: "center",
          }}
        >
          Exhibits are a way of storing multiple pictures with captions
          showcasing your work
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "center",
          margin: 10,
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
          onPress={nextTutorialHandler}
        >
          <Text
            style={{
              margin: 5,
              color: "#007AFF",
              fontSize: 14,
            }}
          >
            Next
          </Text>
          <Feather
            name="arrow-right"
            size={16}
            color={"#007AFF"}
            style={{ alignSelf: "center" }}
          />
        </TouchableCmp>
      </View>
    </TutorialModalNoBackground>
  );
};

export default withNavigation(TutorialCreateExhibit);
