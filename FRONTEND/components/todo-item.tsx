"use client";

import type React from "react";

import { useState } from "react";
import { Trash2, GripVertical, Calendar, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Todo } from "@/lib/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    updates: Partial<Omit<Todo, "id" | "createdAt">>
  ) => void;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        dueDate: editDueDate || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditDueDate(todo.dueDate || "");
    setIsEditing(false);
  };

  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  if (isEditing) {
    return (
      <Card className="p-4 space-y-3 border-2 border-primary">
        <Input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="text-base"
          autoFocus
        />
        <Textarea
          placeholder="Add a description (optional)"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="resize-none"
          rows={2}
        />
        <Input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
          className="w-full"
        />
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Check className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      draggable
      onDragStart={() => onDragStart(todo.id)}
      onDragOver={(e) => onDragOver(e, todo.id)}
      onDragEnd={onDragEnd}
      className={cn(
        "p-4 transition-all hover:shadow-md cursor-move group",
        isDragging && "opacity-50 scale-95",
        todo.completed && "bg-muted/50"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2 mt-1">
          <GripVertical className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="h-5 w-5"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <p
            className={cn(
              "text-base leading-relaxed break-words",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.title}
          </p>
          {todo.description && (
            <p
              className={cn(
                "text-sm text-muted-foreground leading-relaxed break-words",
                todo.completed && "line-through"
              )}
            >
              {todo.description}
            </p>
          )}
          {todo.dueDate && (
            <div className="flex items-center gap-3 text-sm">
              <div
                className={cn(
                  "flex items-center gap-1",
                  isOverdue
                    ? "text-destructive font-medium"
                    : "text-muted-foreground"
                )}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  {new Date(todo.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(todo.id)}
            className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

