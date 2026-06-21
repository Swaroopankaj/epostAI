export interface MultiNodeDefinition {
  name: string;
  nodes: { componentName: string; offsetX: number; offsetY: number; }[];
  edges: { source: string; target: string; }[];
}

const multiNodeDefinitions: Record<string, MultiNodeDefinition> = {
  "Auto Categorize Emails": {
    name: "Auto Categorize Emails",
    nodes: [
      { componentName: "Outlook Inbox", offsetX: 0, offsetY: 0 },
      { componentName: "Email Filter", offsetX: 350, offsetY: 0 },
      { componentName: "AI Classifier", offsetX: 700, offsetY: 0 },
      { componentName: "Route by Category", offsetX: 1050, offsetY: 0 },
      { componentName: "Move to Folder", offsetX: 1400, offsetY: -120 },
    ],
    edges: [
      { source: "Outlook Inbox", target: "Email Filter" },
      { source: "Email Filter", target: "AI Classifier" },
      { source: "AI Classifier", target: "Route by Category" },
      { source: "Route by Category", target: "Move to Folder" },
    ],
  },
  "Inbox Zero": {
    name: "Inbox Zero",
    nodes: [
      { componentName: "Gmail Inbox", offsetX: 0, offsetY: 0 },
      { componentName: "AI Classifier", offsetX: 350, offsetY: 0 },
      { componentName: "Route by Category", offsetX: 700, offsetY: 0 },
      { componentName: "Move to Folder", offsetX: 1050, offsetY: -80 },
      { componentName: "LLM Agent", offsetX: 1050, offsetY: 80 },
    ],
    edges: [
      { source: "Gmail Inbox", target: "AI Classifier" },
      { source: "AI Classifier", target: "Route by Category" },
      { source: "Route by Category", target: "Move to Folder" },
      { source: "Route by Category", target: "LLM Agent" },
    ],
  },
  "Junk Email Cleanup": {
    name: "Junk Email Cleanup",
    nodes: [
      { componentName: "Outlook Inbox", offsetX: 0, offsetY: 0 },
      { componentName: "AI Classifier", offsetX: 350, offsetY: 0 },
      { componentName: "Route by Category", offsetX: 700, offsetY: 0 },
      { componentName: "Move to Folder", offsetX: 1050, offsetY: 0 },
    ],
    edges: [
      { source: "Outlook Inbox", target: "AI Classifier" },
      { source: "AI Classifier", target: "Route by Category" },
      { source: "Route by Category", target: "Move to Folder" },
    ],
  },
};

export async function getMultiNodeDefinition(name: string): Promise<MultiNodeDefinition | null> {
  return multiNodeDefinitions[name] || null;
}

export async function isMultiNodeComponent(componentName: string): Promise<boolean> {
  return componentName in multiNodeDefinitions;
}
