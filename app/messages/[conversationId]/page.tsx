"use client";

import { notFound, useParams } from "next/navigation";

import { MainShell } from "@/components/layout/main-shell";
import { ChatWindow } from "@/components/messages/chat-window";
import { useAppStore } from "@/lib/store/app-store";

export default function ConversationPage() {
  const params = useParams<{ conversationId: string }>();
  const { currentUser, conversations } = useAppStore();
  const conversation = conversations.find((c) => c.id === params.conversationId);

  if (!conversation || !currentUser) return notFound();

  return (
    <MainShell>
      <ChatWindow conversation={conversation} currentUserId={currentUser.id} />
    </MainShell>
  );
}

