"use client";

import { useRouter } from "next/navigation";

import { getDemoUsers } from "@/lib/utils/fakeAuth";
import { useAppStore } from "@/lib/store/app-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const users = getDemoUsers();
  const { setCurrentUser } = useAppStore();
  const router = useRouter();

  const handleSelect = (id: string) => {
    setCurrentUser(id);
    router.push("/dashboard");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase text-primary">Demo login</p>
        <h1 className="mt-2 text-3xl font-bold">Continue as a player</h1>
        <p className="text-muted-foreground">
          Select a mock profile to explore the platform.
        </p>
      </div>
      <div className="grid w-full gap-4 sm:grid-cols-2">
        {users.map((user) => (
          <Card key={user.id} className="hover:border-primary/60">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.location}</p>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {user.positions.join(" / ")} • {user.skillLevel}
              </div>
              <Button onClick={() => handleSelect(user.id)}>Continue</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

