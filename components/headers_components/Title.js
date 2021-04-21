import React from "react";
import { StyleSheet } from "react-native";
import IconWhite from "../../assets/creatist_icon_transparent_white.png";
import IconBlack from "../../assets/creatist_icon_transparent_black.png";

const Title = (props) => {
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
        {props.darkModeValue ? (
          <props.Image style={styles.image} source={IconWhite} />
        ) : (
          <props.Image style={styles.image} source={IconBlack} />
        )}
        <props.Text
          style={{
            ...styles.logoTitle,
            color: props.darkModeValue ? "white" : "black",
          }}
        >
          Creatist
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
