import client from './client';

export const organizationsApi = {
  getAll: async (params) => {
    const { data } = await client.get('/organizations', { params });
    return data;
  },
  getOne: async (id) => {
    const { data } = await client.get(`/organizations/${id}`);
    return data;
  },
  getSummary: async (id) => {
    const { data } = await client.get(`/organizations/${id}/summary`);
    return data;
  },
  create: async (orgData) => {
    const { data } = await client.post('/organizations', orgData);
    return data;
  },
  update: async (id, orgData) => {
    const { data } = await client.put(`/organizations/${id}`, orgData);
    return data;
  },
  delete: async (id) => {
    const { data } = await client.delete(`/organizations/${id}`);
    return data;
  }
};
