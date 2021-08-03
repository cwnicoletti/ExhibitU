import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import UpdateCard from "../../components/drawers/UpdateCard";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import { getUpdates } from "../../store/actions/user";

const VoteUpdatesSettingsScreen = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const updates = useAppSelector((state) => state.user.updates);
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
      <FlatList<any>
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
            iconFamily={itemData.item.iconFamily}
            iconName={itemData.item.iconName}
            darkModeValue={darkModeValue}
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
      <View style={styles.logo}>
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
          }}
        >
          Future Updates
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
    fontSize: 26,
  },
});

export default VoteUpdatesSettingsScreen;
