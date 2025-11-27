import { useThemeStyles } from "@/hooks/use-theme-styles";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function ModalHeader() {
  const themed = useThemeStyles();

  return (
    <View>
      <View style={[styles.modalHeader, { borderColor: themed.panel }]}>
        <ThemedText type="title">Comentários</ThemedText>

        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Feather name="x" size={24} color={themed.icon} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});
