import { Team } from "@/lib/types";

export const teams: Team[] = [
  {
    id: "t1",
    name: "Madrid City",
    location: "Madrid, ES",
    description: "Competitive 7-a-side squad focused on possession play.",
    level: "Advanced",
    openForPlayers: true,
    members: [
      { playerId: "p1", role: "captain" },
      { playerId: "p2", role: "member" },
    ],
    upcomingMatchIds: ["m1"],
    feedPostIds: ["f1"],
  },
  {
    id: "t2",
    name: "North London FC",
    location: "London, UK",
    description: "Sunday league club with training twice a week.",
    level: "Semi-Pro",
    openForPlayers: false,
    members: [
      { playerId: "p2", role: "captain" },
      { playerId: "p3", role: "manager" },
      { playerId: "p6", role: "member" },
    ],
    upcomingMatchIds: ["m2"],
    feedPostIds: ["f2"],
  },
  {
    id: "t3",
    name: "Brooklyn United",
    location: "New York, US",
    description: "Friendly pickup collective, open to new players.",
    level: "Intermediate",
    openForPlayers: true,
    members: [
      { playerId: "p4", role: "captain" },
      { playerId: "p5", role: "member" },
    ],
    upcomingMatchIds: ["m3"],
  },
];

