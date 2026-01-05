import { matches } from "@/lib/data/matches";
import { ratings } from "@/lib/data/ratings";
import { Match, Rating, RSVPStatus } from "@/lib/types";

export function listMatches() {
  return matches;
}

export function getMatchById(id: string) {
  return matches.find((m) => m.id === id);
}

export function createMatch(data: Omit<Match, "id">) {
  const newMatch: Match = { id: `m${matches.length + 1}`, ...data };
  matches.push(newMatch);
  return newMatch;
}

export function updateMatch(id: string, data: Partial<Match>) {
  const match = getMatchById(id);
  if (!match) return null;
  Object.assign(match, data);
  return match;
}

export function setRSVP(
  matchId: string,
  playerId: string,
  status: RSVPStatus
): Match | null {
  const match = getMatchById(matchId);
  if (!match) return null;
  const existing = match.attendees.find((a) => a.playerId === playerId);
  if (existing) {
    existing.status = status;
  } else {
    match.attendees.push({ playerId, status });
  }
  return match;
}

export function addRating(entry: Omit<Rating, "id">) {
  const newRating: Rating = { id: `r${ratings.length + 1}`, ...entry };
  ratings.push(newRating);
  return newRating;
}

export function getRatingsForMatch(matchId: string) {
  return ratings.filter((r) => r.matchId === matchId);
}

export function getUpcomingAndPast() {
  const now = Date.now();
  const upcoming = matches.filter((m) => new Date(m.date).getTime() >= now);
  const past = matches.filter((m) => new Date(m.date).getTime() < now);
  return { upcoming, past };
}

