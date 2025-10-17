"use client";

import type React from "react";

import { useState } from "react";
import { TodoItem } from "./todo-item";
import type { Todo } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    updates: Partial<Omit<Todo, "id" | "createdAt">>
  ) => void;
  onReorder: (todos: Todo[]) => void;
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onUpdate,
  onReorder,
}: TodoListProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = todos.findIndex((t) => t.id === draggedId);
    const targetIndex = todos.findIndex((t) => t.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newTodos = [...todos];
    const [removed] = newTodos.splice(draggedIndex, 1);
    newTodos.splice(targetIndex, 0, removed);

    onReorder(newTodos);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  if (todos.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground text-lg">
          No tasks yet. Add one above to get started!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          isDragging={draggedId === todo.id}
        />
      ))}
    </div>
  );
}
