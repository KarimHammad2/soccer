"use client";

import { useMemo, useRef, useEffect, useState } from "react";

import { players } from "@/lib/data/players";
import { Conversation } from "@/lib/types";
import { useAppStore } from "@/lib/store/app-store";
import { timeAgo } from "@/lib/utils/formatting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ChatWindow({
  conversation,
  currentUserId,
}: {
  conversation: Conversation;
  currentUserId: string;
}) {
  const { sendMessage } = useAppStore();
  const [value, setValue] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const participants = useMemo(
    () =>
      conversation.participantIds
        .map((id) => players.find((p) => p.id === id))
        .filter(Boolean),
    [conversation.participantIds]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages.length]);

  const submit = () => {
    if (!value.trim()) return;
    sendMessage(conversation.id, currentUserId, value.trim());
    setValue("");
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">
          Chat with {participants.map((p) => p?.name).join(", ")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-[480px] flex-col gap-4">
        <div className="flex-1 space-y-3 overflow-y-auto rounded-md border bg-muted/40 p-3">
          {conversation.messages.map((msg) => {
            const sender = players.find((p) => p.id === msg.senderId);
            const mine = msg.senderId === currentUserId;
            return (
              <div
                key={msg.id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md rounded-lg p-3 text-sm ${
                    mine
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs opacity-80">
                    <span>{sender?.name}</span>
                    <span>{timeAgo(msg.createdAt)}</span>
                  </div>
                  <div>{msg.content}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <div className="space-y-2">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type a message"
          />
          <div className="flex justify-end">
            <Button onClick={submit} disabled={!value.trim()}>
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

