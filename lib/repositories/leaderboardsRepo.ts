import { players } from "@/lib/data/players";
import { matches } from "@/lib/data/matches";
import { ratings } from "@/lib/data/ratings";
import { Player } from "@/lib/types";

export function topPlayers(limit = 5): Player[] {
  const withRating = players.map((p) => {
    const playerRatings = ratings.filter((r) => r.ratedPlayerId === p.id);
    const total = playerRatings.reduce((sum, r) => sum + r.score, 0);
    const avg = playerRatings.length ? total / playerRatings.length : p.rating || 0;
    return { ...p, rating: avg, ratingsCount: playerRatings.length };
  });
  return withRating
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

export function mostActive(limit = 5): Player[] {
  const counts: Record<string, number> = {};
  matches.forEach((m) =>
    m.attendees.forEach((a) => {
      counts[a.playerId] = (counts[a.playerId] || 0) + 1;
    })
  );
  const withCount = players.map((p) => ({ ...p, matchesPlayed: counts[p.id] || 0 }));
  return withCount.sort((a, b) => (b.matchesPlayed || 0) - (a.matchesPlayed || 0)).slice(0, limit);
}

