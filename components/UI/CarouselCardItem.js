import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Cheer from "../../assets/Icons/clap.svg";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      {item.useImg1 ? (
        <Image source={{ uri: item.imgUrl1 }} style={styles.image1} />
      ) : null}
      {item.useImg2 ? (
        <Cheer
          style={{
            marginTop: "40%",
          }}
          height={100}
          width={100}
          fill="white"
        />
      ) : null}
      {item.useImg3 ? (
        <SimpleLineIcons
          name="user-follow"
          size={100}
          color="white"
          style={styles.image1}
        />
      ) : null}
      {item.useImg4 ? (
        <FontAwesome
          name="handshake-o"
          size={100}
          color="white"
          style={styles.image1}
        />
      ) : null}
      {item.useImg5 ? (
        <FontAwesome
          name="group"
          size={100}
          color="white"
          style={styles.image1}
        />
      ) : null}
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
  },
  image1: {
    width: 130,
    height: 125,
    marginTop: "40%",
  },
  image2: {
    width: "100%",
    height: "100%",
    marginTop: 40,
    marginBottom: 20,
  },
  image3: {
    width: "100%",
    height: "100%",
    marginTop: 40,
    marginBottom: 20,
  },
  image4: {
    width: "100%",
    height: "100%",
    marginTop: 40,
    marginBottom: 40,
  },
  header: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: "white",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
  },
});

export default CarouselCardItem;
