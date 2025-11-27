import { BASE_URL } from "@/env";
import type { FeedComment, Post, Profile } from "@/types/models";

/* --------------------- GET --------------------- */

export async function fetchProfile(): Promise<Profile> {
  const res = await fetch(`${BASE_URL}/profile`);

  return res.json();
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);

  return res.json();
}

export async function fetchCommentsByPost(
  postId: string
): Promise<FeedComment[]> {
  const res = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return res.json();
}

/* --------------------- PATCH --------------------- */

export async function patchPost(
  postId: string,
  data: Partial<Post>
): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function patchComments(
  commentId: string,
  data: Partial<FeedComment>
): Promise<FeedComment> {
  const res = await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function createComment(
  comment: FeedComment
): Promise<FeedComment> {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  return res.json();
}
