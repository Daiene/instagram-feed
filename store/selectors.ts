import { useFeedStore } from "./feed";

/* --------------------- PROFILE ------------------- */

export const useProfile = () => useFeedStore((state) => state.loadProfile);

/* --------------------- POSTS --------------------- */

export const usePostIds = () => useFeedStore((state) => state.postIds);

export const useSetPosts = () => useFeedStore((state) => state.setPosts);

export const usePostLikes = (postId: string) =>
  useFeedStore((state) => state.posts[postId]?.likes);

export const usePostComments = (postId: string) =>
  useFeedStore((state) => state.posts[postId]?.comments_count);

export const usePostLiked = (postId: string) =>
  useFeedStore((state) => state.posts[postId]?.liked);

export const useToggleLike = () => useFeedStore((state) => state.toggleLike);

export const usePostImageUrl = (postId: string) =>
  useFeedStore((state) => state.posts[postId]?.image_url);

export const usePostUserImageUrl = (postId: string) =>
  useFeedStore((state) => state.posts[postId]?.user.image_url);

export const usePostUsername = (postId: string) =>
  useFeedStore((state) => state.posts[postId]?.user.username);

export const usePostCaption = (postId: string) =>
  useFeedStore((state) => state.posts[postId]?.caption);

/* --------------------- Comments ------------------ */

export const useLoadComments = () =>
  useFeedStore((state) => state.loadComments);

export const useCommentIdsOfPost = (commentId: string) =>
  useFeedStore((state) => state.commentsByPost[commentId]);

export const usePostCommentsCount = (commentId: string) =>
  useFeedStore((state) => state.posts[commentId]?.comments_count ?? 0);

export const useCommentUserImage = (commentId: string) =>
  useFeedStore((state) => state.comments[commentId]?.user.image_url);

export const useCommentUsername = (commentId: string) =>
  useFeedStore((state) => state.comments[commentId]?.user.username);

export const useCommentCreatedAt = (commentId: string) =>
  useFeedStore((state) => state.comments[commentId]?.created_at);

export const useCommentText = (commentId: string) =>
  useFeedStore((state) => state.comments[commentId]?.text);

export const useCommentLike = (commentId: string) =>
  useFeedStore((state) => state.comments[commentId]?.like);

export const useCommentLiked = (commentId: string) =>
  useFeedStore((state) => state.comments[commentId]?.liked);

export const useToggleCommentLike = () =>
  useFeedStore((state) => state.toggleCommentLike);

export const useAddComment = () => useFeedStore((state) => state.addComment);
