import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";

import Card from "../UI/Card";
import ExploreAdvocatesProjectsIcons from "./ExploreAdvocatesProjectsIcons";

const ExploreAdvocatesCard = (props) => {
  const projects = props.projects;
  const projectsAdvocating = props.projectsAdvocating;

  let projectsAdvocatingFor = [];
  [projects].filter((object) => {
    if (projectsAdvocating.includes(Object.values(object)[0].projectId)) {
      projectsAdvocatingFor.push(Object.values(object)[0]);
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
              <Image
                style={styles.image}
                source={
                  props.image
                    ? { uri: props.image }
                    : require("../../assets/default-profile-icon.jpg")
                }
              />
            </View>
            <View style={{ ...styles.details, ...props.details }}>
              <Text style={{ ...styles.fullname, ...props.fullNameStyle }}>
                {props.fullname}
              </Text>
              {props.jobTitle ? (
                <Text style={{ ...styles.jobTitle, ...props.jobTitleStyle }}>
                  {props.jobTitle}
                </Text>
              ) : null}
              <Text style={{ ...styles.username, ...props.userNameStyle }}>
                {`@${props.username}`}
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
    borderWidth: 1,
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