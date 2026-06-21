import { useNodeState } from '@/hooks/use-node-state';
import { GitFork } from 'lucide-react';
import { NodeShell } from './node-shell';

export function RuleSwitchNode({ id, data, selected }: any) {
  const [categories] = useNodeState<string>(id, 'categories', 'Action, Junk, Business, SaaS, Receipts');
  const [status] = useNodeState<string>(id, 'status', 'IDLE');

  return (
    <NodeShell
      id={id}
      selected={selected}
      icon={<GitFork size={18} />}
      iconColor="text-orange-500"
      name={data?.name || 'Route by Category'}
      description="Route email to different paths"
      status={status}
    >
      <div className="px-3 pb-3 space-y-2">
        <div className="flex flex-wrap gap-1">
          {categories.split(',').map((cat: string) => (
            <span key={cat} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {cat.trim()}
            </span>
          ))}
        </div>
      </div>
    </NodeShell>
  );
}
