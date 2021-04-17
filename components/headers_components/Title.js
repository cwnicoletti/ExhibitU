import React from "react";
import { StyleSheet } from "react-native";
import IconWhite from "../../assets/showcase_icon_transparent_white.png";
import IconBlack from "../../assets/showcase_icon_transparent_black.png";

const Title = (props) => {
  return (
    <props.View
      style={{
        flex: 5,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "gray",
        backgroundColor: props.darkModeValue ? "black" : "white",
      }}
    >
      <props.View style={styles.logo}>
        <props.Text
          style={{
            ...styles.logoTitle,
            color: props.darkModeValue ? "white" : "black",
          }}
        >
          Showcase
        </props.Text>
      </props.View>
    </props.View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  logo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 22,
  },
});

export default Title;
