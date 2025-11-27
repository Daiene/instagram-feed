import { useThemeStyles } from "@/hooks/use-theme-styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Header() {
  const themed = useThemeStyles();

  return (
    <View style={styles.container}>
      <FontAwesome6 name="add" size={25} style={{ color: themed.text }} />

      <Image source={themed.logo} style={styles.image} />

      <View>
        <View
          style={[styles.notification, { borderColor: themed.background }]}
        />
        <FontAwesome6 name="heart" size={25} style={{ color: themed.text }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    maxWidth: 512,
    width: "100%",
    alignSelf: "center",
  },
  image: {
    width: 100,
    height: 28,
  },
  notification: {
    backgroundColor: "#ff3040",
    width: 10,
    height: 10,
    borderRadius: 50,
    position: "absolute",
    top: 1,
    right: -2,
    zIndex: 10,
    borderWidth: 1,
  },
});
