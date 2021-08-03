import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
} from "react-native";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import TutorialModalNoBackground from "../UI/modals/TutorialModalNoBackground";
import EditButton from "../UI/EditButton";
import { useAppDispatch } from "../../hooks";
import { withNavigation } from "react-navigation";
import { setTutorialing } from "../../store/actions/user";

const TutorialStart = (props) => {
  const dispatch = useAppDispatch();

  const ExhibitUId = props.ExhibitUId;
  const localId = props.localId;

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const nextTutorialHandler = async () => {
    dispatch(setTutorialing(localId, ExhibitUId, true, "EditProfile"));
    props.navigation.navigate("EditProfile");
  };

  return (
    <TutorialModalNoBackground
      localId={localId}
      ExhibitUId={ExhibitUId}
      screen="Start"
      title={"Welcome to the tutorial!"}
    >
      <View style={{ margin: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            margin: 5,
            alignSelf: "center",
          }}
        >
          First things first,
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            margin: 5,
            alignSelf: "center",
          }}
        >
          You can edit your profile with the button:
        </Text>
        <View
          style={{ width: "80%", alignSelf: "center", alignItems: "center" }}
        >
          <EditButton
            editText="Edit profile"
            onPress={props.onEditProfilePress}
          />
        </View>
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

export default withNavigation(TutorialStart);
