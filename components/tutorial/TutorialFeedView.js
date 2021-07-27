import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import TutorialModalNoBackground from "../UI/modals/TutorialModalNoBackground";
import { useDispatch } from "react-redux";
import { withNavigation } from "react-navigation";
import { setTutorialing } from "../../store/actions/user";

const TutorialFeedView = (props) => {
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
    dispatch(setTutorialing(localId, ExhibitUId, true, "ExploreScreen"));
    props.navigation.navigate("Explore");
  };

  return (
    <TutorialModalNoBackground
      localId={localId}
      ExhibitUId={ExhibitUId}
      screen="CreateExhibit"
      modalContainerStyle={{ justifyContent: "flex-start" }}
      modalStyle={{ top: "15%" }}
      title={"Your Feed!"}
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
          Once you start following people or posting, posts will show here
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
          You can always pull down to refresh your feed
        </Text>
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          margin: 5,
          alignSelf: "center",
        }}
      >
        And you can cheer on posts by double-tapping
      </Text>
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

export default withNavigation(TutorialFeedView);
