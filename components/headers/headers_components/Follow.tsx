import React from "react";

const Follow = (props) => {
  return (
    <props.View>
      {props.ExhibitUId !== props.exploredExhibitUId ? (
        <props.View
          style={{
            flex: 1,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderColor: "gray",
            backgroundColor: props.darkModeValue ? "black" : "white",
          }}
        >
          {!props.isfollowing ? (
            <props.View>
              {!props.isLoading ? (
                <props.HeaderButtons HeaderButtonComponent={props.HeaderButton}>
                  <props.Item
                    title="Follow"
                    iconName={"user-follow"}
                    color={props.darkModeValue ? "white" : "black"}
                    onPress={() => props.followFn()}
                  />
                </props.HeaderButtons>
              ) : (
                <props.View style={{ margin: 20 }}>
                  <props.ActivityIndicator
                    size="small"
                    color={props.darkModeValue ? "white" : "black"}
                  />
                </props.View>
              )}
            </props.View>
          ) : (
            <props.View>
              {!props.isLoading ? (
                <props.HeaderButtons HeaderButtonComponent={props.HeaderButton}>
                  <props.Item
                    title="Follow"
                    iconName={"user-unfollow"}
                    color={"red"}
                    onPress={() => props.unfollowFn()}
                  />
                </props.HeaderButtons>
              ) : (
                <props.View style={{ margin: 20 }}>
                  <props.ActivityIndicator
                    size="small"
                    color={props.darkModeValue ? "white" : "black"}
                  />
                </props.View>
              )}
            </props.View>
          )}
        </props.View>
      ) : (
        <props.View
          style={{
            flex: 1,
            marginLeft: 23,
            marginRight: 23,
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "gray",
            backgroundColor: props.darkModeValue ? "black" : "white",
          }}
        />
      )}
    </props.View>
  );
};

export default Follow;
