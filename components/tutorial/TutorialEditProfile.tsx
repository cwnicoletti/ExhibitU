import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import TutorialModalNoBackground from "../UI/modals/TutorialModalNoBackground";
import { useAppDispatch } from "../../hooks";
import { withNavigation } from "react-navigation";
import { setTutorialing } from "../../store/actions/user/user";

const TutorialEditProfile = (props) => {
  const dispatch = useAppDispatch();

  const ExhibitUId = props.ExhibitUId;
  const localId = props.localId;

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const nextTutorialHandler = async () => {
    dispatch(setTutorialing(localId, ExhibitUId, true, "CreateExhibit"));
    props.navigation.goBack();
  };

  return (
    <TutorialModalNoBackground
      localId={localId}
      ExhibitUId={ExhibitUId}
      screen="EditProfile"
      title={"Edit Profile Screen"}
    >
      <Image
        style={{
          height: 100,
          width: 100,
          alignSelf: "center",
          marginBottom: 10,
        }}
        source={require("../../assets/default-profile-icon.jpg")}
      />
      <View style={{ margin: 10 }}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            margin: 5,
            alignSelf: "center",
          }}
        >
          Here you can change your name, username, your title, and your
          biography.
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
          You can even add multiple links to your profile!
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

export default withNavigation(TutorialEditProfile);
