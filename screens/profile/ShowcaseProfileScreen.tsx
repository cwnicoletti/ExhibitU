import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ExhibitItem from "../../components/exhibitItems/ExhibitItem";
import ShowcaseHeader from "../../components/user/ShowcaseHeader";
import useDidMountEffect from "../../helper/useDidMountEffect";
import { returnFromShowcasing } from "../../store/actions/user/user";

const ShowcaseProfileScreen = (props) => {
  const dispatch = useAppDispatch();
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);

  const userData =
    props.navigation.getParam("ExhibitUId") === ExhibitUId ||
    props.navigation.getParam("ExhibitUId") === void 0
      ? {
          profilePictureBase64: useAppSelector(
            (state) => state.user.profilePictureBase64
          )
            ? useAppSelector((state) => state.user.profilePictureBase64)
            : props.navigation.getParam("profilePictureUrl"),
          profileColumns: useAppSelector((state) => state.user.profileColumns),
          ExhibitUId: useAppSelector((state) => state.user.ExhibitUId),
          fullname: useAppSelector((state) => state.user.fullname),
          username: useAppSelector((state) => state.user.username),
          jobTitle: useAppSelector((state) => state.user.jobTitle),
          profileBiography: useAppSelector(
            (state) => state.user.profileBiography
          ),
          profileLinks: useAppSelector((state) => state.user.profileLinks),
          profileExhibits: useAppSelector((state) => state.user.profileExhibits)
            ? useAppSelector((state) => state.user.profileExhibits)
            : props.navigation.getParam("profileExhibits"),
          numberOfFollowers: useAppSelector(
            (state) => state.user.numberOfFollowers
          ),
          numberOfFollowing: useAppSelector(
            (state) => state.user.numberOfFollowing
          ),
          hideFollowing: useAppSelector((state) => state.user.hideFollowing),
          hideFollowers: useAppSelector((state) => state.user.hideFollowers),
          hideExhibits: useAppSelector((state) => state.user.hideExhibits),
        }
      : {
          profilePictureUrl: props.navigation.getParam("profilePictureUrl"),
          profileColumns: props.navigation.getParam("profileColumns"),
          ExhibitUId: props.navigation.getParam("ExhibitUId"),
          fullname: props.navigation.getParam("fullname"),
          username: props.navigation.getParam("username"),
          jobTitle: props.navigation.getParam("jobTitle"),
          profileBiography: props.navigation.getParam("profileBiography"),
          profileLinks: props.navigation.getParam("profileLinks"),
          profileExhibits: props.navigation.getParam("profileExhibits"),
          numberOfFollowers: props.navigation.getParam("numberOfFollowers"),
          numberOfFollowing: props.navigation.getParam("numberOfFollowing"),
          hideFollowing: props.navigation.getParam("hideFollowing"),
          hideFollowers: props.navigation.getParam("hideFollowers"),
          hideExhibits: props.navigation.getParam("hideExhibits"),
        };

  const [profileExhibitsState, setProfileExhibitsState] = useState(
    Object.values(userData.profileExhibits).sort(
      (first: string, second: string) => {
        return (
          second["exhibitDateCreated"]["_seconds"] -
          first["exhibitDateCreated"]["_seconds"]
        );
      }
    )
  );

  useEffect(() => {
    props.navigation.setParams({ dispatch: dispatch });
    props.navigation.setParams({ returnFn: returnFromShowcasing });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useDidMountEffect(() => {
    // Sort the array based on the second element
    setProfileExhibitsState(
      Object.values(userData.profileExhibits).sort(
        (first: string, second: string) => {
          return (
            second["exhibitDateCreated"]["_seconds"] -
            first["exhibitDateCreated"]["_seconds"]
          );
        }
      )
    );
  }, [userData.profileExhibits]);

  const viewExhibitHandler = (exhibitId) => {
    props.navigation.push("ShowcaseExhibit", {
      exhibitId,
      userData,
    });
  };

  const topHeader = () => {
    return (
      <ShowcaseHeader
        containerStyle={{
          ...styles.profileContainerStyle,
          borderBottomColor: darkModeValue ? "gray" : "#c9c9c9",
        }}
        usernameStyle={{
          ...styles.profileUsernameStyle,
          color: darkModeValue ? "white" : "black",
        }}
        fullnameStyle={{
          ...styles.profileTitleStyle,
          color: darkModeValue ? "white" : "black",
        }}
        jobTitleStyle={{
          ...styles.profileJobTitleStyle,
          color: darkModeValue ? "white" : "black",
        }}
        fullname={userData.fullname}
        username={`@${userData.username}`}
        jobTitle={userData.jobTitle}
        imgSource={
          userData.profilePictureBase64
            ? userData.profilePictureBase64
            : userData.profilePictureUrl
        }
        description={userData.profileBiography}
        links={userData.profileLinks}
        followingValue={userData.hideFollowing}
        followersValue={userData.hideFollowers}
        exhibitsValue={userData.hideExhibits}
        numberOfFollowers={userData.numberOfFollowers}
        numberOfFollowing={userData.numberOfFollowing}
        numberOfExhibits={Object.keys(profileExhibitsState).length}
        descriptionStyle={{
          ...styles.profileDescriptionStyle,
          color: darkModeValue ? "white" : "black",
        }}
        onEditProfilePress={() => props.navigation.navigate("EditProfile")}
        onAddNewExhibitPress={() => props.navigation.navigate("AddExhibit")}
        followersOnPress={() =>
          props.navigation.push("Followers", {
            exploredExhibitUId: userData.ExhibitUId,
          })
        }
        followingOnPress={() =>
          props.navigation.push("Following", {
            exploredExhibitUId: userData.ExhibitUId,
          })
        }
      />
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
        data={profileExhibitsState}
        keyExtractor={(item) => item.exhibitId}
        ListHeaderComponent={topHeader()}
        numColumns={userData.profileColumns}
        renderItem={(itemData) => (
          <ExhibitItem
            image={
              itemData.item.exhibitCoverPhotoBase64
                ? itemData.item.exhibitCoverPhotoBase64
                : itemData.item.exhibitCoverPhotoUrl
            }
            title={itemData.item.exhibitTitle}
            exhibitContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
              borderColor: darkModeValue ? "gray" : "#c9c9c9",
            }}
            titleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            onSelect={() => {
              viewExhibitHandler(itemData.item.exhibitId);
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  profileTitleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 5,
  },
  profileJobTitleStyle: {
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 5,
  },
  profileUsernameStyle: {
    fontSize: 18,
    paddingTop: 5,
  },
  profileDescriptionStyle: {
    padding: 20,
  },
  profileContainerStyle: {
    justifyContent: "flex-start",
  },
});

export default ShowcaseProfileScreen;
