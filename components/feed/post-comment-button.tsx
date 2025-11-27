import { useThemeStyles } from "@/hooks/use-theme-styles";
import { usePostComments } from "@/store/selectors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

type PostCommentButtonProps = {
  postId: string;
};

export default function PostCommentButton({ postId }: PostCommentButtonProps) {
  const themed = useThemeStyles();
  const commentsCount = usePostComments(postId);

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={useCallback(
          () =>
            router.push({
              pathname: "/modal",
              params: { id: postId },
            }),
          [postId]
        )}
      >
        <FontAwesome5 name="comment" size={24} color={themed.icon} />
      </TouchableOpacity>
      <ThemedText>{commentsCount}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
