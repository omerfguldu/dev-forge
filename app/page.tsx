"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import { useLingui } from "@lingui/react";

export default function Home() {
  const { i18n } = useLingui();

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <h1 className="text-2xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
          {i18n._("home.title")}
        </h1>
        <p className="mt-2 text-muted-foreground md:text-base lg:text-lg">
          {i18n._("home.subtitle")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => {
            const toolId = tool.href.replace("/", "");
            const label = i18n._(`tool.${toolId}.label` as any) || tool.label;
            const description =
              i18n._(`tool.${toolId}.desc` as any) || tool.description;

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-none transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:bg-accent hover:shadow-md hover:shadow-primary/5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
                  {tool.badge}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs text-muted-foreground">
                    {description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
