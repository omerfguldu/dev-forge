"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { incrementUsage, topFavorites, type ToolUsage } from "@/lib/favorites";
import { toolGroups, tools, type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

function NavLink({
  tool,
  isActive,
  collapsed,
}: {
  tool: Tool;
  isActive: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={tool.href}
      className={cn(
        "mb-0.5 flex items-center gap-2.5 rounded-lg px-2 py-2.5 text-[13.5px] font-semibold transition-colors",
        isActive
          ? "bg-accent font-bold text-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/60",
      )}
    >
      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-accent-foreground">
        {tool.badge}
      </span>
      <span className={cn("truncate whitespace-nowrap", collapsed && "hidden")}>
        {tool.label}
      </span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useLocalStorage("sidebar-collapsed", false);
  const [usage, setUsage] = useLocalStorage<ToolUsage>(
    "devforge-tool-usage",
    {},
  );

  useEffect(() => {
    if (tools.some((tool) => tool.href === pathname)) {
      setUsage((previous) => incrementUsage(previous, pathname));
    }
  }, [pathname, setUsage]);

  // Server render and the pre-hydration client render can't know the
  // persisted theme yet, so both assume the app's `defaultTheme` ("dark")
  // until mounted — matching output avoids a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const favorites = topFavorites(usage, tools, 3);

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-in-out",
        collapsed ? "w-[72px]" : "w-[240px]",
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-4.5 py-5">
        <div className="flex size-[30px] shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground">
          D
        </div>
        <span
          className={cn(
            "whitespace-nowrap text-[17px] font-extrabold tracking-tight",
            collapsed && "hidden",
          )}
        >
          DevForge
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {favorites.length > 0 && (
          <div className="mb-4.5">
            <div
              className={cn(
                "px-2 pb-2 text-[11px] font-bold tracking-wider text-muted-foreground",
                collapsed && "hidden",
              )}
            >
              SIK KULLANILANLAR
            </div>
            {favorites.map((tool) => (
              <NavLink
                key={tool.href}
                tool={tool}
                isActive={pathname === tool.href}
                collapsed={collapsed}
              />
            ))}
          </div>
        )}

        {toolGroups.map((group) => (
          <div key={group.title} className="mb-4.5 last:mb-0">
            <div
              className={cn(
                "px-2 pb-2 text-[11px] font-bold tracking-wider text-muted-foreground",
                collapsed && "hidden",
              )}
            >
              {group.title}
            </div>
            {group.items.map((tool) => (
              <NavLink
                key={tool.href}
                tool={tool}
                isActive={pathname === tool.href}
                collapsed={collapsed}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-1.5 border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={isDark ? "Aydınlık temaya geç" : "Karanlık temaya geç"}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-muted-foreground hover:bg-sidebar-accent/60"
        >
          <span className="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-muted text-xs">
            {isDark ? "🌙" : "☀️"}
          </span>
          <span
            className={cn(
              "whitespace-nowrap text-[13px] font-semibold",
              collapsed && "hidden",
            )}
          >
            {isDark ? "Karanlık" : "Aydınlık"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={
            collapsed ? "Kenar çubuğunu genişlet" : "Kenar çubuğunu daralt"
          }
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-muted-foreground hover:bg-sidebar-accent/60"
        >
          <span className="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-muted text-xs">
            {collapsed ? "→" : "←"}
          </span>
          <span
            className={cn(
              "whitespace-nowrap text-[13px] font-semibold",
              collapsed && "hidden",
            )}
          >
            Daralt
          </span>
        </button>
      </div>
    </aside>
  );
}
