"use client";

import { create } from "zustand";

import { achievements as seedAchievements } from "@/lib/data/achievements";
import { conversations as seedConversations } from "@/lib/data/messages";
import { feedPosts as seedFeed } from "@/lib/data/feed";
import { matches as seedMatches } from "@/lib/data/matches";
import { players as seedPlayers } from "@/lib/data/players";
import { ratings as seedRatings } from "@/lib/data/ratings";
import { teams as seedTeams } from "@/lib/data/teams";
import {
  Conversation,
  FeedComment,
  FeedPost,
  Match,
  MatchRSVP,
  Player,
  Rating,
  SquadSlot,
  Team,
} from "@/lib/types";

type State = {
  currentUser: Player | null;
  players: Player[];
  teams: Team[];
  matches: Match[];
  feed: FeedPost[];
  conversations: Conversation[];
  ratings: Rating[];
  achievements: typeof seedAchievements;
  squadByUser: Record<string, SquadSlot[]>;
};

type Actions = {
  setCurrentUser: (playerId: string) => void;
  updatePlayer: (playerId: string, data: Partial<Player>) => void;
  createTeam: (input: Omit<Team, "id" | "members"> & { members?: Team["members"] }) => Team;
  updateTeam: (teamId: string, data: Partial<Team>) => void;
  addTeamMember: (teamId: string, member: Team["members"][number]) => void;
  removeTeamMember: (teamId: string, playerId: string) => void;
  createMatch: (input: Omit<Match, "id" | "attendees"> & { attendees?: MatchRSVP[] }) => Match;
  setRSVP: (matchId: string, playerId: string, status: MatchRSVP["status"]) => void;
  addRating: (entry: Omit<Rating, "id">) => void;
  addFeedPost: (input: Omit<FeedPost, "id" | "comments" | "likes">) => void;
  addComment: (postId: string, comment: Omit<FeedComment, "id">) => void;
  sendMessage: (conversationId: string, senderId: string, content: string) => void;
  setSquadSlot: (userId: string, slotId: string, playerId?: string) => void;
  resetSquad: (userId: string) => void;
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const defaultSquad = (): SquadSlot[] => [
  { id: "gk", label: "GK", position: "GK" },
  { id: "lb", label: "LB", position: "DEF" },
  { id: "cb1", label: "CB", position: "DEF" },
  { id: "cb2", label: "CB", position: "DEF" },
  { id: "rb", label: "RB", position: "DEF" },
  { id: "cm1", label: "CM", position: "MID" },
  { id: "cm2", label: "CM", position: "MID" },
  { id: "cam", label: "CAM", position: "MID" },
  { id: "lw", label: "LW", position: "FWD" },
  { id: "st", label: "ST", position: "FWD" },
  { id: "rw", label: "RW", position: "FWD" },
];

export const useAppStore = create<State & Actions>((set) => ({
  currentUser: clone(seedPlayers[0]),
  players: clone(seedPlayers),
  teams: clone(seedTeams),
  matches: clone(seedMatches),
  feed: clone(seedFeed),
  conversations: clone(seedConversations),
  ratings: clone(seedRatings),
  achievements: seedAchievements,
  squadByUser: {},
  setCurrentUser: (playerId) =>
    set((state) => ({
      currentUser: state.players.find((p) => p.id === playerId) || null,
    })),
  updatePlayer: (playerId, data) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, ...data } : p
      ),
      currentUser:
        state.currentUser?.id === playerId
          ? { ...state.currentUser, ...data }
          : state.currentUser,
    })),
  createTeam: (input) => {
    const newTeam: Team = {
      ...input,
      id: `t${Date.now()}`,
      members: input.members || [],
    };
    set((state) => ({ teams: [...state.teams, newTeam] }));
    return newTeam;
  },
  updateTeam: (teamId, data) =>
    set((state) => ({
      teams: state.teams.map((t) => (t.id === teamId ? { ...t, ...data } : t)),
    })),
  addTeamMember: (teamId, member) =>
    set((state) => ({
      teams: state.teams.map((t) =>
        t.id === teamId
          ? {
              ...t,
              members: t.members.some((m) => m.playerId === member.playerId)
                ? t.members
                : [...t.members, member],
            }
          : t
      ),
    })),
  removeTeamMember: (teamId, playerId) =>
    set((state) => ({
      teams: state.teams.map((t) =>
        t.id === teamId
          ? { ...t, members: t.members.filter((m) => m.playerId !== playerId) }
          : t
      ),
    })),
  createMatch: (input) => {
    const newMatch: Match = {
      ...input,
      id: `m${Date.now()}`,
      attendees: input.attendees || [],
    };
    set((state) => ({ matches: [...state.matches, newMatch] }));
    return newMatch;
  },
  setRSVP: (matchId, playerId, status) =>
    set((state) => ({
      matches: state.matches.map((m) => {
        if (m.id !== matchId) return m;
        const existing = m.attendees.find((a) => a.playerId === playerId);
        if (existing) {
          existing.status = status;
          return { ...m };
        }
        return { ...m, attendees: [...m.attendees, { playerId, status }] };
      }),
    })),
  addRating: (entry) =>
    set((state) => ({
      ratings: [...state.ratings, { ...entry, id: `r${Date.now()}` }],
    })),
  addFeedPost: (input) =>
    set((state) => ({
      feed: [
        {
          ...input,
          id: `f${Date.now()}`,
          comments: [],
          likes: 0,
        },
        ...state.feed,
      ],
    })),
  addComment: (postId, comment) =>
    set((state) => ({
      feed: state.feed.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { ...comment, id: `c${Date.now()}` },
              ],
            }
          : post
      ),
    })),
  sendMessage: (conversationId, senderId, content) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: `msg${Date.now()}`,
                  conversationId,
                  senderId,
                  content,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : c
      ),
    })),
  setSquadSlot: (userId, slotId, playerId) =>
    set((state) => {
      const current = state.squadByUser[userId] || defaultSquad();
      const updated = current.map((slot) =>
        slot.id === slotId ? { ...slot, playerId } : slot
      );
      return { squadByUser: { ...state.squadByUser, [userId]: updated } };
    }),
  resetSquad: (userId) =>
    set((state) => ({
      squadByUser: { ...state.squadByUser, [userId]: defaultSquad() },
    })),
}));

