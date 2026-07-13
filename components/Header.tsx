"use client";

interface HeaderProps {
  onOpenPalette: () => void;
}

export function Header({ onOpenPalette }: HeaderProps) {
  return (
    <header className="flex h-[60px] shrink-0 items-center border-b border-border px-5">
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
    </header>
  );
}
