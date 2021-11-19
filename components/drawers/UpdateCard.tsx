import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

const UpdateCard = (props) => {
  let Component = null;
  switch (props.iconFamily) {
    case "Entypo":
      const { Entypo } = require("@expo/vector-icons");
      Component = Entypo;
      break;
    case "EvilIcons":
      const { EvilIcons } = require("@expo/vector-icons");
      Component = EvilIcons;
      break;
    case "FontAwesome":
      const { FontAwesome } = require("@expo/vector-icons");
      Component = FontAwesome;
      break;
    case "MaterialIcons":
      const { MaterialIcons } = require("@expo/vector-icons");
      Component = MaterialIcons;
      break;
    case "Foundation":
      const { Foundation } = require("@expo/vector-icons");
      Component = Foundation;
      break;
    default:
      break;
  }

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.exhibit, ...props.exhibitContainer }}>
      {!props.iconFamily || !props.iconName || Component == null ? null : (
        <Component
          name={props.iconName}
          size={24}
          color={props.darkModeValue ? "white" : "black"}
        />
      )}
      <View style={styles.touchable}>
        <Text style={{ ...styles.title, ...props.titleStyle }}>
          {props.updateTitle}
        </Text>
        <Text style={{ ...styles.body, ...props.bodyStyle }}>
          {props.updateBody}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exhibit: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 100,
    width: "80%",
  },

  title: {
    fontWeight: "500",
    fontSize: 12,
    margin: 20,
    marginBottom: 10,
  },

  body: {
    fontWeight: "300",
    fontSize: 12,
    marginHorizontal: 20,
  },
  
  touchable: {
    overflow: "hidden",
  },
});

export default UpdateCard;
