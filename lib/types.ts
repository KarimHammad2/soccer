export type Position = "GK" | "DEF" | "MID" | "FWD";
export type Foot = "Right" | "Left" | "Both";
export type SkillLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Semi-Pro"
  | "Pro";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Player {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  age?: number;
  bio?: string;
  positions: Position[];
  preferredFoot: Foot;
  skillLevel: SkillLevel;
  rating?: number;
  ratingsCount?: number;
  achievements?: string[];
  teamIds?: string[];
}

export type TeamRole = "captain" | "manager" | "member";

export interface TeamMember {
  playerId: string;
  role: TeamRole;
}

export interface Team {
  id: string;
  name: string;
  location: string;
  description?: string;
  level: SkillLevel;
  openForPlayers?: boolean;
  members: TeamMember[];
  upcomingMatchIds?: string[];
  feedPostIds?: string[];
}

export type MatchType = "Pickup" | "Team vs Team";
export type RSVPStatus = "Going" | "Maybe" | "Not Going";

export interface MatchRSVP {
  playerId: string;
  status: RSVPStatus;
}

export interface Match {
  id: string;
  title: string;
  type: MatchType;
  teamAId?: string;
  teamBId?: string;
  location: string;
  date: string; // ISO string
  skillLevel: SkillLevel;
  maxPlayers?: number;
  positionsNeeded?: { position: Position; count: number }[];
  attendees: MatchRSVP[];
}

export interface Rating {
  id: string;
  matchId: string;
  raterId: string;
  ratedPlayerId: string;
  score: number;
  tags?: string[];
}

export interface FeedComment {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface FeedPost {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  image?: string;
  likes: number;
  comments: FeedComment[];
}

export interface Conversation {
  id: string;
  participantIds: string[];
  messages: Message[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface SquadSlot {
  id: string;
  label: string;
  position: Position;
  playerId?: string;
}

