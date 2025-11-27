import { useThemeStyles } from "@/hooks/use-theme-styles";
import {
  useCommentCreatedAt,
  useCommentText,
  useCommentUserImage,
  useCommentUsername,
} from "@/store/selectors";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import CommentLikeButton from "./comment-like-button";

function CommentRow({ commentId }: { commentId: string }) {
  const themed = useThemeStyles();

  const userImage = useCommentUserImage(commentId);
  const username = useCommentUsername(commentId);
  const createdAt = useCommentCreatedAt(commentId);
  const text = useCommentText(commentId);

  return (
    <View style={styles.commentContainer}>
      <View style={styles.userComment}>
        <Image source={{ uri: userImage }} style={styles.userImage} />

        <View style={styles.userInfo}>
          <View style={styles.userRow}>
            <ThemedText>{username}</ThemedText>
            <ThemedText style={[styles.commentSpan, { color: themed.icon }]}>
              {createdAt}
            </ThemedText>
          </View>
          <ThemedText>{text}</ThemedText>
          <ThemedText
            type="subtitle"
            style={[styles.replyComment, { color: themed.icon }]}
          >
            Responder
          </ThemedText>
        </View>
      </View>

      <CommentLikeButton commentId={commentId} />
    </View>
  );
}

export default React.memo(CommentRow);

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    gap: 2,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  userComment: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
    gap: 8,
    flexShrink: 1,
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginTop: 5,
  },
  userInfo: {
    gap: 6,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  replyComment: {
    marginTop: 4,
  },
  commentSpan: {
    fontSize: 10,
    lineHeight: 10,
  },
});
