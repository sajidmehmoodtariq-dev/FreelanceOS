import client from './client';

export const checkHealth = async () => {
  const response = await client.get('/health');
  return response.data;
};
