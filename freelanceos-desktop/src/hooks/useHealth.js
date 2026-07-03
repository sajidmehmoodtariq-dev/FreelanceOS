import { useQuery } from '@tanstack/react-query';
import { checkHealth } from '../api/health';
import useAppStore from '../store/useAppStore';
import { useEffect } from 'react';

export const useHealth = () => {
  const setConnected = useAppStore((state) => state.setConnected);

  const query = useQuery({
    queryKey: ['health'],
    queryFn: checkHealth,
    refetchInterval: 10000, // ping every 10 seconds
    retry: false, // do not retry on failure so we can set offline status quickly
  });

  useEffect(() => {
    if (query.isSuccess) {
      setConnected(true);
    } else if (query.isError) {
      setConnected(false);
    }
  }, [query.isSuccess, query.isError, setConnected]);

  return query;
};
