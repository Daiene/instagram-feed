import { memo } from "react";
import { StyleSheet, View } from "react-native";
import PostCommentButton from "./post-comment-button";
import PostHeader from "./post-header";
import PostImage from "./post-image";
import PostLikeButton from "./post-like-button";

type PostItemProps = {
  postId: string;
};

function PostItem({ postId }: PostItemProps) {
  console.log(postId);
  return (
    <View style={styles.container}>
      <PostHeader postId={postId} />
      <PostImage postId={postId} />
      <View style={styles.actions}>
        <PostLikeButton postId={postId} />
        <PostCommentButton postId={postId} />
      </View>
    </View>
  );
}

export default memo(PostItem);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    maxWidth: 512,
    gap: 15,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
  },
});
