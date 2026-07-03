import client from './client';

export const dropdownOptionsApi = {
  getByCategory: async (category) => {
    const { data } = await client.get('/dropdown-options', { params: { category } });
    return data;
  },
  create: async (optionData) => {
    const { data } = await client.post('/dropdown-options', optionData);
    return data;
  },
  update: async (id, optionData) => {
    const { data } = await client.put(`/dropdown-options/${id}`, optionData);
    return data;
  },
  delete: async (id) => {
    const { data } = await client.delete(`/dropdown-options/${id}`);
    return data;
  },
  reorder: async (updates) => {
    const { data } = await client.post('/dropdown-options/reorder', updates);
    return data;
  }
};
