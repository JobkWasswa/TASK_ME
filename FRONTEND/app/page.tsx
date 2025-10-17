import { TodoApp } from "@/components/todo-app";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <TodoApp />
    </main>
  );
}
