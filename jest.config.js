const esModules =
  "react-navigation-header-buttons|@expo|react-native-adapter|expo-linear-gradient|@unimodules|react-native|react-native-gesture-handler|vector-icons|expo-font|@unimodules|expo-asset|expo-constants|expo-file-system|expo-web-browser|react-navigation|react-navigation-stack|unimodules-permissions-interface|expo-permissions|expo-image-picker|expo-linear-gradient|expo-constants";

module.exports = {
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};
