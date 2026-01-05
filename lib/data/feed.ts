import { FeedPost } from "@/lib/types";

export const feedPosts: FeedPost[] = [
  {
    id: "f1",
    authorId: "p1",
    content: "Great run today! Thanks everyone for joining the scrimmage.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    likes: 12,
    comments: [
      {
        id: "c1",
        authorId: "p2",
        content: "Loved the intensity!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    ],
  },
  {
    id: "f2",
    authorId: "p3",
    content:
      "North London FC looking for a pacey winger this weekend. DM if interested.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    likes: 8,
    comments: [],
  },
  {
    id: "f3",
    authorId: "p4",
    content: "Any goalkeepers free for Sunday pickup in Brooklyn?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    likes: 5,
    comments: [
      {
        id: "c2",
        authorId: "p6",
        content: "Count me in!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 34).toISOString(),
      },
    ],
  },
];

