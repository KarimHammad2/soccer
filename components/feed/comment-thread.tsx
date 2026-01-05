import { FeedComment } from "@/lib/types";
import { players } from "@/lib/data/players";
import { timeAgo } from "@/lib/utils/formatting";

export function CommentThread({ comments }: { comments: FeedComment[] }) {
  if (!comments.length) return null;
  return (
    <div className="space-y-2">
      {comments.map((c) => {
        const author = players.find((p) => p.id === c.authorId);
        return (
          <div key={c.id} className="rounded-md bg-muted/50 p-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">{author?.name}</span>
              <span className="text-xs text-muted-foreground">
                {timeAgo(c.createdAt)}
              </span>
            </div>
            <p className="text-muted-foreground">{c.content}</p>
          </div>
        );
      })}
    </div>
  );
}

