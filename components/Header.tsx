"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useHistory } from "@/hooks/useHistory";
import { formatRelativeTime } from "@/lib/history";

interface HeaderProps {
  onOpenPalette: () => void;
}

export function Header({ onOpenPalette }: HeaderProps) {
  const { history } = useHistory();

  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-border px-5">
      <button
        type="button"
        onClick={onOpenPalette}
        className="flex w-[340px] max-w-[44vw] items-center gap-2.5 rounded-[9px] border border-border bg-muted px-3 py-2 text-left text-muted-foreground hover:bg-muted/70"
      >
        <span className="text-sm">⌕</span>
        <span className="flex-1 text-[13.5px]">Araç ara...</span>
        <span className="rounded-[5px] border border-border bg-card px-1.5 py-0.5 text-[11px] font-bold">
          ⌘K
        </span>
      </button>

      <Popover>
        <PopoverTrigger className="flex items-center gap-2 rounded-[9px] border border-border px-3.5 py-2 text-[13.5px] font-semibold text-muted-foreground hover:bg-muted">
          <span>🕐</span>
          <span>Geçmiş</span>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-[340px] max-h-[420px] gap-0 overflow-y-auto rounded-xl bg-card p-0 shadow-[0_20px_40px_rgba(0,0,0,0.16)]"
        >
          <div className="border-b border-border px-3.5 py-3 text-xs font-bold text-muted-foreground">
            SON 10 İŞLEM
          </div>
          {history.length === 0 ? (
            <div className="px-3.5 py-6 text-center text-[13px] text-muted-foreground">
              Henüz işlem yok.
            </div>
          ) : (
            history.map((entry, index) => (
              <div
                // History entries have no stable id (same tool/snippet can
                // repeat) and the whole list is replaced wholesale on every
                // update — an index key is safe here.
                // oxlint-disable-next-line react/no-array-index-key
                key={index}
                className="border-b border-border px-3.5 py-2.5 last:border-b-0 hover:bg-muted"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12.5px] font-bold text-primary">
                    {entry.tool}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {formatRelativeTime(entry.timestamp)}
                  </span>
                </div>
                <div className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                  {entry.snippet}
                </div>
              </div>
            ))
          )}
        </PopoverContent>
      </Popover>
    </header>
  );
}
