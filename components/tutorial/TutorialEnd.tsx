import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import TutorialModalNoBackground from "../UI/modals/TutorialModalNoBackground";
import { useAppDispatch } from "../../hooks";
import { withNavigation } from "react-navigation";
import { setTutorialing } from "../../store/actions/user";

const TutorialEnd = (props) => {
  const dispatch = useAppDispatch();

  const ExhibitUId = props.ExhibitUId;
  const localId = props.localId;

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const nextTutorialHandler = async () => {
    dispatch(setTutorialing(localId, ExhibitUId, false, "Start"));
  };

  return (
    <TutorialModalNoBackground
      localId={localId}
      ExhibitUId={ExhibitUId}
      screen="Start"
      title={"End of tutorial"}
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
          That's all you need to know!
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
            Finish
          </Text>
          <Feather
            name="check"
            size={16}
            color={"#007AFF"}
            style={{ alignSelf: "center" }}
          />
        </TouchableCmp>
      </View>
    </TutorialModalNoBackground>
  );
};

export default withNavigation(TutorialEnd);