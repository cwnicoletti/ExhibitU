import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import FilterSwitch from "../../components/UI/FilterSwitch";
import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import {
  setShowCheering,
  setHideFollowing,
  setHideFollowers,
  setHideAdvocates,
} from "../../store/actions/switches";

const DiamondCaseSettingsScreen = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const showCheeringValue = useSelector((state) => state.switches.showCheering);
  const followingValue = useSelector((state) => state.switches.hideFollowing);
  const followersValue = useSelector((state) => state.switches.hideFollowers);
  const advocatesValue = useSelector((state) => state.switches.hideAdvocates);
  const localId = useSelector((state) => state.auth.userId);
  const DiamondCaseId = useSelector((state) => state.user.DiamondCaseId);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <FilterSwitch
        viewStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
        labelStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        label="Show Cheering"
        state={showCheeringValue}
        onChange={(newValue) => {
          dispatch(setShowCheering(localId, DiamondCaseId, newValue));
        }}
      />
      <FilterSwitch
        viewStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
        labelStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        label="Hide followers"
        state={followersValue}
        onChange={(newValue) => {
          dispatch(setHideFollowers(localId, DiamondCaseId, newValue));
        }}
      />
      <FilterSwitch
        viewStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
        labelStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        label="Hide following"
        state={followingValue}
        onChange={(newValue) => {
          dispatch(setHideFollowing(localId, DiamondCaseId, newValue));
        }}
      />
      <FilterSwitch
        viewStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
        labelStyle={{
          color: darkModeValue ? "white" : "black",
        }}
        label="Hide advocates"
        state={advocatesValue}
        onChange={(newValue) => {
          dispatch(setHideAdvocates(localId, DiamondCaseId, newValue));
        }}
      />
    </View>
  );
};

DiamondCaseSettingsScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/DiamondCase_icon_transparent_white.png")}
        />
        <Text
          style={{
            ...styles.logoTitle,
            color: "white",
          }}
        >
          Diamond Case
        </Text>
      </View>
    ),
    headerTitleStyle: {
      color: darkModeValue ? "white" : "black",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: darkModeValue ? "black" : "white",
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item
          title="Add"
          iconName={"ios-arrow-back"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.goBack();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  logoImage: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 22,
  },
});

export default DiamondCaseSettingsScreen;
