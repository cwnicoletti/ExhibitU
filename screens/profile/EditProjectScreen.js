import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  TouchableNativeFeedback,
  ActivityIndicator,
  FlatList,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Octicons, Ionicons } from "@expo/vector-icons";
import LinkButton from "../../components/UI/LinkButton";
import DefaultPicture from "../../assets/Icons/picture.svg";
import * as ImagePicker from "expo-image-picker";

import { LogBox } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import IoniconsHeaderButton from "../../components/UI/IoniconsHeaderButton";
import Input from "../../components/UI/Input";

import {
  uploadUpdatedProject,
  uploadRemoveProject,
  uploadChangeProjectCoverPicture,
} from "../../store/actions/user";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const FORM_INPUT_LINKS_UPDATE = "FORM_INPUT_LINKS_UPDATE";
const FORM_INPUT_LINKS_REMOVE = "FORM_INPUT_LINKS_REMOVE";

const correctUrls = (links) => {
  let linkNumber = 1;
  for (const link of Object.keys(links)) {
    // Prepend https:// to link url
    if (!links[link][`linkUrl${linkNumber}`].includes("https://")) {
      links[link][`linkUrl${linkNumber}`] = `https://${
        links[link][`linkUrl${linkNumber}`]
      }`;
    }
    // Append .com to link url
    if (!links[link][`linkUrl${linkNumber}`].includes(".com")) {
      links[link][`linkUrl${linkNumber}`] = `${
        links[link][`linkUrl${linkNumber}`]
      }.com`;
    }
    linkNumber += 1;
  }
  return links;
};

const parseLinkValuesFromInputValues = (formState) => {
  let linkArgs = {};
  for (const key in formState.inputValues) {
    if (key.search("link") !== -1) {
      linkArgs = { ...linkArgs, [key]: formState.inputValues[key] };
    }
  }
  return linkArgs;
};

const updateDictionaryOnRemove = (state) => {
  let linkNum = 1;
  for (const key in state) {
    if (key.search("link") !== -1) {
      state[`link${linkNum}`] = state[key];
      if (`link${linkNum}` !== key) {
        delete state[key];
      }
      linkNum += 1;
    }
  }
  return state;
};

const updateArrayOnRemove = (state) => {
  state.forEach((object, i) => {
    for (const key in object) {
      if (key.search("linkTitle") !== -1) {
        object[`linkTitle${i + 1}`] = object[key];
        if (`linkTitle${i + 1}` !== key) {
          delete object[key];
        }
      } else if (key.search("linkUrl") !== -1) {
        object[`linkUrl${i + 1}`] = object[key];
        if (`linkUrl${i + 1}` !== key) {
          delete object[key];
        }
      } else if (key.search("linkId") !== -1) {
        object[`linkId`] = i + 1;
      }
    }
  });
  return state;
};

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updateValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        if (updatedValidities.hasOwnProperty(key)) {
          updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updateValues,
      };
    case FORM_INPUT_LINKS_UPDATE:
      const updateLinkValues = {
        ...state.inputValues,
        [`link${action.linkNum}`]: {
          ...state.inputValues[`link${action.linkNum}`],
          linkId: action.linkNum,
          [action.input]: action.value,
        },
      };
      return {
        inputValues: updateLinkValues,
      };
    case FORM_INPUT_LINKS_REMOVE:
      const remainingLinkValues = Object.fromEntries(
        Object.entries(state.inputValues).filter(
          ([links, v]) => links !== `link${action.linkNum}`
        )
      );
      const reorderedRemainingLinkValues = updateDictionaryOnRemove(
        remainingLinkValues
      );
      return {
        inputValues: { ...reorderedRemainingLinkValues },
      };
  }
  return state;
};

