import React from "react";

const GoBack = (props) => {
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
      <props.HeaderButtons HeaderButtonComponent={props.HeaderButton}>
        <props.Item
          title="GoBack"
          iconName={"ios-arrow-back"}
          color={props.darkModeValue ? "white" : "black"}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </props.HeaderButtons>
    </props.View>
  );
};

export default GoBack;
