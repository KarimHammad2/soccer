import { conversations } from "@/lib/data/messages";
import { Conversation, Message } from "@/lib/types";

export function listConversationsForUser(userId: string): Conversation[] {
  return conversations.filter((c) => c.participantIds.includes(userId));
}

export function getConversation(id: string) {
  return conversations.find((c) => c.id === id);
}

export function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
): Message | null {
  const conversation = getConversation(conversationId);
  if (!conversation) return null;
  const message: Message = {
    id: `msg${conversation.messages.length + 1}`,
    conversationId,
    senderId,
    content,
    createdAt: new Date().toISOString(),
  };
  conversation.messages.push(message);
  return message;
}

