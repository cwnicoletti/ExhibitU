import React from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../UI/Card";
import ExploreAdvocatesProjectsIcons from "./ExploreAdvocatesProjectsIcons";

const ExploreAdvocatesCard = (props) => {
  const projects = props.projects;
  const projectsAdvocating = props.projectsAdvocating;

  const image = props.image
    ? { uri: props.image }
    : require("../../assets/default-profile-icon.jpg");

  let projectsAdvocatingFor = [];
  Object.values(projects).filter((object) => {
    if (projectsAdvocating.includes(object.projectId)) {
      projectsAdvocatingFor.push(object);
    }
  });

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={{ ...styles.project, ...props.projectContainer }}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={{ flexDirection: "row", margin: 5 }}>
            <View style={{ ...styles.imageContainer, ...props.imageContainer }}>
              <Image style={styles.image} source={image} />
            </View>
            <View style={{ ...styles.details, ...props.details }}>
              <Text style={{ ...styles.fullname, ...props.fullNameStyle }}>
                {props.fullname.length > 15
                  ? props.fullname.substring(0, 15) + "..."
                  : props.fullname}
              </Text>
              {props.jobTitle ? (
                <Text style={{ ...styles.jobTitle, ...props.jobTitleStyle }}>
                  {props.jobTitle.length > 15
                    ? props.jobTitle.substring(0, 15) + "..."
                    : props.jobTitle}
                </Text>
              ) : null}
              <Text style={{ ...styles.username, ...props.userNameStyle }}>
                {props.username.length > 15
                  ? `@${props.username.substring(0, 15)}...}`
                  : `@${props.username}`}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "grey",
                width: 1,
                height: "100%",
                marginHorizontal: 10,
              }}
            />
            <View
              style={{
                ...styles.advocatingDetails,
                ...props.advocatingDetails,
              }}
            >
              <Text
                style={{
                  ...styles.advocatingTitle,
                  ...props.advocatingTitleStyle,
                }}
              >
                Advocating:
              </Text>
              <FlatList
                data={projectsAdvocatingFor}
                keyExtractor={(item) => item.projectId}
                renderItem={(itemData) => (
                  <ExploreAdvocatesProjectsIcons
                    image={
                      itemData.item.projectCoverPhotoUrl
                        ? { uri: itemData.item.projectCoverPhotoUrl }
                        : require("../../assets/black-placeholder.png")
                    }
                  />
                )}
              />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  project: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
    overflow: "hidden",
  },
  fullname: {
    fontWeight: "800",
    fontSize: 14,
  },
  jobTitle: {
    fontWeight: "500",
    fontSize: 12,
  },
  username: {
    color: "gray",
    fontSize: 12,
  },
  details: {
    marginLeft: 10,
    justifyContent: "center",
  },
  advocatingDetails: {
    flex: 1,
    margin: 10,
  },
  touchable: {
    overflow: "hidden",
  },
});

export default ExploreAdvocatesCard;
