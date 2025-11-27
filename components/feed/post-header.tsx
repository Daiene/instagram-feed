import { usePostUserImageUrl, usePostUsername } from "@/store/selectors";
import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export default function PostHeader({ postId }: { postId: string }) {
  const userImage = usePostUserImageUrl(postId);
  const userName = usePostUsername(postId);

  return (
    <View style={styles.row}>
      <Image source={{ uri: userImage }} style={styles.userImage} />
      <ThemedText>{userName}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 12,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
