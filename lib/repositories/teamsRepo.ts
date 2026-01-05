import { teams } from "@/lib/data/teams";
import { players } from "@/lib/data/players";
import { Team, TeamMember, SkillLevel } from "@/lib/types";

type TeamFilters = {
  location?: string;
  level?: SkillLevel;
};

export function listTeams(filters: TeamFilters = {}) {
  return teams.filter((t) => {
    const matchesLocation =
      !filters.location ||
      t.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesLevel = !filters.level || t.level === filters.level;
    return matchesLocation && matchesLevel;
  });
}

export function getTeamById(id: string) {
  return teams.find((t) => t.id === id);
}

export function createTeam(data: Omit<Team, "id">) {
  const newTeam: Team = { id: `t${teams.length + 1}`, ...data };
  teams.push(newTeam);
  return newTeam;
}

export function updateTeam(id: string, data: Partial<Team>) {
  const team = getTeamById(id);
  if (!team) return null;
  Object.assign(team, data);
  return team;
}

export function addMember(teamId: string, member: TeamMember) {
  const team = getTeamById(teamId);
  if (!team) return null;
  const exists = team.members.find((m) => m.playerId === member.playerId);
  if (!exists) {
    team.members.push(member);
  }
  return team;
}

export function removeMember(teamId: string, playerId: string) {
  const team = getTeamById(teamId);
  if (!team) return null;
  team.members = team.members.filter((m) => m.playerId !== playerId);
  return team;
}

export function getTeamRoster(teamId: string) {
  const team = getTeamById(teamId);
  if (!team) return [];
  return team.members
    .map((member) => ({
      ...member,
      player: players.find((p) => p.id === member.playerId),
    }))
    .filter((m) => m.player);
}

