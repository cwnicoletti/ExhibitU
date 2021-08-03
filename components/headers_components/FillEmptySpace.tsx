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
    ></props.View>
  );
};

export default GoBack;