const EditProjectScreen = (props) => {
  const dispatch = useDispatch();
  const [fileSizeError, setFileSizeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTempPicture, setIsLoadingTempPicture] = useState(false);
  const [linksState, setLinksState] = useState(Object.values(prevLinks));
  const darkModeValue = useSelector((state) => state.switches.darkMode);
  const localId = useSelector((state) => state.auth.userId);
  const projectTitle = props.navigation.getParam("projectTitle");
  const projectId = props.navigation.getParam("projectId");
  const projectDescription = props.navigation.getParam("projectDescription");
  const prevLinks = props.navigation.getParam("links");
  const projectCoverPhotoId = props.navigation.getParam("projectCoverPhotoId");
  const projectCoverPhotoUrl = props.navigation.getParam(
    "projectCoverPhotoUrl"
  );
  const projectTempCoverPhotoUrl = useSelector(
    (state) => state.user.projectTempCoverPhotoUrl
  );
  const showcaseId = useSelector((state) => state.user.showcaseId);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  let initialState = {
    inputValues: {
      projectTitle: projectTitle ? projectTitle : "",
      projectDescription: projectDescription ? projectDescription : "",
    },
    inputValidities: {
      projectTitle: false,
      projectDescription: false,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      if (inputIdentifier.search("linkTitle") !== -1) {
        const linkNumber = inputIdentifier.replace("linkTitle", "");
        dispatchFormState({
          type: FORM_INPUT_LINKS_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier,
          linkNum: linkNumber,
        });
      } else if (inputIdentifier.search("linkUrl") !== -1) {
        const linkNumber = inputIdentifier.replace("linkUrl", "");
        dispatchFormState({
          type: FORM_INPUT_LINKS_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier,
          linkNum: linkNumber,
        });
      } else {
        dispatchFormState({
          type: FORM_INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier,
        });
      }
    },
    [dispatchFormState]
  );

  const submitHandler = useCallback(async () => {
    const links = await parseLinkValuesFromInputValues(formState);
    const newLinks = correctUrls(links);
    await setIsLoading(true);
    await dispatch(
      uploadUpdatedProject(
        showcaseId,
        localId,
        projectId,
        projectTempCoverPhotoUrl
          ? projectTempCoverPhotoUrl
          : projectCoverPhotoUrl,
        formState.inputValues.projectTitle,
        formState.inputValues.projectDescription,
        newLinks
      )
    );
    await setIsLoading(false);
    props.navigation.navigate("ViewProfileProject", {
      projectId: projectId,
    });
  }, [dispatch, formState, submitHandler, linksState]);

  const deleteHandler = useCallback(() => {
    dispatch(
      uploadRemoveProject(showcaseId, localId, projectId, projectCoverPhotoId)
    );

    props.navigation.navigate("Profile");
  }, [dispatch, deleteHandler]);

  let android = null;
  if (Platform.OS === "android") {
    android = true;
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    props.navigation.setParams({ submit: submitHandler });
    props.navigation.setParams({ android });
    props.navigation.setParams({ deleteFn: deleteHandler });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  useEffect(() => {
    props.navigation.setParams({
      projectTitle: formState.inputValues.projectTitle,
    });
  }, [formState.inputValues.projectTitle]);

  const changeProjectCoverPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    await setIsLoadingTempPicture(true);
    if (!result.cancelled) {
      const fileSize = result.base64.length * (3 / 4) - 2;
      if (fileSize > 6000000) {
        setFileSizeError(true);
      } else {
        setFileSizeError(false);
        const base64 = `data:image/png;base64,${result.base64}`;
        await dispatch(
          uploadChangeProjectCoverPicture(
            base64,
            projectId,
            showcaseId,
            localId,
            projectCoverPhotoId
          )
        );
      }
    }
    await setIsLoadingTempPicture(false);
  };

  const addLink = async () => {
    await setLinksState((prevState) =>
      prevState.concat({
        linkId: prevState.length + 1,
        linkTitle: "",
        linkUrl: "",
      })
    );
  };

  const removeLink = async (linkNumber) => {
    const index = linkNumber - 1;
    await setLinksState((prevState) => prevState.filter((_, i) => i !== index));
    await setLinksState((prevState) => updateArrayOnRemove(prevState));
    dispatchFormState({
      type: FORM_INPUT_LINKS_REMOVE,
      linkNum: linkNumber,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: darkModeValue ? "black" : "white" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <KeyboardAwareScrollView
        enabledOnAndroid={true}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
        disableKBDismissScroll={true}
        scrollEnabled={true}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 5,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              margin: 10,
              color: darkModeValue ? "white" : "black",
            }}
          >
            Preview
          </Text>
        </View>
        <View style={{ borderWidth: 1, borderColor: "gray" }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {projectCoverPhotoUrl ? (
              <Image
                style={{
                  height: 350,
                  width: "100%",
                }}
                source={{ uri: projectCoverPhotoUrl }}
              />
            ) : (
              <DefaultPicture height={350} width={"100%"} fill="gray" />
            )}
            <View
              style={{
                alignItems: "center",
                borderBottomColor: darkModeValue ? "white" : "black",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: darkModeValue ? "white" : "black",
                  fontWeight: "bold",
                  fontSize: 18,
                  margin: 10,
                }}
              >
                {formState.inputValues.projectTitle}
              </Text>
            </View>
            <Text
              style={{ margin: 10, color: darkModeValue ? "white" : "black" }}
            >
              {formState.inputValues.projectDescription}
            </Text>
          </View>
          {Object.keys(parseLinkValuesFromInputValues(formState)).length <=
          1 ? (
            <View
              style={{
                ...styles.pictureCheerContainer,
                ...props.pictureCheerContainer,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FlatList
                data={Object.values(parseLinkValuesFromInputValues(formState))}
                keyExtractor={(item) => item.linkId}
                numColumns={1}
                renderItem={(itemData) => (
                  <LinkButton
                    imageUrl={
                      itemData.item[`linkImageUrl${itemData.item.linkId}`]
                    }
                    title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                    textStyle={{ color: darkModeValue ? "white" : "black" }}
                    linkContainer={{
                      width:
                        Object.keys(parseLinkValuesFromInputValues(formState))
                          .length === 1
                          ? "96%"
                          : Object.keys(
                              parseLinkValuesFromInputValues(formState)
                            ).length === 2
                          ? "46%"
                          : "28%",
                    }}
                  />
                )}
              />
            </View>
          ) : (
            <View
              style={{
                ...styles.pictureCheerContainer,
                ...props.pictureCheerContainer,
              }}
            >
              <FlatList
                data={Object.values(parseLinkValuesFromInputValues(formState))}
                keyExtractor={(item) => item.linkId}
                key={
                  Object.keys(parseLinkValuesFromInputValues(formState)).length
                }
                numColumns={
                  Object.keys(parseLinkValuesFromInputValues(formState))
                    .length <= 1
                    ? 1
                    : Object.keys(parseLinkValuesFromInputValues(formState))
                        .length === 2
                    ? 2
                    : 3
                }
                columnWrapperStyle={{ justifyContent: "center" }}
                renderItem={(itemData) => (
                  <LinkButton
                    imageUrl={
                      itemData.item[`linkImageUrl${itemData.item.linkId}`]
                    }
                    title={itemData.item[`linkTitle${itemData.item.linkId}`]}
                    textStyle={{ color: darkModeValue ? "white" : "black" }}
                    linkContainer={{
                      width:
                        Object.keys(parseLinkValuesFromInputValues(formState))
                          .length <= 1
                          ? "96%"
                          : Object.keys(
                              parseLinkValuesFromInputValues(formState)
                            ).length === 2
                          ? "46%"
                          : "28%",
                    }}
                  />
                )}
              />
              <View style={{ flexDirection: "row", padding: 10 }}>
                <Text
                  style={{
                    ...styles.pictureCheerNumber,
                    ...props.pictureCheerNumber,
                  }}
                >
                  {props.numberOfCheers}
                </Text>
                <Text
                  style={{
                    ...styles.pictureCheerText,
                    ...props.pictureCheerText,
                  }}
                >
                  cheering
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.form}>
          {!isLoadingTempPicture ? (
            <TouchableCmp
              style={{
                margin: 10,
                alignSelf: "center",
              }}
              onPress={changeProjectCoverPicture}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Octicons name="pencil" size={14} color="#007AFF" />
                <Text style={{ margin: 10, color: "#007AFF" }}>
                  Change Project Cover Photo
                </Text>
              </View>
            </TouchableCmp>
          ) : (
            <View
              style={{
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: darkModeValue ? "white" : "black",
                  margin: 10,
                }}
              >
                Loading project cover photo
              </Text>
              <ActivityIndicator size="small" color="white" />
            </View>
          )}
          {fileSizeError ? (
            <Text
              style={{
                color: "red",
                alignSelf: "center",
                marginHorizontal: 10,
                marginTop: 5,
                marginBottom: 15,
              }}
            >
              Picture file size bigger than 6MB. Try cropping or using a
              different picture.
            </Text>
          ) : null}
          <Input
            textLabel={{ color: darkModeValue ? "white" : "black" }}
            id="projectTitle"
            label="Project Title"
            errorText="Please enter a valid project title!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={projectTitle ? projectTitle : ""}
            initiallyValid={true}
            required
          />
          <Input
            textLabel={{ color: darkModeValue ? "white" : "black" }}
            id="projectDescription"
            label="Project Description"
            errorText="Please enter a valid project description!"
            keyboardType="default"
            multiline
            styleInput={{ height: 50 }}
            onInputChange={inputChangeHandler}
            initialValue={projectDescription ? projectDescription : ""}
            initiallyValid={true}
            required
            minLength={5}
          />
          {linksState.map((link, i) => (
            <View key={link.linkId}>
              <View
                style={{
                  borderTopWidth: 1,
                  width: "80%",
                  alignSelf: "center",
                  margin: 10,
                  borderColor: darkModeValue ? "white" : "black",
                }}
              />
              <Text
                style={{
                  color: darkModeValue ? "white" : "black",
                  textAlign: "center",
                  margin: 10,
                }}
              >
                Link {i + 1}
              </Text>
              <Input
                textLabel={{ color: darkModeValue ? "white" : "black" }}
                id={`linkTitle${link.linkId}`}
                label={`Link ${link.linkId} Title`}
                onSubmitEditing={() => {
                  this[`linkUrl${link.linkId}`].focus();
                }}
                errorText="Please enter a valid title!"
                keyboardType="default"
                onInputChange={inputChangeHandler}
                initialValue={link[`linkTitle${link.linkId}`]}
                initiallyValid={true}
                required
              />
              <Input
                textLabel={{ color: darkModeValue ? "white" : "black" }}
                id={`linkUrl${link.linkId}`}
                label={`Link ${link.linkId} Url`}
                inputRef={(ref) => (this[`linkUrl${link.linkId}`] = ref)}
                errorText="Please enter a valid link url!"
                keyboardType={Platform.OS === "ios" ? "url" : "default"}
                onInputChange={inputChangeHandler}
                autoCorrect={false}
                initialValue={link[`linkUrl${link.linkId}`]}
                initiallyValid={true}
                required
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableCmp
                  style={{
                    margin: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={async () => {
                    await removeLink(i + 1);
                  }}
                >
                  <Ionicons name="ios-remove" size={14} color="red" />
                  <Text style={{ margin: 10, color: "red" }}>
                    Remove link {i + 1}
                  </Text>
                </TouchableCmp>
              </View>
            </View>
          ))}
          {linksState && Object.keys(linksState).length <= 0 ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableCmp
                style={{
                  margin: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={async () => {
                  await addLink();
                }}
              >
                <Ionicons name="ios-add" size={14} color="green" />
                <Text style={{ margin: 10, color: "green" }}>
                  Add a link to project
                </Text>
              </TouchableCmp>
            </View>
          ) : null}
          {linksState && Object.keys(linksState).length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableCmp
                style={{
                  margin: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={async () => {
                  await addLink();
                }}
              >
                <Ionicons name="ios-add" size={14} color="green" />
                <Text style={{ margin: 10, color: "green" }}>
                  Add another link
                </Text>
              </TouchableCmp>
            </View>
          ) : null}
        </View>
        {!isLoading ? (
          <TouchableCmp
            style={{
              margin: 20,
              alignSelf: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={submitHandler}
          >
            <Text style={{ margin: 10, color: "#007AFF" }}>
              Confirm project edits
            </Text>
            <Ionicons name="ios-checkmark" size={18} color="#007AFF" />
          </TouchableCmp>
        ) : (
          <View
            style={{
              margin: 20,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: darkModeValue ? "white" : "black",
                margin: 10,
              }}
            >
              Uploading project edits...
            </Text>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

EditProjectScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  const android = navData.navigation.getParam("android");
  const deleteFn = navData.navigation.getParam("deleteFn");
  const projectTitle = navData.navigation.getParam("projectTitle");
  return {
    headerTitle: () => (
      <SafeAreaView
        forceInset={{ top: "always", horizontal: "never" }}
        style={styles.logo}
      >
        {darkModeValue ? (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_white.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../../assets/showcase_icon_transparent_black.png")}
          />
        )}
        <Text
          style={{
            ...styles.logoTitle,
            color: darkModeValue ? "white" : "black",
          }}
        >
          Edit {projectTitle}
        </Text>
      </SafeAreaView>
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        {android ? (
          <Item
            title="Trash"
            iconName={"md-trash"}
            color="red"
            onPress={deleteFn}
          />
        ) : (
          <Item
            title="Trash"
            iconName={"ios-trash"}
            color="red"
            onPress={deleteFn}
          />
        )}
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileTitleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 10,
  },
  profileUsernameStyle: {
    fontSize: 18,
    paddingTop: 10,
  },
  profileDescriptionStyle: {
    padding: 20,
  },
  profileContainerStyle: {
    borderBottomWidth: 1,
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
    fontSize: 22,
  },
});

export default EditProjectScreen;
