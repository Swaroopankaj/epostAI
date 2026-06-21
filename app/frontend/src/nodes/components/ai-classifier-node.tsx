import { useNodeState } from '@/hooks/use-node-state';
import { Sparkles } from 'lucide-react';
import { NodeShell } from './node-shell';

export function AIClassifierNode({ id, data, selected }: any) {
  const [categories] = useNodeState<string>(id, 'categories', 'Action, Junk, Business, SaaS, Receipts');
  const [status] = useNodeState<string>(id, 'status', 'IDLE');

  return (
    <NodeShell
      id={id}
      selected={selected}
      icon={<Sparkles size={18} />}
      iconColor="text-purple-500"
      name={data?.name || 'AI Classifier'}
      description="Categorize email with AI"
      status={status}
    >
      <div className="px-3 pb-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles size={12} />
          <span>Categories: {categories}</span>
        </div>
      </div>
    </NodeShell>
  );
}
