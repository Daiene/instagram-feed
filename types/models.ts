export type User = {
  id: string;
  image_url: string;
  username: string;
};

export type Post = {
  id: string;
  image_url: string;
  caption: string;
  likes: number;
  liked: boolean;
  saved: boolean;
  created_at: string;
  comments_count: number;
  user: User;
};

export type FeedComment = {
  id: string;
  text: string;
  like: number;
  created_at: string;
  liked: boolean;
  user: User;
  postId: string;
};

export type Profile = {
  id: string;
  username: string;
  image_url: string;
};
