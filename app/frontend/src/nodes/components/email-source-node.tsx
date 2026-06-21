import { useNodeState } from '@/hooks/use-node-state';
import { Inbox } from 'lucide-react';
import { NodeShell } from './node-shell';

export function EmailSourceNode({ id, data, selected }: any) {
  const [provider] = useNodeState<string>(id, 'provider', 'outlook');
  const [status] = useNodeState<string>(id, 'status', 'IDLE');

  return (
    <NodeShell
      id={id}
      selected={selected}
      icon={<Inbox size={18} />}
      iconColor="text-blue-500"
      name={data?.name || 'Email Source'}
      description={provider === 'outlook' ? 'Microsoft Outlook Inbox' : 'Gmail Inbox'}
      status={status}
    >
      <div className="px-3 pb-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Inbox size={12} />
          <span>{provider === 'outlook' ? 'Outlook' : 'Gmail'}</span>
        </div>
      </div>
    </NodeShell>
  );
}
