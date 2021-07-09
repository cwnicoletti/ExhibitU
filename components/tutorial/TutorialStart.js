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
import TutorialModalNoBackground from "../UI/TutorialModalNoBackground";
import EditButton from "../UI/EditButton";
import { useDispatch } from "react-redux";
import { withNavigation } from "react-navigation";
import { setTutorialing, setTutorialPrompt } from "../../store/actions/user";

const TutorialStart = (props) => {
  const dispatch = useDispatch();

  const ExhibitUId = props.ExhibitUId;
  const localId = props.localId;

  let android = null;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
    android = true;
  }

  const nextTutorialHandler = async () => {
    dispatch(setTutorialing(localId, ExhibitUId, true, "EditProfile"));
    props.navigation.navigate("EditProfile");
  };

  const endTutorialHandler = async () => {
    dispatch(setTutorialing(localId, ExhibitUId, false, "Start"));
    dispatch(setTutorialPrompt(localId, ExhibitUId, false));
  };

  return (
    <TutorialModalNoBackground>
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          width: "90%",
          backgroundColor: "black",
          zIndex: 3,
        }}
      >
        <TouchableCmp onPress={endTutorialHandler}>
          <Feather
            name="x-circle"
            size={24}
            color="red"
            style={{ alignSelf: "flex-end", marginTop: 20, marginRight: 20 }}
          />
        </TouchableCmp>
        <Text
          style={{
            color: "white",
            fontSize: 18,
            margin: 5,
            alignSelf: "center",
          }}
        >
          Welcome to the tutorial!
        </Text>
        {/* <Image
          style={{
            height: 100,
            width: 100,
            alignSelf: "center",
            marginBottom: 10,
          }}
          source={require("../../assets/default-profile-icon.jpg")}
        /> */}
        <View style={{ margin: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              margin: 5,
              alignSelf: "center",
            }}
          >
            First things first:
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              margin: 5,
              alignSelf: "center",
            }}
          >
            You can edit your profile with the "Edit Profile" button that looks
            like this
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
      </View>
    </TutorialModalNoBackground>
  );
};

export default withNavigation(TutorialStart);
