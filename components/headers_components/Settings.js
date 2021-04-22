import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

const Menu = (props) => {
  return (
    <props.View
      style={{
        flex: 1,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "gray",
        backgroundColor: props.darkModeValue ? "black" : "white",
      }}
    >
      <HeaderButtons HeaderButtonComponent={props.HeaderButton}>
        <Item
          title="Settings"
          iconName={"settings"}
          color={props.darkModeValue ? "white" : "black"}
          onPress={() => {
            props.navigation.toggleRightDrawer();
          }}
        />
      </HeaderButtons>
    </props.View>
  );
};

export default Menu;
