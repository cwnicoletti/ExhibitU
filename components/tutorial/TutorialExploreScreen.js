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
import { useDispatch } from "react-redux";
import { withNavigation } from "react-navigation";
import { setTutorialing } from "../../store/actions/user";

const TutorialExploreScreen = (props) => {
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
    dispatch(setTutorialing(localId, ExhibitUId, true, "ExploreProfile"));
    props.navigation.navigate("ExploreProfile");
  };

  return (
    <TutorialModalNoBackground
      localId={localId}
      ExhibitUId={ExhibitUId}
      screen="CreateExhibit"
      modalContainerStyle={{ justifyContent: "flex-start" }}
      modalStyle={{ top: "15%" }}
      title={"Explore Page"}
    >
      <View style={{ margin: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            margin: 5,
            alignSelf: "center",
          }}
        >
          Here you can search for other users
        </Text>
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
          You can search by their name, their username or even their title
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

export default withNavigation(TutorialExploreScreen);
