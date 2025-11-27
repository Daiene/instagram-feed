import CommentRow from "@/components/comments/comment-row";
import ModalHeader from "@/components/comments/modal-header";
import { useThemeStyles } from "@/hooks/use-theme-styles";
import {
  useAddComment,
  useCommentIdsOfPost,
  useLoadComments,
} from "@/store/selectors";
import Feather from "@expo/vector-icons/Feather";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Modal() {
  const themed = useThemeStyles();

  const { id: postId } = useLocalSearchParams<{ id: string }>();

  const loadComments = useLoadComments();
  const addComment = useAddComment();
  const commentIds = useCommentIdsOfPost(postId);

  const [text, setText] = useState("");

  useEffect(() => {
    if (!commentIds) {
      loadComments(postId);
    }
  }, [commentIds, loadComments, postId]);

  const dataProvider = useMemo(() => {
    const safeIds = commentIds ?? [];
    return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(safeIds);
  }, [commentIds]);

  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        () => "COMMENT",
        (_, dim) => {
          dim.width = SCREEN_WIDTH;
          dim.height = 85;
        }
      ),
    []
  );

  const rowRenderer = useCallback(
    (_type: string | number, commentId: string) => (
      <CommentRow commentId={commentId} />
    ),
    []
  );

  const sendComment = useCallback(() => {
    if (!text.trim()) return;

    addComment(postId, text.trim());

    setText("");
  }, [text, addComment, postId]);

  return (
    <View style={[styles.container, { backgroundColor: themed.background }]}>
      <ModalHeader />

      <RecyclerListView
        style={{ flex: 1 }}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          showsHorizontalScrollIndicator: false,
        }}
      />

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: themed.panel,
            backgroundColor: themed.panel,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: themed.text }]}
          placeholder="O que você acha disso?"
          placeholderTextColor={themed.icon}
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity onPress={sendComment}>
          <Feather name="send" size={20} color={themed.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 18,
    gap: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
