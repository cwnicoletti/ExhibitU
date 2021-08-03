import {
  Feather,
  MaterialCommunityIcons,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  SafeAreaView,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppSelector } from "../../hooks";

const RightDrawer = (props) => {
  const darkModeValue = useAppSelector((state) => state.user.darkMode);

  let TouchableCmp: any = TouchableOpacity;
  if (Platform.OS === "android") {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: darkModeValue ? "black" : "white",
        borderLeftWidth: 0.3,
        borderLeftColor: darkModeValue ? "white" : "black",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomColor: darkModeValue ? "white" : "black",
        }}
      >
        <SafeAreaView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Feather
              name="settings"
              size={21}
              color={darkModeValue ? "white" : "black"}
            />
            <Text
              style={{
                color: darkModeValue ? "white" : "black",
                margin: 10,
                fontSize: 20,
              }}
            >
              Settings
            </Text>
          </View>
        </SafeAreaView>
      </View>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 10,
            marginTop: 20,
          }}
        >
          <SimpleLineIcons
            name="trophy"
            size={20}
            color={darkModeValue ? "white" : "black"}
          />
          <TouchableCmp onPress={props.ShowcaseOnPress}>
            <View>
              <Text
                style={{
                  color: darkModeValue ? "#bababa" : "black",
                  fontSize: 18,
                  marginHorizontal: 10,
                }}
              >
                Profile
              </Text>
            </View>
          </TouchableCmp>
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 10,
          }}
        >
          <MaterialCommunityIcons
            name="update"
            size={20}
            color={darkModeValue ? "white" : "black"}
          />
          <TouchableCmp onPress={props.updatesOnPress}>
            <View>
              <Text
                style={{
                  color: darkModeValue ? "#bababa" : "black",
                  fontSize: 18,
                  marginHorizontal: 10,
                }}
              >
                Future Updates
              </Text>
            </View>
          </TouchableCmp>
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 10,
          }}
        >
          <AntDesign
            name="questioncircleo"
            size={20}
            color={darkModeValue ? "white" : "black"}
          />
          <TouchableCmp onPress={props.tutorialOnPress}>
            <View>
              <Text
                style={{
                  color: darkModeValue ? "#bababa" : "black",
                  fontSize: 18,
                  marginHorizontal: 10,
                }}
              >
                Tutorial
              </Text>
            </View>
          </TouchableCmp>
        </View>
      </SafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          margin: 5,
        }}
      >
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name="logout"
              size={20}
              color={darkModeValue ? "white" : "black"}
            />
            <TouchableCmp onPress={props.logoutOnPress}>
              <View>
                <Text
                  style={{
                    color: darkModeValue ? "#bababa" : "black",
                    fontSize: 18,
                    marginHorizontal: 10,
                  }}
                >
                  Logout
                </Text>
              </View>
            </TouchableCmp>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default RightDrawer;
