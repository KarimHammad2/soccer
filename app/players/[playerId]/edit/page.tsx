"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { MainShell } from "@/components/layout/main-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store/app-store";
import { players } from "@/lib/data/players";
import { Foot, Position, SkillLevel } from "@/lib/types";

export default function EditPlayerPage() {
  const params = useParams<{ playerId: string }>();
  const router = useRouter();
  const player = players.find((p) => p.id === params.playerId);
  const { updatePlayer } = useAppStore();
  const [form, setForm] = useState<{
    name: string;
    location: string;
    bio: string;
    positions: string;
    preferredFoot: Foot;
    skillLevel: SkillLevel;
  }>({
    name: player?.name || "",
    location: player?.location || "",
    bio: player?.bio || "",
    positions: player?.positions.join(", ") || "",
    preferredFoot: (player?.preferredFoot || "Right") as Foot,
    skillLevel: (player?.skillLevel || "Intermediate") as SkillLevel,
  });

  if (!player) return null;

  const handleSubmit = () => {
    updatePlayer(player.id, {
      name: form.name,
      location: form.location,
      bio: form.bio,
      preferredFoot: form.preferredFoot as Foot,
      skillLevel: form.skillLevel as SkillLevel,
      positions: form.positions
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean) as Position[],
    });
    router.push(`/players/${player.id}`);
  };

  return (
    <MainShell>
      <Card>
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
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
            <Label>Bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Positions (comma separated)</Label>
            <Input
              value={form.positions}
              onChange={(e) => setForm({ ...form, positions: e.target.value })}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Preferred foot</Label>
              <Input
                value={form.preferredFoot}
                onChange={(e) =>
                  setForm({ ...form, preferredFoot: e.target.value as Foot })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Skill level</Label>
              <Input
                value={form.skillLevel}
                onChange={(e) =>
                  setForm({ ...form, skillLevel: e.target.value as SkillLevel })
                }
              />
            </div>
          </div>
          <Button onClick={handleSubmit}>Save changes</Button>
        </CardContent>
      </Card>
    </MainShell>
  );
}

