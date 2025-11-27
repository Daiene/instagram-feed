import { useThemeStyles } from "@/hooks/use-theme-styles";
import { usePostLiked, usePostLikes, useToggleLike } from "@/store/selectors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function PostLikeButton({ postId }: { postId: string }) {
  const themed = useThemeStyles();

  const liked = usePostLiked(postId);
  const likes = usePostLikes(postId);
  const toggleLike = useToggleLike();

  const handlePress = useCallback(() => {
    toggleLike(postId);
  }, [toggleLike, postId]);

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={handlePress}>
        <FontAwesome
          name={liked ? "heart" : "heart-o"}
          size={24}
          color={liked ? "#ff3040" : themed.icon}
        />
      </TouchableOpacity>
      <ThemedText>{likes}</ThemedText>
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
