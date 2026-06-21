import type { BuiltInNode, Node } from '@xyflow/react';

export type AppNode = BuiltInNode;

export type EmailSourceNode = Node<{
  name: string;
  description: string;
  status: string;
  taskType: 'outlook' | 'gmail';
  provider?: string;
  folder?: string;
}>;

export type EmailFilterNode = Node<{
  name: string;
  description: string;
  status: string;
  taskType: 'email-filter';
  filterType?: 'unread' | 'flagged' | 'sender' | 'subject';
  filterValue?: string;
}>;

export type AIClassifierNode = Node<{
  name: string;
  description: string;
  status: string;
  taskType: 'ai-classifier';
  categories?: string;
}>;

export type RuleSwitchNode = Node<{
  name: string;
  description: string;
  status: string;
  taskType: 'rule-switch';
  categories?: string;
}>;

export type EmailActionNode = Node<{
  name: string;
  description: string;
  status: string;
  taskType: 'email-action';
  actionType?: 'move' | 'categorize' | 'reply' | 'forward';
  targetFolder?: string;
}>;

export type LlmAgentNode = Node<{
  name: string;
  description: string;
  status: string;
  taskType: 'llmagent';
}>;

export type EpostNodeTypes = EmailSourceNode | EmailFilterNode | AIClassifierNode | RuleSwitchNode | EmailActionNode | LlmAgentNode;
