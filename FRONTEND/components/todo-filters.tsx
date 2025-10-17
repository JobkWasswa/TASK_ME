"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TodoFilter } from "@/lib/types";
import { cn } from "@/lib/utils";

interface TodoFiltersProps {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export function TodoFilters({
  currentFilter,
  onFilterChange,
  onClearCompleted,
  hasCompleted,
}: TodoFiltersProps) {
  const filters: { value: TodoFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <Card className="p-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex gap-1 w-full sm:w-auto">
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={currentFilter === filter.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter.value)}
              className={cn(
                "flex-1 sm:flex-none",
                currentFilter === filter.value && "shadow-sm"
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        {hasCompleted && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearCompleted}
            className="w-full sm:w-auto bg-transparent"
          >
            Clear Completed
          </Button>
        )}
      </div>
    </Card>
  );
}
