"use client";

import { useState } from "react";

import { useAppStore } from "@/lib/store/app-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function FeedComposer() {
  const { currentUser, addFeedPost } = useAppStore();
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim() || !currentUser) return;
    addFeedPost({
      authorId: currentUser.id,
      content: value.trim(),
      createdAt: new Date().toISOString(),
    });
    setValue("");
  };

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Share an update..."
        />
        <div className="flex justify-end">
          <Button onClick={submit} disabled={!value.trim()}>
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

