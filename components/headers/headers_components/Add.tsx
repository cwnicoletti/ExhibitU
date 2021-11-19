import React from "react";

const Add = (props) => {
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
          title="Add"
          iconName={"ios-add"}
          color={props.darkModeValue ? "white" : "black"}
          onPress={() => {
            props.navigation.navigate("AddPicture", {
              exhibitId: props.exhibitIdParam,
              exhibitTitle: props.exhibitTitleParam,
              exhibitCoverPhotoUrl: props.exhibitCoverPhotoUrlParam,
              exhibitDateCreated: props.exhibitDateCreatedParam,
              exhibitLastUpdated: props.exhibitLastUpdatedParam,
              exhibitDescription: props.exhibitDescriptionParam,
              exhibitLinks: props.exhibitLinksParam,
            });
          }}
        />
      </props.HeaderButtons>
    </props.View>
  );
};

export default Add;
