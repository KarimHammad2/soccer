import { Match } from "@/lib/types";

export const matches: Match[] = [
  {
    id: "m1",
    title: "Training Scrimmage",
    type: "Pickup",
    location: "Madrid Sports Center",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    skillLevel: "Advanced",
    maxPlayers: 14,
    positionsNeeded: [
      { position: "GK", count: 1 },
      { position: "DEF", count: 4 },
      { position: "MID", count: 4 },
      { position: "FWD", count: 2 },
    ],
    attendees: [
      { playerId: "p1", status: "Going" },
      { playerId: "p2", status: "Maybe" },
    ],
  },
  {
    id: "m2",
    title: "League Match vs Madrid City",
    type: "Team vs Team",
    teamAId: "t2",
    teamBId: "t1",
    location: "Emirates 5s",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
    skillLevel: "Semi-Pro",
    maxPlayers: 14,
    attendees: [
      { playerId: "p2", status: "Going" },
      { playerId: "p3", status: "Going" },
      { playerId: "p1", status: "Going" },
    ],
  },
  {
    id: "m3",
    title: "Brooklyn Friendly",
    type: "Pickup",
    location: "Brooklyn Bridge Park",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    skillLevel: "Intermediate",
    attendees: [
      { playerId: "p4", status: "Going" },
      { playerId: "p5", status: "Going" },
    ],
  },
];

