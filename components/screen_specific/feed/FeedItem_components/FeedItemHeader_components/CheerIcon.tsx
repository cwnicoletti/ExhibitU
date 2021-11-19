import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Cheerfill from "../../../../../assets/Icons/clap-fill.svg";
import Cheer from "../../../../../assets/Icons/clap.svg";

const CheerIcon = (props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.container}>
      {props.loadingCheer ? (
        <ActivityIndicator
          size="small"
          color={props.darkModeValue ? "white" : "black"}
          style={styles.activityContainer}
        />
      ) : (
        <View>
          {props.cheering.includes(props.ExhibitUId) ? (
            <TouchableCmp onPress={props.unCheer}>
              <View>
                <Cheerfill
                  style={styles.clapContainer}
                  height={28}
                  width={28}
                  fill={props.darkModeValue ? "white" : "black"}
                />
              </View>
            </TouchableCmp>
          ) : (
            <TouchableCmp onPress={props.unCheer}>
              <View>
                <Cheer
                  style={styles.clapContainer}
                  height={28}
                  width={28}
                  fill={props.darkModeValue ? "white" : "black"}
                />
              </View>
            </TouchableCmp>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

  activityContainer: {
    marginRight: 15,
  },

  clapContainer: {
    flex: 1,
    marginRight: 10,
  },
});

export default CheerIcon;
