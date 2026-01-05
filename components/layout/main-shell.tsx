"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { useAppStore } from "@/lib/store/app-store";

export function MainShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useAppStore();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  return (
    <div className="min-h-screen bg-muted/30">
      <TopNav />
      <div className="mx-auto flex max-w-screen-2xl">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-6xl space-y-4">{children}</div>
        </main>
      </div>
      <footer className="border-t bg-background py-4 text-center text-xs text-muted-foreground">
        Built for soccer creators • {pathname}
      </footer>
    </div>
  );
}

