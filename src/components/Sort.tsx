"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SortType = "popular" | "price" | "alphabet";

interface SortOption {
  type: SortType;
  label: string;
}

const sortOptions: SortOption[] = [
  { type: "popular", label: "популярности" },
  { type: "price", label: "цене" },
  { type: "alphabet", label: "алфавиту" },
];

interface SortProps {
  activeSortType: SortType;
  onSelectSort: (type: SortType) => void;
}

export function Sort({ activeSortType, onSelectSort }: SortProps) {
  const activeOptinon = sortOptions.find(
    (option) => option.type === activeSortType,
  );

  const triggerClasses = "flex items-center gap-2 text-gray-600 outline-none";

  const underlineClasses =
    "border-b border-dashed border-gray-400 text-gray-800";

  return (
    <div className="flex items-center gap-2">
      <span>Сортировка по:</span>

      <DropdownMenu>
        <DropdownMenuTrigger className={triggerClasses}>
          <span className={underlineClasses}>{activeOptinon?.label}</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.type}
              onClick={() => onSelectSort(option.type)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
