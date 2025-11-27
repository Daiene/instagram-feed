import { useThemeStyles } from "@/hooks/use-theme-styles";
import {
  useCommentLike,
  useCommentLiked,
  useToggleCommentLike,
} from "@/store/selectors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function CommentLikeButton({
  commentId,
}: {
  commentId: string;
}) {
  const themed = useThemeStyles();

  const likes = useCommentLike(commentId);
  const liked = useCommentLiked(commentId);
  const toggleLike = useToggleCommentLike();

  const handlePress = useCallback(() => {
    toggleLike(commentId);
  }, [toggleLike, commentId]);

  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={handlePress}>
        <FontAwesome
          name={liked ? "heart" : "heart-o"}
          size={20}
          color={liked ? "#ff3040" : themed.icon}
        />
      </TouchableOpacity>
      <ThemedText style={[styles.commentSpan, { color: themed.icon }]}>
        {likes}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  commentSpan: {
    fontSize: 10,
    lineHeight: 10,
  },
});
