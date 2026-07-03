import React from 'react';
import { useHealth } from '../hooks/useHealth';
import MainLayout from '../components/layout/MainLayout';
import useAppStore from '../store/useAppStore';

const Dashboard = () => {
  const { data, isLoading } = useHealth();
  const isConnected = useAppStore((state) => state.isConnected);

  return (
    <MainLayout title="Dashboard">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 tracking-tight">FreelanceOS</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-lg font-medium mb-2 text-gray-200">Connection Status</h2>
            <div className="flex items-center gap-3">
              <span className={`flex w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span className="font-mono text-sm text-gray-400">
                {isConnected ? 'Connected to Backend' : 'Disconnected from Backend'}
              </span>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-lg font-medium mb-2 text-gray-200">Database Status</h2>
            {isLoading ? (
              <span className="text-sm text-gray-400">Checking...</span>
            ) : (
              <div className="flex flex-col gap-1 text-sm text-gray-400">
                <div>Status: <span className="font-mono text-white">{data?.data?.database || 'N/A'}</span></div>
                <div>Server Time: <span className="font-mono text-white">{data?.data?.timestamp ? new Date(data.data.timestamp).toLocaleTimeString() : 'N/A'}</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
