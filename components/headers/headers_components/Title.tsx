import React from "react";
import { StyleSheet } from "react-native";

const Title = (props) => {
  return (
    <props.View
      style={{
        ...styles.container,
        backgroundColor: props.darkModeValue ? "black" : "white",
      }}
    >
      <props.View style={styles.logo}>
        <props.Text
          style={{
            ...styles.logoTitle,
            color: props.darkModeValue ? "white" : "black",
            fontFamily: "CormorantUpright",
          }}
        >
          ExhibitU
        </props.Text>
      </props.View>
    </props.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    paddingTop: 9,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor: "gray",
  },

  logo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoTitle: {
    fontSize: 26,
  },
});

export default Title;
