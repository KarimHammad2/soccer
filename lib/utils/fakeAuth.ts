import { players } from "@/lib/data/players";
import { Player } from "@/lib/types";

export function getDemoUsers(): Player[] {
  return players.slice(0, 5);
}

export function getDefaultUser(): Player {
  return players[0];
}

