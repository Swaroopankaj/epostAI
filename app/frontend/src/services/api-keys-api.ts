const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiKeysService = {
  getAllApiKeys: async () => {
    const res = await fetch(`${API_BASE_URL}/api/keys`);
    return res.json();
  },
  getApiKey: async (provider: string) => {
    const res = await fetch(`${API_BASE_URL}/api/keys/${provider}`);
    return res.json();
  },
  createOrUpdateApiKey: async (data: { provider: string; key_value: string; is_active: boolean }) => {
    const res = await fetch(`${API_BASE_URL}/api/keys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteApiKey: async (provider: string) => {
    const res = await fetch(`${API_BASE_URL}/api/keys/${provider}`, { method: 'DELETE' });
    return res.json();
  },
};
