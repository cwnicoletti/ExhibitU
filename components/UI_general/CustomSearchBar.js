import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useAppSelector } from "../../hooks";

const CustomSearchBar = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ alignItems: "center" }}>
        {props.numberOfCheers ? (
          <Text style={{ marginTop: 10 }}>{props.numberOfCheers} Cheering</Text>
        ) : null}
        <SearchBar
          containerStyle={{
            ...styles.searchBarContainerStyle,
            backgroundColor: darkModeValue ? "black" : "white",
          }}
          inputContainerStyle={{
            ...styles.searchBarInputContainerStyle,
            backgroundColor: darkModeValue ? "black" : "white",
          }}
          searchIcon={
            <EvilIcons
              name="search"
              size={24}
              color={darkModeValue ? "white" : "black"}
            />
          }
          clearIcon={
            props.search ? (
              <Feather
                name="x"
                size={24}
                color={darkModeValue ? "white" : "black"}
                onPress={() => {
                  props.searchFilterFunction("");
                }}
              />
            ) : null
          }
          onChangeText={(text) => props.searchFilterFunction(text)}
          onClear={() => {
            props.searchFilterFunction("");
          }}
          placeholder="Search..."
          value={props.search}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchBarContainerStyle: {
    margin: 5,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    width: "80%",
  },

  searchBarInputContainerStyle: {
    height: 30,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
});

export default CustomSearchBar;
