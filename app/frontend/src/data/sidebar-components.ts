import { Cpu, Filter, GitFork, Inbox, InboxIcon, Send, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ComponentItem {
  name: string;
  icon: LucideIcon;
}

export interface ComponentGroup {
  name: string;
  icon: LucideIcon;
  iconColor: string;
  items: ComponentItem[];
}

export const getComponentGroups = async (): Promise<ComponentGroup[]> => [
  {
    name: "Sources",
    icon: Inbox,
    iconColor: "text-blue-500",
    items: [
      { name: "Outlook Inbox", icon: InboxIcon },
      { name: "Gmail Inbox", icon: InboxIcon },
    ],
  },
  {
    name: "Processors",
    icon: Filter,
    iconColor: "text-yellow-500",
    items: [
      { name: "Email Filter", icon: Filter },
      { name: "AI Classifier", icon: Sparkles },
    ],
  },
  {
    name: "Routing",
    icon: GitFork,
    iconColor: "text-orange-500",
    items: [
      { name: "Route by Category", icon: GitFork },
    ],
  },
  {
    name: "Actions",
    icon: Send,
    iconColor: "text-green-500",
    items: [
      { name: "Move to Folder", icon: Send },
      { name: "LLM Agent", icon: Cpu },
    ],
  },
];
