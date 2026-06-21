import { useNodeState } from '@/hooks/use-node-state';
import { Filter } from 'lucide-react';
import { NodeShell } from './node-shell';

export function EmailFilterNode({ id, data, selected }: any) {
  const [filterType] = useNodeState<string>(id, 'filterType', 'unread');
  const [status] = useNodeState<string>(id, 'status', 'IDLE');

  const filterLabels: Record<string, string> = {
    unread: 'Only unread emails',
    flagged: 'Only flagged emails',
    sender: 'By sender',
    subject: 'By subject keyword',
  };

  return (
    <NodeShell
      id={id}
      selected={selected}
      icon={<Filter size={18} />}
      iconColor="text-yellow-500"
      name={data?.name || 'Email Filter'}
      description={filterLabels[filterType] || 'Filter emails'}
      status={status}
    >
      <div className="px-3 pb-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Filter size={12} />
          <span>{filterLabels[filterType]}</span>
        </div>
      </div>
    </NodeShell>
  );
}
