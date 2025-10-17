"use client";

import { useState, useEffect, useCallback } from "react";
import { TodoList } from "./todo-list";
import { TodoStats } from "./todo-stats";
import type { Todo, TodoFilter } from "@/lib/types";
import { TodoInput } from "./todo-input";
import { TodoHeader } from "./todo-header";
import { TodoFilters } from "./todo-filters";

const baseUrl = process.env.API_BASE_URL;


async function fetchApi(url: string, method: string, data?: any): Promise<any> {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (method === "DELETE" && response.status === 204) {
    return null; // Successful deletion 
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API call failed (${response.status}): ${errorText}`);
  }

  // successful creation
  if (method === "GET" || method === "POST" || method === "PATCH") {
    return response.json();
  }
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  const loadTodos = useCallback(async () => {
    try {
      const data: Todo[] = await fetchApi(`${baseUrl}/api/todos`, "GET");
      setTodos(data);
    } catch (error) {
      console.error("Failed to load todos from API:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async (
    title: string,
    description?: string,
    dueDate?: string
  ) => {
    const newTodoData = {
      title,
      description: description || null,
      completed: false,
      dueDate: dueDate || null,
    };

    try {
      const newTodo: Todo = await fetchApi(
        `${baseUrl}/api/todos`,
        "POST",
        newTodoData
      );

      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const updateTodo = async (
    id: string,
    updates: Partial<Omit<Todo, "id" | "createdAt">>
  ) => {
    const todoUrl = `${baseUrl}${id}/`;

    try {
      const updatedTodo: Todo = await fetchApi(todoUrl, "PATCH", updates);

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const toggleTodo = (id: string) => {
    const todoToToggle = todos.find((t) => t.id === id);
    if (todoToToggle) {
      updateTodo(id, { completed: !todoToToggle.completed });
    }
  };

  const deleteTodo = async (id: string) => {
    const todoUrl = `${baseUrl}${id}/`;

    try {
      await fetchApi(todoUrl, "DELETE");

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const clearCompleted = async () => {
    const clearCompletedUrl = `${baseUrl}clear_completed/`;

    try {
      await fetchApi(clearCompletedUrl, "DELETE");

      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    } catch (error) {
      console.error("Failed to clear completed tasks:", error);
    }
  };

  
  const reorderTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <TodoHeader />
      <div className="mt-8 space-y-6">
        <TodoInput onAdd={addTodo} />
        <TodoStats
          total={todos.length}
          active={todos.filter((t) => !t.completed).length}
          completed={todos.filter((t) => t.completed).length}
        />
        <TodoFilters
          currentFilter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          hasCompleted={todos.some((t) => t.completed)}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          onReorder={reorderTodos}
        />
      </div>
    </div>
  );
}
