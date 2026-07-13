"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { CmdPalette } from "@/components/CmdPalette";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useHotkey } from "@/hooks/useHotkey";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = usePathname();

  useHotkey("mod+k", () => setPaletteOpen(true));

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenPalette={() => setPaletteOpen(true)} />
        <div
          key={pathname}
          className="flex-1 overflow-y-auto animate-fade-in-page"
        >
          {children}
        </div>
      </div>
      <CmdPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
