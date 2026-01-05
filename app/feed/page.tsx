"use client";

import { MainShell } from "@/components/layout/main-shell";
import { FeedComposer } from "@/components/feed/feed-composer";
import { FeedPostCard } from "@/components/feed/feed-post";
import { useAppStore } from "@/lib/store/app-store";

export default function FeedPage() {
  const { feed } = useAppStore();
  return (
    <MainShell>
      <div className="space-y-4">
        <FeedComposer />
        <div className="space-y-3">
          {feed.map((post) => (
            <FeedPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </MainShell>
  );
}

