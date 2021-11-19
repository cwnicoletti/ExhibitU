import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const FeedItemExhibitButton = (props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={props.onSelect}>
      <LinearGradient
        style={{
          ...styles.container,
          ...props.titleContainer,
        }}
        colors={props.exhibitTitleColors}
      >
        <View style={styles.balance} />
        <View style={styles.titleTextContainer}>
          <Text style={{ ...styles.title, ...props.titleStyle }}>
            {props.exhibitTitle}
          </Text>
        </View>
        <AntDesign
          style={{ marginRight: 5 }}
          name="arrowright"
          size={28}
          color={props.arrowColor}
        />
      </LinearGradient>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },

  balance: {
    width: 24,
    height: "100%",
  },

  titleTextContainer: {
    flex: 1,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default FeedItemExhibitButton;
