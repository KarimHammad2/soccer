import Link from "next/link";

import { conversations as seedConversations } from "@/lib/data/messages";
import { players } from "@/lib/data/players";
import { timeAgo } from "@/lib/utils/formatting";
import { Card, CardContent } from "@/components/ui/card";

export function ConversationList({
  currentUserId,
  conversations = seedConversations,
}: {
  currentUserId: string;
  conversations?: typeof seedConversations;
}) {
  const list = conversations.filter((c) => c.participantIds.includes(currentUserId));

  return (
    <div className="space-y-2">
      {list.map((conv) => {
        const last = conv.messages[conv.messages.length - 1];
        const others = conv.participantIds.filter((id) => id !== currentUserId);
        const names = others
          .map((id) => players.find((p) => p.id === id)?.name)
          .filter(Boolean)
          .join(", ");
        return (
          <Link key={conv.id} href={`/messages/${conv.id}`}>
            <Card className="hover:border-primary/60">
              <CardContent className="p-4">
                <div className="font-medium">{names || "Conversation"}</div>
                <div className="text-sm text-muted-foreground">
                  {last?.content} • {timeAgo(last?.createdAt || new Date())}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

