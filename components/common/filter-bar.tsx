"use client";

import { Button } from "@/components/ui/button";

type Option = { label: string; value: string };

type Props = {
  options: Option[];
  active: string | null;
  onChange: (value: string | null) => void;
};

export function FilterBar({ options, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        variant={active === null ? "default" : "secondary"}
        onClick={() => onChange(null)}
      >
        All
      </Button>
      {options.map((opt) => (
        <Button
          key={opt.value}
          size="sm"
          variant={active === opt.value ? "default" : "secondary"}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}

