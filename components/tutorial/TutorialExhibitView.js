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
import EditButton from "../UI/EditButton";
import { setTutorialing } from "../../store/actions/user";

const TutorialExhibitView = (props) => {
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
    dispatch(setTutorialing(localId, ExhibitUId, true, "PostCreation"));
    props.navigation.navigate("AddPicture");
  };

  return (
    <TutorialModalNoBackground
      localId={localId}
      ExhibitUId={ExhibitUId}
      screen="CreateExhibit"
      modalContainerStyle={{ justifyContent: "flex-end" }}
      modalStyle={{ top: "2%" }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
          margin: 20,
          alignSelf: "center",
        }}
      >
        Your Exhibit Screen
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
          Here you can see your exhibit and the posts you add to it
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            margin: 5,
            alignSelf: "center",
          }}
        >
          You can also edit certain areas of your exhibit like the title,
          description, and links with:
        </Text>
      </View>
      <View style={{ width: "80%", alignSelf: "center", alignItems: "center" }}>
        <EditButton
          editText="Edit exhibit"
          onPress={props.onEditProfilePress}
        />
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            margin: 5,
            alignSelf: "center",
          }}
        >
          To create a post, you can click the plus icon in the top right of your
          phone:
        </Text>
      </View>
      <Ionicons
        name="ios-add"
        size={23}
        color="white"
        style={{ alignSelf: "center" }}
      />
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

export default withNavigation(TutorialExhibitView);
