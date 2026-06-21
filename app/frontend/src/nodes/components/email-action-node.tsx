import { useNodeState } from '@/hooks/use-node-state';
import { Send } from 'lucide-react';
import { NodeShell } from './node-shell';

export function EmailActionNode({ id, data, selected }: any) {
  const [actionType] = useNodeState<string>(id, 'actionType', 'move');
  const [targetFolder] = useNodeState<string>(id, 'targetFolder', '');
  const [status] = useNodeState<string>(id, 'status', 'IDLE');

  const actionLabels: Record<string, string> = {
    move: 'Move to folder',
    categorize: 'Apply category',
    reply: 'Send auto-reply',
    forward: 'Forward email',
  };

  return (
    <NodeShell
      id={id}
      selected={selected}
      icon={<Send size={18} />}
      iconColor="text-green-500"
      name={data?.name || 'Email Action'}
      description={actionLabels[actionType] || 'Perform action'}
      status={status}
    >
      <div className="px-3 pb-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Send size={12} />
          <span>{actionLabels[actionType]}{targetFolder ? ` → ${targetFolder}` : ''}</span>
        </div>
      </div>
    </NodeShell>
  );
}
