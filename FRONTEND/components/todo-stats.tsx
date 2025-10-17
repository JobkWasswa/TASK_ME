import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, ListTodo } from "lucide-react";

interface TodoStatsProps {
  total: number;
  active: number;
  completed: number;
}

export function TodoStats({ total, active, completed }: TodoStatsProps) {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ListTodo className="h-4 w-4" />
          <span className="text-sm font-medium">Total Tasks</span>
        </div>
        <p className="text-3xl font-bold">{total}</p>
      </Card>
      <Card className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Circle className="h-4 w-4" />
          <span className="text-sm font-medium">Active</span>
        </div>
        <p className="text-3xl font-bold text-primary">{active}</p>
      </Card>
      <Card className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-sm font-medium">Completed</span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-accent">{completed}</p>
          <span className="text-sm text-muted-foreground">
            ({completionRate}%)
          </span>
        </div>
      </Card>
    </div>
  );
}
