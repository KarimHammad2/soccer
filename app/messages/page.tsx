"use client";

import { MainShell } from "@/components/layout/main-shell";
import { ConversationList } from "@/components/messages/conversation-list";
import { useAppStore } from "@/lib/store/app-store";

export default function MessagesPage() {
  const { currentUser, conversations } = useAppStore();

  if (!currentUser) return null;

  return (
    <MainShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Messages</h1>
        <ConversationList
          currentUserId={currentUser.id}
          conversations={conversations}
        />
      </div>
    </MainShell>
  );
}

