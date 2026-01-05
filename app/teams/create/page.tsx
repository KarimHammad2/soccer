"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { MainShell } from "@/components/layout/main-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/lib/store/app-store";

export default function CreateTeamPage() {
  const router = useRouter();
  const { createTeam, currentUser } = useAppStore();
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    level: "Intermediate",
    openForPlayers: true,
  });

  const handleSubmit = () => {
    const team = createTeam({
      ...form,
      members: currentUser ? [{ playerId: currentUser.id, role: "captain" }] : [],
    });
    router.push(`/teams/${team.id}`);
  };

  return (
    <MainShell>
      <Card>
        <CardHeader>
          <CardTitle>Create a team</CardTitle>
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
          <div className="space-y-2">
            <Label>Level</Label>
            <Input
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            />
          </div>
          <Button onClick={handleSubmit} disabled={!form.name}>
            Create team
          </Button>
        </CardContent>
      </Card>
    </MainShell>
  );
}

