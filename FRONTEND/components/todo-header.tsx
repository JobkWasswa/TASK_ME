import { CheckSquare } from "lucide-react";

export function TodoHeader() {
  return (
    <div className="text-center space-y-3">
      <div className="flex items-center justify-center gap-3">
        <div className="rounded-2xl bg-primary p-3 shadow-lg shadow-primary/20">
          <CheckSquare className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-balance">
          TASK MI
        </h1>
      </div>
      <p className="text-lg text-muted-foreground text-pretty">
        Schedule your activities, get them done!
      </p>
    </div>
  );
}
