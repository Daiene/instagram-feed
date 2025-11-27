import { usePostImageUrl } from "@/store/selectors";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export default function PostImage({ postId }: { postId: string }) {
  const imageUrl = usePostImageUrl(postId);

  return (
    <Image
      source={{ uri: imageUrl }}
      style={styles.image}
      cachePolicy="memory-disk"
      priority="high"
      contentFit="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 550,
  },
});
