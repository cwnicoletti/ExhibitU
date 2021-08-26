import React from "react";
import * as WebBrowser from "expo-web-browser";
import { View } from "react-native";
import { useAppSelector } from "../../hooks";
import LinkButton from "./LinkButton";

const LinksList = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const links = props.links;

  return (
    <View
      style={{
        marginVertical: 5,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {links.map((item) => (
        <LinkButton
          key={item["linkId"]}
          imageUrl={item[`linkImageUrl${item["linkId"]}`]}
          title={item[`linkTitle${item["linkId"]}`]}
          textStyle={{ color: darkModeValue ? "white" : "black" }}
          linkContainer={{
            width:
              links.length === 1 ? "96%" : links.length === 2 ? "46%" : "28%",
          }}
          onPress={() =>
            WebBrowser.openBrowserAsync(item[`linkUrl${item["linkId"]}`])
          }
        />
      ))}
    </View>
  );
};

export default LinksList;
