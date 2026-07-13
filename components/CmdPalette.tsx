"use client";

import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { tools } from "@/lib/tools";

interface CmdPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CmdPalette({ open, onOpenChange }: CmdPaletteProps) {
  const router = useRouter();

  function goTo(href: string) {
    router.push(href);
    onOpenChange(false);
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Komut Paleti"
      description="Bir araç aramak için yazın"
    >
      <Command>
        <CommandInput placeholder="Bir araç yazın..." />
        <CommandList>
          <CommandEmpty>Sonuç bulunamadı.</CommandEmpty>
          <CommandGroup>
            {tools.map((tool) => (
              <CommandItem
                key={tool.href}
                value={tool.label}
                onSelect={() => goTo(tool.href)}
              >
                <span className="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-accent-foreground">
                  {tool.badge}
                </span>
                <span className="text-[13.5px] font-semibold">
                  {tool.label}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
