import React from "react";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Title = (props) => {
  const [loaded] = useFonts({
    CormorantUpright: require("../../assets/fonts/CormorantUpright-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <props.View
      style={{
        flex: 6,
        paddingTop: 9,
        paddingBottom: 7,
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
    fontSize: 26,
  },
});

export default Title;
