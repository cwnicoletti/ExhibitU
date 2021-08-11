import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  LogBox,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import MainHeaderTitle from "../../components/UI/MainHeaderTitle";
import { useAppDispatch, useAppSelector } from "../../hooks";
import TutorialExhibitCreation from "../../components/tutorial/TutorialExhibitCreation";
import DefaultPicture from "../../assets/Icons/picture.svg";
import correctUrls from "../../helper/correctUrls";
import parseLinkValuesFromInputValues from "../../helper/parseLinkValuesFromInputValues";
import linkFormReducer from "../../helper/linkFormReducer";
import updateArrayOnRemove from "../../helper/updateArrayOnRemove";
import Input from "../../components/UI/Input";
import IoniconsHeaderButton from "../../components/UI/header_buttons/IoniconsHeaderButton";
import LinkButton from "../../components/UI/LinkButton";
import {
  uploadAddTempProjectCoverPicture,
  uploadNewProject,
} from "../../store/actions/user";

const AddProjectScreen = (props) => {
  const dispatch = useAppDispatch();
  const [fileSizeError, setFileSizeError] = useState(false);
  const [linksState, setLinksState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTempPicture, setIsLoadingTempPicture] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const projectTempCoverPhotoId = useAppSelector(
    (state) => state.user.projectTempCoverPhotoId
  );
  const projectTempCoverPhotoUrl = useAppSelector(
    (state) => state.user.projectTempCoverPhotoUrl
  );
  const projectTempCoverPhotoBase64 = useAppSelector(
    (state) => state.user.projectTempCoverPhotoBase64
  );
  const tutorialing = useAppSelector((state) => state.user.tutorialing);
  const tutorialScreen = useAppSelector((state) => state.user.tutorialScreen);

  let initialState = {
    inputValues: {
      exhibitTitle: "",
      exhibitDescription: "",
    },
    inputValidities: {
      exhibitTitle: false,
      exhibitDescription: false,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(
    linkFormReducer,
    initialState
  );

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

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  const submitHandler = useCallback(async () => {
    const links = await parseLinkValuesFromInputValues(formState);
    const newLinks = correctUrls(links);
    await setIsLoading(true);
    await dispatch(
      uploadNewProject(
        ExhibitUId,
        localId,
        projectTempCoverPhotoId,
        projectTempCoverPhotoBase64,
        formState.inputValues.exhibitTitle,
        formState.inputValues.exhibitDescription,
        newLinks
      )
    );
    await setIsLoading(false);
    props.navigation.navigate("Profile");
  }, [
    dispatch,
    formState,
    submitHandler,
    projectTempCoverPhotoUrl,
    projectTempCoverPhotoBase64,
  ]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    props.navigation.setParams({ submit: submitHandler });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

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
          uploadAddTempProjectCoverPicture(
            base64,
            ExhibitUId,
            localId,
            projectTempCoverPhotoId
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
        extraScrollHeight={10}
        keyboardShouldPersistTaps="handled"
        disableKBDismissScroll={true}
        scrollEnabled={true}
      >
        {tutorialing &&
        (tutorialScreen === "ExhibitCreation" ||
          tutorialScreen === "ExhibitView") ? (
          <TutorialExhibitCreation ExhibitUId={ExhibitUId} localId={localId} />
        ) : null}
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {projectTempCoverPhotoUrl ? (
              <Image
                style={{
                  height: 350,
                  width: "100%",
                }}
                source={{ uri: projectTempCoverPhotoUrl }}
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
                {formState.inputValues.exhibitTitle}
              </Text>
            </View>
            <Text
              style={{
                margin: 10,
                color: darkModeValue ? "white" : "black",
                textAlign: "center",
              }}
            >
              {formState.inputValues.exhibitDescription}
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
                <Ionicons name="ios-add" size={14} color="#007AFF" />
                <Text style={{ margin: 10, color: "#007AFF" }}>
                  Add Exhibit Cover Photo
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
                Loading exhibit cover photo, please wait...
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
            id="exhibitTitle"
            label="Exhibit Title"
            errorText="Please enter a valid exhibit title!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            onSubmitEditing={() => {
              exhibitDescription.focus();
            }}
            initialValue={""}
            initiallyValid={true}
            required
            styleInput={{
              marginBottom: 10,
            }}
          />
          <Input
            textLabel={{ color: darkModeValue ? "white" : "black" }}
            id="exhibitDescription"
            label="Exhibit Description"
            errorText="Please enter a valid exhibit description!"
            keyboardType="default"
            multiline
            inputRef={(ref) => (exhibitDescription = ref)}
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={true}
            styleInput={{
              height: 60,
              marginBottom: 10,
            }}
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
                styleInput={{
                  marginBottom: 10,
                }}
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
                styleInput={{
                  marginBottom: 10,
                }}
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
                  Add a link to exhibit
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
              margin: 10,
              alignSelf: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={submitHandler}
            disabled={
              !projectTempCoverPhotoUrl || formState.formIsValid === false
            }
          >
            <View
              style={{
                margin: 10,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  margin: 10,
                  color:
                    !projectTempCoverPhotoUrl || formState.formIsValid === false
                      ? "gray"
                      : "#007AFF",
                }}
              >
                Confirm and create exhibit
              </Text>
              <Ionicons
                name="ios-checkmark"
                size={18}
                color={
                  !projectTempCoverPhotoUrl || formState.formIsValid === false
                    ? "gray"
                    : "#007AFF"
                }
              />
            </View>
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
              Creating exhibit...
            </Text>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

AddProjectScreen.navigationOptions = (navData) => {
  const darkModeValue = navData.navigation.getParam("darkMode");
  return {
    headerTitle: () => (
      <MainHeaderTitle
        darkModeValue={darkModeValue}
        titleName={"Create Exhibit"}
      />
    ),
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
  };
};

const styles = StyleSheet.create({
  text: {
    padding: 10,
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
});

export default AddProjectScreen;
