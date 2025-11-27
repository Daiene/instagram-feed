import { fetchPosts } from "@/services/feed";
import { usePostIds, useSetPosts } from "@/store/selectors";
import { useIsFocused } from "@react-navigation/native";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Dimensions, Platform, RefreshControl, View } from "react-native";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";
import PostItem from "./post-item";

const SCREEN_WIDTH = Dimensions.get("window").width;

const HEADER_HEIGHT = 50 + 12 + 12;
const IMAGE_HEIGHT = 550;
const ACTIONS_HEIGHT = 40 + 12;
const GAP = 15;

const POST_HEIGHT = HEADER_HEIGHT + IMAGE_HEIGHT + ACTIONS_HEIGHT + GAP;

type FocusBlockProps = {
  children: ReactNode;
};

function FocusBlock({ children }: FocusBlockProps) {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused && Platform.OS === "web") {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }, [isFocused]);

  return (
    <View
      style={{ flex: 1 }}
      pointerEvents={isFocused ? "auto" : "none"}
      {...(Platform.OS === "web" ? { inert: isFocused ? undefined : "" } : {})}
    >
      {children}
    </View>
  );
}

export default function FeedScreen() {
  const postIds = usePostIds();
  const setPosts = useSetPosts();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function load() {
      const posts = await fetchPosts();
      setPosts(posts);
    }

    load();
  }, [setPosts]);

  const dataProvider = useMemo(() => {
    return new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(postIds);
  }, [postIds]);

  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        () => "POST",
        (_, dim) => {
          dim.width = SCREEN_WIDTH;
          dim.height = POST_HEIGHT;
        }
      ),
    []
  );

  const rowRenderer = useCallback(
    (_type: string | number, postId: string) => <PostItem postId={postId} />,
    []
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts().then((posts) => {
      setPosts(posts);
      setRefreshing(false);
    });
  }, [setPosts]);

  return (
    <FocusBlock>
      <RecyclerListView
        style={{ flex: 1 }}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          showsHorizontalScrollIndicator: false,
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ),
        }}
      />
    </FocusBlock>
  );
}
