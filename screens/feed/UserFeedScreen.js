import React, { useEffect } from "react";
import { Button, StyleSheet, FlatList, Alert, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { deleteProduct } from "../../store/actions/projects";

import ProjectItem from "../../components/projectItems/ProjectItem";
import HeaderButton from "../../components/UI/HeaderButton";

const UserFeedScreen = (props) => {
  const userProjects = useSelector((state) => state.projects.userProjects);
  const darkModeValue = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "desctructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  const editProducthandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  return (
    <View
      style={{
        ...styles.screen,
        backgroundColor: darkModeValue ? "black" : "white",
      }}
    >
      <FlatList
        data={userProjects}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProjectItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              editProducthandler(itemData.item.id);
            }}
          >
            <Button
              title="Edit"
              onPress={() => {
                editProducthandler(itemData.item.id);
              }}
            />
            <Button
              title="Delete"
              onPress={deleteHandler.bind(this, itemData.item.id)}
            />
          </ProjectItem>
        )}
      />
    </View>
  );
};

UserFeedScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: "Showcase",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.toggleLeftDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-settings" : "ios-settings"}
          color={darkModeValue ? "white" : "black"}
          onPress={() => {
            navData.navigation.toggleRightDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerTitleStyle: {
      color: darkModeValue ? "white" : "black",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: darkModeValue ? "black" : "white",
    },
    tabBarOptions: {
      activeTintColor: darkModeValue ? "white" : "black",
      inactiveTintColor: darkModeValue ? "#696969" : "#bfbfbf",
      tabStyle: {
        backgroundColor: darkModeValue ? "black" : "white",
      },
      style: {
        backgroundColor: darkModeValue ? "black" : "white",
      },
      showLabel: false,
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    padding: 10,
  },
});

export default UserFeedScreen;
