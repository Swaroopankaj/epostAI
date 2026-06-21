import type { Node } from '@xyflow/react';

export interface NodeConfig {
  nodeType: string;
  taskType: string;
  name: string;
  description?: string;
  provider?: string;
  filterType?: string;
  categories?: string;
  actionType?: string;
}

const generateId = () => Math.random().toString(36).substring(2, 8);

const taskNodeConfigs: Record<string, NodeConfig> = {
  "Outlook Inbox":   { nodeType: 'email-source',  taskType: 'outlook',     name: 'Outlook Inbox',   provider: 'outlook' },
  "Gmail Inbox":     { nodeType: 'email-source',  taskType: 'gmail',       name: 'Gmail Inbox',     provider: 'gmail' },
  "Email Filter":    { nodeType: 'email-filter',  taskType: 'email-filter', name: 'Email Filter',    filterType: 'unread' },
  "AI Classifier":   { nodeType: 'ai-classifier', taskType: 'ai-classifier', name: 'AI Classifier',   categories: 'Action, Junk, Business, SaaS, Receipts' },
  "Route by Category": { nodeType: 'rule-switch', taskType: 'rule-switch', name: 'Route by Category', categories: 'Action, Junk, Business, SaaS, Receipts' },
  "Move to Folder":  { nodeType: 'email-action', taskType: 'email-action', name: 'Move to Folder',   actionType: 'move' },
  "LLM Agent":       { nodeType: 'llm-agent',    taskType: 'llmagent',    name: 'LLM Agent' },
};

export async function getNodeTypeDefinition(componentName: string) {
  const cfg = taskNodeConfigs[componentName];
  if (!cfg) throw new Error(`Unknown component: ${componentName}`);

  const nodeId = `${cfg.nodeType}_${generateId()}`;

  const createNode = (position: { x: number; y: number }): Node => ({
    id: nodeId,
    type: cfg.nodeType,
    position,
    data: {
      name: cfg.name,
      description: cfg.description || '',
      status: 'IDLE',
      taskType: cfg.taskType,
      provider: cfg.provider,
      filterType: cfg.filterType,
      categories: cfg.categories,
      actionType: cfg.actionType,
    },
  });

  return { createNode, nodeCfg: cfg, nodeId };
}
