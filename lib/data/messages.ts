import { Conversation } from "@/lib/types";

export const conversations: Conversation[] = [
  {
    id: "conv1",
    participantIds: ["p1", "p2", "p3"],
    messages: [
      {
        id: "msg1",
        conversationId: "conv1",
        senderId: "p2",
        content: "Kickoff moved to 7pm, can you both make it?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: "msg2",
        conversationId: "conv1",
        senderId: "p1",
        content: "Works for me!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: "msg3",
        conversationId: "conv1",
        senderId: "p3",
        content: "I'll be there.",
        createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      },
    ],
  },
  {
    id: "conv2",
    participantIds: ["p4", "p5"],
    messages: [
      {
        id: "msg4",
        conversationId: "conv2",
        senderId: "p5",
        content: "Can you cover CB for Sunday's game?",
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      },
      {
        id: "msg5",
        conversationId: "conv2",
        senderId: "p4",
        content: "Yes, count me in!",
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      },
    ],
  },
];

