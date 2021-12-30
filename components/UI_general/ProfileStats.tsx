import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const ProfileStats = (props) => {
  const darkModeValue = props.darkModeValue;
  const followersValue = props.followersValue;
  const followingValue = props.followingValue;
  const exhibitsValue = props.exhibitsValue;
  const followersOnPress = props.followersOnPress;
  const followingOnPress = props.followingOnPress;
  const numberOfFollowers = props.numberOfFollowers;
  const numberOfFollowing = props.numberOfFollowing;
  const numberOfExhibits = props.numberOfExhibits;

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.statsContainer}>
      {!followersValue ? (
        <TouchableCmp
          style={{
            ...styles.container,
            borderColor: darkModeValue ? "gray" : "#c9c9c9",
          }}
          onPress={followersOnPress}
        >
          <View
            style={{
              ...styles.subContainer,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
          >
            <Text
              style={{
                ...styles.textStyle,
                color: darkModeValue ? "white" : "black",
              }}
            >
              Followers
            </Text>
            <Text
              style={{
                ...styles.numberOf,
                color: darkModeValue ? "white" : "black",
              }}
            >
              {numberOfFollowers}
            </Text>
          </View>
        </TouchableCmp>
      ) : null}
      {!followingValue ? (
        <TouchableCmp
          style={{
            ...styles.container,
            borderColor: darkModeValue ? "gray" : "#c9c9c9",
          }}
          onPress={followingOnPress}
        >
          <View
            style={{
              ...styles.subContainer,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
          >
            <Text
              style={{
                ...styles.textStyle,
                color: darkModeValue ? "white" : "black",
              }}
            >
              Following
            </Text>
            <Text
              style={{
                ...styles.numberOf,
                color: darkModeValue ? "white" : "black",
              }}
            >
              {numberOfFollowing}
            </Text>
          </View>
        </TouchableCmp>
      ) : null}
      {!exhibitsValue ? (
        <View
          style={{
            ...styles.container,
            borderColor: darkModeValue ? "gray" : "#c9c9c9",
          }}
        >
          <View
            style={{
              ...styles.subContainer,
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
          >
            <Text
              style={{
                ...styles.textStyle,
                color: darkModeValue ? "white" : "black",
              }}
            >
              Exhibits
            </Text>
            <Text
              style={{
                ...styles.numberOf,
                color: darkModeValue ? "white" : "black",
              }}
            >
              {numberOfExhibits}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    marginTop: 5,
    flexDirection: "row",
  },

  container: {
    flex: 1,
    alignItems: "center",
  },

  subContainer: {
    flex: 1,
    alignItems: "center",
  },

  textStyle: {
    margin: 5,
    fontWeight: "bold",
  },

  numberOf: {
    fontSize: 15,
    marginBottom: 5,
  },
});

export default ProfileStats;
