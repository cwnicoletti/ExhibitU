import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../hooks";
import FilterSwitch from "../../components/UI_general/FilterSwitch";
import {
  setHideExhibits,
  setHideFollowers,
  setHideFollowing,
  setShowCheering,
} from "../../store/actions/user/user";

const ShowcaseSettingsScreen = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const showCheeringValue = useAppSelector((state) => state.user.showCheering);
  const followingValue = useAppSelector((state) => state.user.hideFollowing);
  const followersValue = useAppSelector((state) => state.user.hideFollowers);
  const exhibitsValue = useAppSelector((state) => state.user.hideExhibits);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);

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
      <ScrollView style={{ alignSelf: "center", width: 200, marginTop: 20 }}>
        <FilterSwitch
          viewStyle={styles.switch}
          labelStyle={{
            color: darkModeValue ? "white" : "black",
          }}
          label="Show Cheering"
          state={showCheeringValue}
          onChange={(newValue) => {
            dispatch(setShowCheering(localId, ExhibitUId, newValue));
          }}
        />
        <FilterSwitch
          viewStyle={styles.switch}
          labelStyle={{
            color: darkModeValue ? "white" : "black",
          }}
          label="Hide followers"
          state={followersValue}
          onChange={(newValue) => {
            dispatch(setHideFollowers(localId, ExhibitUId, newValue));
          }}
        />
        <FilterSwitch
          viewStyle={styles.switch}
          labelStyle={{
            color: darkModeValue ? "white" : "black",
          }}
          label="Hide following"
          state={followingValue}
          onChange={(newValue) => {
            dispatch(setHideFollowing(localId, ExhibitUId, newValue));
          }}
        />
        <FilterSwitch
          viewStyle={styles.switch}
          labelStyle={{
            color: darkModeValue ? "white" : "black",
          }}
          label="Hide exhibits"
          state={exhibitsValue}
          onChange={(newValue) => {
            dispatch(setHideExhibits(localId, ExhibitUId, newValue));
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
});

export default ShowcaseSettingsScreen;
