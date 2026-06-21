const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  categorizeEmail: async (subject: string, body: string, categories: string[]) => {
    const res = await fetch(`${API_BASE_URL}/api/categorize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, body, categories }),
    });
    return res.json();
  },

  processEmail: async (emailId: string, action: string, folder?: string) => {
    const res = await fetch(`${API_BASE_URL}/api/process-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_id: emailId, action, folder }),
    });
    return res.json();
  },

  fetchEmails: async (provider: string, folder?: string) => {
    const params = new URLSearchParams({ provider, ...(folder && { folder }) });
    const res = await fetch(`${API_BASE_URL}/api/emails?${params}`);
    return res.json();
  },
};
