import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Text,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import UpdateCard from "../../components/drawers/UpdateCard";
import { AntDesign } from "@expo/vector-icons";

import { getUpdates } from "../../store/actions/user";

const VoteUpdatesSettingsScreen = (props) => {
  const dispatch = useDispatch();
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const updates = useSelector((state) => state.user.updates);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [emptyFeed, setEmptyFeed] = useState(false);

  const refreshUpdates = async () => {
    await setIsRefreshing(true);
    await dispatch(getUpdates());
    await setIsRefreshing(false);
  };

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    if (Object.keys(updates).length === 0) {
      setEmptyFeed(true);
    } else {
      setEmptyFeed(false);
    }
  }, [updates]);

  const topHeader = () => {
    return (
      <View>
        {emptyFeed ? (
          <View style={{ alignItems: "center" }}>
            <AntDesign
              name="arrowdown"
              size={24}
              color={"grey"}
              style={{ margin: 10, marginTop: 30 }}
            />
            <Text style={{ color: "grey", margin: 10 }}>
              Pull down to recieve the latest future updates
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <FlatList
        data={Object.values(updates)}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshUpdates}
            tintColor={darkModeValue ? "white" : "black"}
          />
        }
        keyExtractor={(item) => item.id}
        ListHeaderComponent={topHeader}
        renderItem={(itemData) => (
          <UpdateCard
            updateTitle={itemData.item.title}
            updateBody={itemData.item.body}
            projectContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            titleStyle={{ color: darkModeValue ? "white" : "black" }}
            bodyStyle={{ color: darkModeValue ? "white" : "black" }}
          />
        )}
      />
    </View>
  );
};

VoteUpdatesSettingsScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <SafeAreaView
        forceInset={{ top: "always", horizontal: "never" }}
        style={styles.logo}
      >
        {darkModeValue ? (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_white.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_black.png")}
          />
        )}
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
          }}
        >
          Future Updates
        </Text>
      </SafeAreaView>
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

export default VoteUpdatesSettingsScreen;
