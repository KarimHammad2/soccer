import { feedPosts } from "@/lib/data/feed";
import { FeedComment, FeedPost } from "@/lib/types";

export function listFeed(): FeedPost[] {
  return feedPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addPost(data: Omit<FeedPost, "id" | "comments" | "likes">) {
  const post: FeedPost = {
    ...data,
    id: `f${feedPosts.length + 1}`,
    comments: [],
    likes: 0,
  };
  feedPosts.unshift(post);
  return post;
}

export function addComment(
  postId: string,
  comment: Omit<FeedComment, "id">
) {
  const post = feedPosts.find((p) => p.id === postId);
  if (!post) return null;
  const newComment: FeedComment = {
    ...comment,
    id: `c${post.comments.length + 1}`,
  };
  post.comments.push(newComment);
  return newComment;
}

