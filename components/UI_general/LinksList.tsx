import React from "react";
import * as WebBrowser from "expo-web-browser";
import { View, StyleSheet } from "react-native";
import { useAppSelector } from "../../hooks";
import LinkButton from "./LinkButton";

const LinksList = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = props.links;

  return (
    <View style={styles.linksListContainer}>
      {links
        ? links.map((item: object) => (
            <LinkButton
              key={item["linkId"]}
              imageUrl={item[`linkImageUrl${item["linkId"]}`]}
              title={item[`linkTitle${item["linkId"]}`]}
              textStyle={{ color: darkModeValue ? "white" : "black" }}
              linkContainer={{
                width:
                  links.length === 1
                    ? "96%"
                    : links.length === 2
                    ? "46%"
                    : "28%",
              }}
              onPress={() =>
                WebBrowser.openBrowserAsync(item[`linkUrl${item["linkId"]}`])
              }
            />
          ))
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  linksListContainer: {
    marginVertical: 5,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default LinksList;
