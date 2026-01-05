"use client";

import { notFound, useParams } from "next/navigation";
import { useState } from "react";

import { MainShell } from "@/components/layout/main-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store/app-store";
import { players } from "@/lib/data/players";
import { Badge } from "@/components/ui/badge";

export default function ManageTeamPage() {
  const params = useParams<{ teamId: string }>();
  const { teams, updateTeam, addTeamMember, removeTeamMember } = useAppStore();
  const team = teams.find((t) => t.id === params.teamId);
  const [form, setForm] = useState({
    name: team?.name || "",
    description: team?.description || "",
    location: team?.location || "",
  });
  const [selectedPlayer, setSelectedPlayer] = useState("");

  if (!team) return notFound();

  const handleSave = () => {
    updateTeam(team.id, form);
  };

  const invite = () => {
    if (!selectedPlayer) return;
    addTeamMember(team.id, { playerId: selectedPlayer, role: "member" });
    setSelectedPlayer("");
  };

  return (
    <MainShell>
      <Card>
        <CardHeader>
          <CardTitle>Manage {team.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <Button onClick={handleSave}>Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Roster</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {team.members.map((m) => {
            const player = players.find((p) => p.id === m.playerId);
            if (!player) return null;
            return (
              <div
                key={m.playerId}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <div>
                  <div className="font-medium">{player.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {player.positions.join(" / ")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{m.role}</Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeTeamMember(team.id, m.playerId)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="rounded-md border p-3">
            <Label>Add player</Label>
            <select
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="">Select player</option>
              {players.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} • {p.positions.join("/")}
                </option>
              ))}
            </select>
            <Button className="mt-2 w-full" onClick={invite} disabled={!selectedPlayer}>
              Invite to team
            </Button>
          </div>
        </CardContent>
      </Card>
    </MainShell>
  );
}

