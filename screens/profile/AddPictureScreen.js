import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import correctUrls from "../../helper/correctUrls";
import parseLinkValuesFromInputValues from "../../helper/parseLinkValuesFromInputValues";
import updateArrayOnRemove from "../../helper/updateArrayOnRemove";
import linkFormReducer from "../../helper/linkFormReducer";
import getPhotoPermissions from "../../helper/getPhotoPermissions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Input from "../../components/UI_general/Input";
import PreviewPostItem from "../../components/screen_specific/profile/PreviewPostItem";
import {
  addUserPost,
  uploadAddTempPostPicture,
} from "../../store/actions/user/user";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const FORM_INPUT_LINKS_UPDATE = "FORM_INPUT_LINKS_UPDATE";
const FORM_INPUT_LINKS_REMOVE = "FORM_INPUT_LINKS_REMOVE";

const EditProfileScreen = (props) => {
  const dispatch = useAppDispatch();
  const [fileSizeError, setFileSizeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTempPicture, setIsLoadingTempPicture] = useState(false);
  const [linksState, setLinksState] = useState([]);
  const darkModeValue = useAppSelector((state) => state.user.darkMode);
  const localId = useAppSelector((state) => state.auth.userId);
  const ExhibitUId = useAppSelector((state) => state.user.ExhibitUId);
  const profilePictureUrl = useAppSelector(
    (state) => state.user.profilePictureUrl
  );
  const profilePictureBase64 = useAppSelector(
    (state) => state.user.profilePictureBase64
  );
  const tempPhotoPostId = useAppSelector((state) => state.user.tempPhotoPostId);
  const tempPhotoPostUrl = useAppSelector(
    (state) => state.user.tempPhotoPostUrl
  );
  const tempPhotoPostBase64 = useAppSelector(
    (state) => state.user.tempPhotoPostBase64
  );
  const exhibitTitle = props.navigation.getParam("exhibitTitle");
  const exhibitId = props.navigation.getParam("exhibitId");
  const exhibitCoverPhotoUrl = props.navigation.getParam(
    "exhibitCoverPhotoUrl"
  );
  const exhibitDateCreated = props.navigation.getParam("exhibitDateCreated");
  const exhibitLastUpdated = props.navigation.getParam("exhibitLastUpdated");
  const exhibitDescription = props.navigation.getParam("exhibitDescription");
  const exhibitLinks = props.navigation.getParam("exhibitLinks");
  const fullname = useAppSelector((state) => state.user.fullname);
  const username = useAppSelector((state) => state.user.username);
  const jobTitle = useAppSelector((state) => state.user.jobTitle);
  const numberOfFollowers = useAppSelector(
    (state) => state.user.numberOfFollowers
  );
  const numberOfFollowing = useAppSelector(
    (state) => state.user.numberOfFollowing
  );
  const profileColumns = useAppSelector((state) => state.user.profileColumns);
  const profileBiography = useAppSelector(
    (state) => state.user.profileBiography
  );
  const profileLinks = useAppSelector((state) => state.user.profileLinks);
  const followingValue = useAppSelector((state) => state.user.hideFollowing);
  const followersValue = useAppSelector((state) => state.user.hideFollowers);
  const exhibitsValue = useAppSelector((state) => state.user.hideExhibits);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  let initialState = {
    inputValues: {
      caption: "",
    },
    inputValidities: {
      caption: false,
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

  const submitHandler = useCallback(async () => {
    const links = await parseLinkValuesFromInputValues(formState);
    const newLinks = correctUrls(links);
    await setIsLoading(true);
    await dispatch(
      addUserPost(
        ExhibitUId,
        localId,
        exhibitId,
        fullname,
        username,
        jobTitle,
        numberOfFollowers,
        numberOfFollowing,
        followingValue,
        followersValue,
        exhibitsValue,
        profileBiography,
        exhibitTitle,
        exhibitCoverPhotoUrl,
        exhibitDateCreated,
        exhibitLastUpdated,
        exhibitDescription,
        profilePictureUrl,
        profilePictureBase64,
        tempPhotoPostId,
        tempPhotoPostUrl,
        tempPhotoPostBase64,
        formState.inputValues.caption,
        profileLinks,
        exhibitLinks,
        newLinks,
        profileColumns
      )
    );
    await setIsLoading(false);

    props.navigation.navigate("Profile");
    props.navigation.navigate("Feed");
  }, [dispatch, formState, submitHandler, tempPhotoPostUrl]);

  const addExhibitPicture = async () => {
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
          uploadAddTempPostPicture(base64, exhibitId, ExhibitUId, localId)
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

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, []);

  useEffect(() => {
    props.navigation.setParams({ darkMode: darkModeValue });
  }, [darkModeValue]);

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: darkModeValue ? "black" : "white" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <KeyboardAwareScrollView
        enabledOnAndroid={true}
        extraScrollHeight={60}
        keyboardShouldPersistTaps="handled"
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
          <PreviewPostItem
            image={tempPhotoPostBase64}
            profileImageSource={profilePictureBase64}
            exhibitTitle={exhibitTitle}
            name="Christian Nicoletti"
            username="@christnicoletti"
            nameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            usernameStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            dateContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
            }}
            dateStyle={{
              color: "gray",
            }}
            exhibitContainer={{
              borderColor: darkModeValue ? "#616161" : "#e8e8e8",
              marginBottom: 10,
            }}
            titleContainer={{
              color: darkModeValue ? "white" : "black",
            }}
            threeDotsStyle={darkModeValue ? "white" : "black"}
            captionContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
            }}
            titleStyle={{
              color: "white",
            }}
            nameTitleColors={["rgba(0,0,0,1)", "rgba(0,0,0,0.00)"]}
            exhibitTitleColors={["rgba(0,0,0,0.00)", "rgba(0,0,0,1)"]}
            pictureCheerContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
            }}
            pictureCheerNumber={{
              color: darkModeValue ? "white" : "black",
            }}
            pictureCheerText={{
              color: darkModeValue ? "white" : "black",
            }}
            numberOfCheers={0}
            pictureCommentNumber={{
              color: darkModeValue ? "white" : "black",
            }}
            numberOfComments={0}
            pictureTitleContainer={{
              backgroundColor: darkModeValue ? "black" : "white",
            }}
            pictureTitleStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            captionStyle={{
              color: darkModeValue ? "white" : "black",
            }}
            caption={formState.inputValues.caption}
            arrowColor={"white"}
            onSelect={() => {}}
            links={parseLinkValuesFromInputValues(formState)}
          />
        </View>
        <View style={styles.form}>
          {!isLoadingTempPicture ? (
            <View style={styles.addPictureContainer}>
              <TouchableCmp onPress={addExhibitPicture}>
                <View style={styles.addPictureSubContainer}>
                  <Ionicons name="ios-add" size={14} color="#007AFF" />
                  <Text style={{ margin: 10, color: "#007AFF" }}>
                    Add Picture
                  </Text>
                </View>
              </TouchableCmp>
            </View>
          ) : (
            <View style={styles.loadingPictureTextContainer}>
              <Text
                style={{
                  ...styles.loadingPictureText,
                  color: darkModeValue ? "white" : "black",
                }}
              >
                Loading picture, please wait...
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
            id="caption"
            label="Caption"
            errorText="Please enter a valid caption!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            multiline
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={true}
            required
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
                    Add a link to post
                  </Text>
                </View>
              </TouchableCmp>
            </View>
          ) : null}
          {linksState && Object.keys(linksState).length > 0 ? (
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
          ) : null}
        </View>
        {!isLoading ? (
          <TouchableCmp
            onPress={submitHandler}
            disabled={!tempPhotoPostUrl || formState.formIsValid === false}
          >
            <View style={styles.confirmPostContainer}>
              <Text
                style={{
                  margin: 20,
                  marginRight: 10,
                  color:
                    !tempPhotoPostUrl || formState.formIsValid === false
                      ? "gray"
                      : "#007AFF",
                }}
              >
                Confirm and post
              </Text>
              <Ionicons
                name="ios-checkmark"
                size={18}
                color={
                  !tempPhotoPostUrl || formState.formIsValid === false
                    ? "gray"
                    : "#007AFF"
                }
              />
            </View>
          </TouchableCmp>
        ) : (
          <View style={styles.creatingPostContainer}>
            <Text
              style={{
                ...styles.creatingPostText,
                color: darkModeValue ? "white" : "black",
              }}
            >
              Creating post...
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
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    margin: 5,
  },

  previewText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    margin: 10,
  },

  addPictureContainer: {
    margin: 10,
    alignSelf: "center",
  },

  addPictureSubContainer: {
    alignItems: "center",
    flexDirection: "row",
  },

  loadingPictureTextContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  loadingPictureText: {
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

  confirmPostContainer: {
    margin: 10,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  creatingPostContainer: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  creatingPostText: {
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});

export default EditProfileScreen;
