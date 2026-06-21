import { type Node, type NodeTypes } from '@xyflow/react';
import { AIClassifierNode } from './components/ai-classifier-node';
import { EmailActionNode } from './components/email-action-node';
import { EmailFilterNode } from './components/email-filter-node';
import { EmailSourceNode } from './components/email-source-node';
import { LlmAgentNode } from './components/llm-agent-node';
import { RuleSwitchNode } from './components/rule-switch-node';

export const initialNodes: Node[] = [];
export const initialEdges = [];

export const nodeTypes = {
  'email-source': EmailSourceNode,
  'email-filter': EmailFilterNode,
  'ai-classifier': AIClassifierNode,
  'rule-switch': RuleSwitchNode,
  'email-action': EmailActionNode,
  'llm-agent': LlmAgentNode,
} satisfies NodeTypes;
