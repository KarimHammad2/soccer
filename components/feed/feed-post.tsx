"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";

import { FeedPost } from "@/lib/types";
import { players } from "@/lib/data/players";
import { timeAgo } from "@/lib/utils/formatting";
import { useAppStore } from "@/lib/store/app-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function FeedPostCard({ post }: { post: FeedPost }) {
  const author = players.find((p) => p.id === post.authorId);
  const { addComment, currentUser } = useAppStore();
  const [comment, setComment] = useState("");

  const submitComment = () => {
    if (!comment.trim() || !currentUser) return;
    addComment(post.id, {
      authorId: currentUser.id,
      content: comment.trim(),
      createdAt: new Date().toISOString(),
    });
    setComment("");
  };

  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={author?.avatar} />
          <AvatarFallback>{author?.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">{author?.name}</div>
          <div className="text-xs text-muted-foreground">
            {timeAgo(post.createdAt)}
          </div>
        </div>
        {author?.skillLevel ? (
          <Badge variant="secondary" className="ml-auto">
            {author.skillLevel}
          </Badge>
        ) : null}
      </div>
      <p className="text-sm">{post.content}</p>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          {post.likes}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          {post.comments.length}
        </span>
      </div>
      <div className="space-y-2">
        {post.comments.map((c) => {
          const cAuthor = players.find((p) => p.id === c.authorId);
          return (
            <div key={c.id} className="rounded-md bg-muted/50 p-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{cAuthor?.name}</span>
                <span className="text-xs text-muted-foreground">
                  {timeAgo(c.createdAt)}
                </span>
              </div>
              <p className="text-muted-foreground">{c.content}</p>
            </div>
          );
        })}
      </div>
      <div className="space-y-2">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={submitComment} disabled={!comment.trim()}>
            Comment
          </Button>
        </div>
      </div>
      <Link href="/messages" className="text-xs text-primary underline">
        Send message
      </Link>
    </div>
  );
}

