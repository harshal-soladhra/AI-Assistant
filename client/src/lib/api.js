export const API_BASE_URL = 'http://localhost:3000/api';
const API_URL = API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  auth: {
    register: async (email, password) => {
      const resp = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      return resp.json();
    },
    login: async (email, password) => {
      const resp = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      return resp.json();
    },
    getMe: async () => {
      const resp = await fetch(`${API_URL}/auth/me`, {
        headers: getHeaders()
      });
      return resp.json();
    }
  },
  conversations: {
    list: async () => {
      const resp = await fetch(`${API_URL}/conversations`, {
        headers: getHeaders()
      });
      return resp.json();
    },
    create: async (title) => {
      const resp = await fetch(`${API_URL}/conversations`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ title })
      });
      return resp.json();
    },
    delete: async (id) => {
      const resp = await fetch(`${API_URL}/conversations/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return resp.json();
    },
    update: async (id, title) => {
      const resp = await fetch(`${API_URL}/conversations/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ title })
      });
      return resp.json();
    }
  },
  messages: {
    list: async (conversationId) => {
      const resp = await fetch(`${API_URL}/messages/${conversationId}`, {
        headers: getHeaders()
      });
      return resp.json();
    },
    send: async (conversation_id, role, content) => {
      const resp = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ conversation_id, role, content })
      });
      return resp.json();
    }
  }
};
