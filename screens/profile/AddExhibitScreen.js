import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "../../hooks";
import DefaultPicture from "../../assets/Icons/picture.svg";
import correctUrls from "../../helper/correctUrls";
import parseLinkValuesFromInputValues from "../../helper/parseLinkValuesFromInputValues";
import linkFormReducer from "../../helper/linkFormReducer";
import updateArrayOnRemove from "../../helper/updateArrayOnRemove";
import getPhotoPermissions from "../../helper/getPhotoPermissions";
import Input from "../../components/UI_general/Input";
import {
  uploadAddTempExhibitCoverPicture,
  uploadNewExhibit,
} from "../../store/actions/user/user";
import LinksList from "../../components/UI_general/LinksList";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const FORM_INPUT_LINKS_UPDATE = "FORM_INPUT_LINKS_UPDATE";
const FORM_INPUT_LINKS_REMOVE = "FORM_INPUT_LINKS_REMOVE";

const AddExhibitScreen = (props) => {
  const dispatch = useAppDispatch();
  const [fileSizeError, setFileSizeError] = useState(false);
  const [linksState, setLinksState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTempPicture, setIsLoadingTempPicture] = useState(false);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const exhibitTempCoverPhotoId = useAppSelector(
    (state) => state.user.exhibitTempCoverPhotoId
  );
  const exhibitTempCoverPhotoUrl = useAppSelector(
    (state) => state.user.exhibitTempCoverPhotoUrl
  );
  const exhibitTempCoverPhotoBase64 = useAppSelector(
    (state) => state.user.exhibitTempCoverPhotoBase64
  );

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
      uploadNewExhibit(
        ExhibitUId,
        localId,
        exhibitTempCoverPhotoId,
        exhibitTempCoverPhotoBase64,
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
    exhibitTempCoverPhotoUrl,
    exhibitTempCoverPhotoBase64,
  ]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  const changeExhibitCoverPicture = async () => {
    if (!(await getPhotoPermissions(ImagePicker))) {
      return;
    }
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
          uploadAddTempExhibitCoverPicture(
            base64,
            ExhibitUId,
            localId,
            exhibitTempCoverPhotoId
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
        <View style={styles.previewContainer}>
          <Text
            style={{
              ...styles.previewText,
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
            {exhibitTempCoverPhotoUrl ? (
              <Image
                style={styles.exhibitTempCoverImage}
                source={{ uri: exhibitTempCoverPhotoUrl }}
              />
            ) : (
              <DefaultPicture height={350} width={"100%"} fill="gray" />
            )}
            <View
              style={{
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: darkModeValue ? "white" : "black",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  margin: 10,
                  color: darkModeValue ? "white" : "black",
                }}
              >
                {formState.inputValues.exhibitTitle}
              </Text>
            </View>
            <Text
              style={{
                margin: 10,
                textAlign: "center",
                color: darkModeValue ? "white" : "black",
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
              <LinksList
                links={Object.values(parseLinkValuesFromInputValues(formState))}
              />
            </View>
          ) : (
            <View
              style={{
                ...styles.pictureCheerContainer,
                ...props.pictureCheerContainer,
              }}
            >
              <LinksList
                links={Object.values(parseLinkValuesFromInputValues(formState))}
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
            <View style={{ alignItems: "center" }}>
              <TouchableCmp onPress={changeExhibitCoverPicture}>
                <View style={styles.addCoverPhotoSubContainer}>
                  <Ionicons name="ios-add" size={14} color="#007AFF" />
                  <Text style={{ margin: 10, color: "#007AFF" }}>
                    Add Exhibit Cover Photo
                  </Text>
                </View>
              </TouchableCmp>
            </View>
          ) : (
            <View style={styles.loadingExhibitPhotoContainer}>
              <Text
                style={{
                  ...styles.loadingExhibitPhotoText,
                  color: darkModeValue ? "white" : "black",
                }}
              >
                Loading exhibit cover photo, please wait...
              </Text>
              <ActivityIndicator size="small" color="white" />
            </View>
          )}
          {fileSizeError ? (
            <Text style={styles.fileSizeErrorText}>
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
                  textAlign: "center",
                  margin: 10,
                  color: darkModeValue ? "white" : "black",
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
              <View style={styles.linkContainer}>
                <TouchableCmp
                  onPress={async () => {
                    await removeLink(i + 1);
                  }}
                >
                  <View style={styles.linkSubContainer}>
                    <Ionicons name="ios-remove" size={14} color="red" />
                    <Text style={{ margin: 10, color: "red" }}>
                      Remove link {i + 1}
                    </Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>
          ))}
          {linksState && Object.keys(linksState).length <= 0 ? (
            <View style={styles.linkContainer}>
              <TouchableCmp
                onPress={async () => {
                  await addLink();
                }}
              >
                <View style={styles.linkSubContainer}>
                  <Ionicons name="ios-add" size={14} color="green" />
                  <Text style={{ margin: 10, color: "green" }}>
                    Add a link to exhibit
                  </Text>
                </View>
              </TouchableCmp>
            </View>
          ) : null}
          {linksState && Object.keys(linksState).length > 0 && (
            <View style={styles.linkContainer}>
              <TouchableCmp
                onPress={async () => {
                  await addLink();
                }}
              >
                <View style={styles.linkSubContainer}>
                  <Ionicons name="ios-add" size={14} color="green" />
                  <Text style={{ margin: 10, color: "green" }}>
                    Add another link
                  </Text>
                </View>
              </TouchableCmp>
            </View>
          )}
        </View>
        {!isLoading ? (
          <View style={styles.confirmCreateContainer}>
            <TouchableCmp
              onPress={submitHandler}
              disabled={
                !exhibitTempCoverPhotoUrl || formState.formIsValid === false
              }
            >
              <View style={styles.confirmCreateSubContainer}>
                <Text
                  style={{
                    margin: 10,
                    color:
                      !exhibitTempCoverPhotoUrl ||
                      formState.formIsValid === false
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
                    !exhibitTempCoverPhotoUrl || formState.formIsValid === false
                      ? "gray"
                      : "#007AFF"
                  }
                />
              </View>
            </TouchableCmp>
          </View>
        ) : (
          <View style={styles.creatingExhibitContainer}>
            <Text
              style={{
                ...styles.creatingExhibitText,
                color: darkModeValue ? "white" : "black",
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

const styles = StyleSheet.create({
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },

  previewText: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 10,
  },

  addCoverPhotoSubContainer: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },

  loadingExhibitPhotoContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  loadingExhibitPhotoText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },

  fileSizeErrorText: {
    color: "red",
    alignSelf: "center",
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 15,
  },

  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },

  linkSubContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  confirmCreateContainer: {
    margin: 20,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  confirmCreateSubContainer: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },

  creatingExhibitContainer: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  creatingExhibitText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});

export default AddExhibitScreen;
