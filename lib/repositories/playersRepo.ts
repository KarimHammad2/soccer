import { players } from "@/lib/data/players";
import { ratings } from "@/lib/data/ratings";
import { Player, Position, SkillLevel } from "@/lib/types";

type PlayerFilters = {
  search?: string;
  location?: string;
  positions?: string[];
  foot?: string;
  skillLevel?: SkillLevel;
};

export function listPlayers(filters: PlayerFilters = {}): Player[] {
  const term = filters.search?.toLowerCase();
  return players.filter((p) => {
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.location.toLowerCase().includes(term);
    const matchesLocation =
      !filters.location ||
      p.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesPosition =
      !filters.positions ||
      filters.positions.length === 0 ||
      filters.positions.some((pos) => p.positions.includes(pos as Position));
    const matchesFoot = !filters.foot || p.preferredFoot === filters.foot;
    const matchesSkill =
      !filters.skillLevel || p.skillLevel === filters.skillLevel;
    return (
      matchesSearch &&
      matchesLocation &&
      matchesPosition &&
      matchesFoot &&
      matchesSkill
    );
  });
}

export function getPlayerById(id: string) {
  return players.find((p) => p.id === id);
}

export function updatePlayer(id: string, data: Partial<Player>) {
  const player = getPlayerById(id);
  if (!player) return null;
  Object.assign(player, data);
  return player;
}

export function getPlayerAverageRating(playerId: string) {
  const playerRatings = ratings.filter((r) => r.ratedPlayerId === playerId);
  const total = playerRatings.reduce((acc, r) => acc + r.score, 0);
  const average = playerRatings.length ? total / playerRatings.length : 0;
  return { average, count: playerRatings.length };
}

