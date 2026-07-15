"use client";

import { Moon, PanelLeftClose, PanelLeftOpen, Star, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/LanguageProvider";
import { useLingui } from "@lingui/react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { incrementUsage, topFavorites, type ToolUsage } from "@/lib/favorites";
import { GITHUB_REPO_URL } from "@/lib/site";
import { toolGroups, tools, type Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LanguageToggle({ collapsed }: { collapsed: boolean }) {
  const { locale, setLanguage } = useLanguage();
  const { i18n } = useLingui();

  if (collapsed) {
    return (
      <div className="relative flex flex-col gap-1.5 rounded-full bg-muted/60 dark:bg-zinc-900/60 p-1 w-[34px] h-[60px] items-center self-center border border-zinc-200/50 dark:border-zinc-800/50">
        <div
          className={cn(
            "absolute left-1 w-[26px] h-[26px] rounded-full bg-white dark:bg-white shadow-xs transition-all duration-150 ease-in-out",
            locale === "tr" ? "top-1" : "top-[33px]",
          )}
        />
        <button
          type="button"
          onClick={() => setLanguage("tr")}
          aria-label={i18n._("sidebar.switch_tr")}
          title="Türkçe"
          className={cn(
            "relative z-10 flex size-[26px] items-center justify-center rounded-full transition-colors duration-150 cursor-pointer text-[10px] font-black",
            locale === "tr"
              ? "text-zinc-950"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          TR
        </button>
        <button
          type="button"
          onClick={() => setLanguage("en")}
          aria-label={i18n._("sidebar.switch_en")}
          title="English"
          className={cn(
            "relative z-10 flex size-[26px] items-center justify-center rounded-full transition-colors duration-150 cursor-pointer text-[10px] font-black",
            locale === "en"
              ? "text-zinc-950"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-9 w-full items-center rounded-full bg-muted/60 dark:bg-zinc-900/60 p-1 border border-zinc-200/50 dark:border-zinc-800/50">
      <div
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white dark:bg-white shadow-xs transition-all duration-150 ease-in-out",
          locale === "tr" ? "left-1" : "left-[calc(50%+2px)]",
        )}
      />
      <button
        type="button"
        onClick={() => setLanguage("tr")}
        aria-label={i18n._("sidebar.switch_tr")}
        className={cn(
          "relative z-10 flex flex-1 h-full items-center justify-center rounded-full transition-colors duration-150 cursor-pointer text-[11px] font-bold",
          locale === "tr"
            ? "text-zinc-950"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-label={i18n._("sidebar.switch_en")}
        className={cn(
          "relative z-10 flex flex-1 h-full items-center justify-center rounded-full transition-colors duration-150 cursor-pointer text-[11px] font-bold",
          locale === "en"
            ? "text-zinc-950"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        EN
      </button>
    </div>
  );
}

function NavLink({
  tool,
  isActive,
  collapsed,
}: {
  tool: Tool;
  isActive: boolean;
  collapsed: boolean;
}) {
  const { i18n } = useLingui();
  const toolId = tool.href.replace("/", "");
  const label = i18n._(`tool.${toolId}.label` as any) || tool.label;

  return (
    <Link
      href={tool.href}
      className={cn(
        "mb-0.5 flex cursor-pointer items-center transition-all duration-150 rounded-lg",
        collapsed
          ? "justify-center size-[38px] mx-auto"
          : "gap-2.5 px-2.5 py-2 text-[13.5px] font-semibold",
        isActive
          ? "bg-accent font-bold text-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/60",
      )}
    >
      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-accent-foreground">
        {tool.badge}
      </span>
      <span className={cn("truncate whitespace-nowrap", collapsed && "hidden")}>
        {label}
      </span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useLocalStorage("sidebar-collapsed", false);
  const [usage, setUsage] = useLocalStorage<ToolUsage>(
    "fnstack-tool-usage",
    {},
  );
  const { i18n } = useLingui();

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

  const getGroupTitle = (originalTitle: string) => {
    if (originalTitle === "JSON & VERİ") return i18n._("group.json_data");
    if (originalTitle === "METİN & GÜVENLİK")
      return i18n._("group.text_security");
    if (originalTitle === "ÜRETİCİLER") return i18n._("group.generators");
    return originalTitle;
  };

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-150 ease-in-out",
        collapsed ? "w-[72px]" : "w-[240px]",
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-4.5 py-5">
        {collapsed ? (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            aria-label={i18n._("sidebar.expand")}
            className="mx-auto flex size-[30px] shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-all duration-150"
          >
            <PanelLeftOpen className="size-[17px]" strokeWidth={2} />
          </button>
        ) : (
          <>
            <div className="flex size-[30px] shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-xs">
              <svg viewBox="0 0 24 24" className="size-[18px] text-white">
                <path
                  d="M6.5 5L2 12L6.5 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polygon
                  points="14 2 8.5 13 12.5 13 11 22 16.5 11 12.5 11 14 2"
                  fill="currentColor"
                />
                <path
                  d="M17.5 5L22 12L17.5 19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="flex-1 whitespace-nowrap text-[17px] font-extrabold tracking-tight">
              FnStack
            </span>
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label={i18n._("sidebar.collapse")}
              className="flex size-[26px] shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-all duration-150"
            >
              <PanelLeftClose className="size-[17px]" strokeWidth={2} />
            </button>
          </>
        )}
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
              {i18n._("sidebar.favorites")}
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
              {getGroupTitle(group.title)}
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

      <div
        className={cn(
          "flex flex-col border-t border-sidebar-border p-3",
          collapsed ? "gap-3" : "gap-3.5",
        )}
      >
        {collapsed ? (
          <>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={i18n._("sidebar.github_star")}
              className="mx-auto flex size-[34px] shrink-0 items-center justify-center rounded-xl bg-muted/60 hover:bg-muted dark:bg-zinc-900/60 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800/50 text-muted-foreground hover:text-foreground transition-all duration-150 shadow-xs relative"
            >
              <GithubIcon className="size-[16px]" />
              <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-black shadow-xs">
                ★
              </span>
            </a>

            <LanguageToggle collapsed={true} />

            <div className="relative flex flex-col gap-1.5 rounded-full bg-muted/60 dark:bg-zinc-900/60 p-1 w-[34px] h-[60px] items-center self-center border border-zinc-200/50 dark:border-zinc-800/50">
              <div
                className={cn(
                  "absolute left-1 w-[26px] h-[26px] rounded-full bg-white dark:bg-white shadow-xs transition-all duration-150 ease-in-out",
                  !isDark ? "top-1" : "top-[33px]",
                )}
              />
              <button
                type="button"
                onClick={() => setTheme("light")}
                aria-label={i18n._("sidebar.switch_light")}
                className={cn(
                  "relative z-10 flex size-[26px] items-center justify-center rounded-full transition-colors duration-150 cursor-pointer",
                  !isDark
                    ? "text-zinc-950"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Sun
                  className={cn("size-[14px]", !isDark && "text-amber-500")}
                  strokeWidth={2.5}
                />
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                aria-label={i18n._("sidebar.switch_dark")}
                className={cn(
                  "relative z-10 flex size-[26px] items-center justify-center rounded-full transition-colors duration-150 cursor-pointer",
                  isDark
                    ? "text-zinc-950"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Moon
                  className={cn("size-[14px]", isDark && "text-blue-500")}
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 rounded-xl bg-linear-to-b from-zinc-50 to-zinc-100/50 dark:from-zinc-900/30 dark:to-zinc-950/20 border border-zinc-200/60 dark:border-zinc-800/60 p-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="flex size-[20px] items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-800 text-white dark:text-zinc-200">
                  <GithubIcon className="size-[12px]" />
                </span>
                <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                  {i18n._("sidebar.open_source")}
                </span>
              </div>
              <div className="text-[12.5px] font-bold text-foreground leading-tight">
                {i18n._("sidebar.support_title")}
              </div>
              <p className="text-[11px] text-muted-foreground leading-normal">
                {i18n._("sidebar.support_desc")}
              </p>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white dark:text-zinc-100 text-xs font-semibold shadow-xs transition-colors"
              >
                <Star
                  className="size-[12px] fill-amber-400 text-amber-400"
                  strokeWidth={2}
                />
                <span>{i18n._("sidebar.github_star")}</span>
              </a>
            </div>

            <LanguageToggle collapsed={false} />

            <div className="relative flex h-9 w-full items-center rounded-full bg-muted/60 dark:bg-zinc-900/60 p-1 border border-zinc-200/50 dark:border-zinc-800/50">
              <div
                className={cn(
                  "absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-white dark:bg-white shadow-xs transition-all duration-150 ease-in-out",
                  !isDark ? "left-1" : "left-[calc(50%+2px)]",
                )}
              />
              <button
                type="button"
                onClick={() => setTheme("light")}
                aria-label={i18n._("sidebar.switch_light")}
                className={cn(
                  "relative z-10 flex h-full w-1/2 items-center justify-center rounded-full transition-colors duration-150 cursor-pointer",
                  !isDark
                    ? "text-zinc-950"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Sun
                  className={cn("size-[14px]", !isDark && "text-amber-500")}
                  strokeWidth={2.5}
                />
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                aria-label={i18n._("sidebar.switch_dark")}
                className={cn(
                  "relative z-10 flex h-full w-1/2 items-center justify-center rounded-full transition-colors duration-150 cursor-pointer",
                  isDark
                    ? "text-zinc-950"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Moon
                  className={cn("size-[14px]", isDark && "text-blue-500")}
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
