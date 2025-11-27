import {
  createComment,
  fetchCommentsByPost,
  fetchProfile,
  patchComments,
  patchPost,
} from "@/services/feed";
import type { FeedComment, Post, Profile } from "@/types/models";
import { create } from "zustand";

type FeedState = {
  profile: Profile | null;

  postIds: string[];
  posts: Record<string, Post>;

  comments: Record<string, FeedComment>;
  commentsByPost: Record<string, string[]>;

  loadProfile: () => Promise<void>;

  setPosts: (posts: Post[]) => void;
  toggleLike: (postId: string) => Promise<void>;

  loadComments: (postId: string) => Promise<void>;
  toggleCommentLike: (commentId: string) => Promise<void>;
  addComment: (postId: string, text: string) => Promise<void>;
};

export const useFeedStore = create<FeedState>((set, get) => ({
  profile: null,

  postIds: [],
  posts: {},

  comments: {},
  commentsByPost: {},

  loadProfile: async () => {
    const profile = await fetchProfile();
    set({ profile });
  },

  setPosts: (list) => {
    const postsMap: Record<string, Post> = {};
    const ids: string[] = [];

    for (const post of list) {
      postsMap[post.id] = post;
      ids.push(post.id);
    }

    set({ posts: postsMap, postIds: ids });
  },

  toggleLike: async (postId) => {
    const state = get();
    const prev = state.posts[postId];
    if (!prev) return;

    const optimistic = {
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
    };

    set((state) => ({
      posts: { ...state.posts, [postId]: optimistic },
    }));

    try {
      await patchPost(postId, {
        liked: optimistic.liked,
        likes: optimistic.likes,
      });
    } catch (err) {
      console.error(err);
      set((state) => ({
        posts: { ...state.posts, [postId]: prev },
      }));
    }
  },

  loadComments: async (postId) => {
    const { commentsByPost } = get();

    if (commentsByPost[postId]) return;

    const list = await fetchCommentsByPost(postId);

    const newComments: Record<string, FeedComment> = {};
    const ids: string[] = [];

    for (const comment of list) {
      newComments[comment.id] = comment;
      ids.push(comment.id);
    }

    set((state) => ({
      comments: {
        ...state.comments,
        ...newComments,
      },
      commentsByPost: {
        ...state.commentsByPost,
        [postId]: ids,
      },
    }));
  },

  toggleCommentLike: async (commentId) => {
    const state = get();
    const prev = state.comments[commentId];
    if (!prev) return;

    const optimistic = {
      ...prev,
      liked: !prev.liked,
      like: prev.liked ? prev.like - 1 : prev.like + 1,
    };

    set((state) => ({
      comments: { ...state.comments, [commentId]: optimistic },
    }));

    try {
      await patchComments(commentId, {
        liked: optimistic.liked,
        like: optimistic.like,
      });
    } catch (err) {
      console.error(err);
      set((state) => ({
        comments: { ...state.comments, [commentId]: prev },
      }));
    }
  },

  addComment: async (postId, text) => {
    const { profile, posts } = get();

    if (!profile) return;

    const post = posts[postId];
    if (!post) return;

    const newComment: FeedComment = {
      id: crypto.randomUUID(),
      text,
      like: 0,
      created_at: "agora",
      liked: false,
      postId,
      user: profile,
    };

    set((state) => ({
      comments: {
        ...state.comments,
        [newComment.id]: newComment,
      },
      commentsByPost: {
        ...state.commentsByPost,
        [postId]: [...(state.commentsByPost[postId] ?? []), newComment.id],
      },
      posts: {
        ...state.posts,
        [postId]: {
          ...state.posts[postId],
          comments_count: state.posts[postId].comments_count + 1,
        },
      },
    }));

    try {
      const saved = await createComment(newComment);

      set((state) => {
        const { [newComment.id]: old, ...restComments } = state.comments;

        return {
          comments: {
            ...restComments,
            [saved.id]: saved,
          },
          commentsByPost: {
            ...state.commentsByPost,
            [postId]: state.commentsByPost[postId].map((id) =>
              id === newComment.id ? saved.id : id
            ),
          },
        };
      });

      await patchPost(postId, {
        comments_count: post.comments_count + 1,
      });
    } catch (err) {
      console.error("Falha ao criar comentário", err);

      set((state) => {
        const { [newComment.id]: removed, ...restComments } = state.comments;

        return {
          comments: restComments,
          commentsByPost: {
            ...state.commentsByPost,
            [postId]: state.commentsByPost[postId].filter(
              (id) => id !== newComment.id
            ),
          },
          posts: {
            ...state.posts,
            [postId]: {
              ...state.posts[postId],
              comments_count: state.posts[postId].comments_count - 1,
            },
          },
        };
      });
    }
  },
}));
