import React from 'react';
import { Minus, Square, X } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import clsx from 'clsx';

const TopBar = ({ title = 'FreelanceOS' }) => {
  const isConnected = useAppStore((state) => state.isConnected);

  const handleMinimize = () => {
    if (window.electronAPI) window.electronAPI.minimize();
  };

  const handleMaximize = () => {
    if (window.electronAPI) window.electronAPI.maximize();
  };

  const handleClose = () => {
    if (window.electronAPI) window.electronAPI.close();
  };

  return (
    <div className="h-12 flex items-center justify-between bg-background border-b border-border pl-6 pr-0 draggable select-none ml-[220px]">
      <div className="flex items-center gap-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'w-2 h-2 rounded-full',
              isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'
            )}
            title={isConnected ? 'Backend Connected' : 'Backend Disconnected'}
          />
          {title}
        </div>
      </div>

      <div className="flex items-center h-full no-drag">
        <button
          onClick={handleMinimize}
          className="h-full px-4 hover:bg-muted transition-colors flex items-center justify-center text-gray-400 hover:text-white"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={handleMaximize}
          className="h-full px-4 hover:bg-muted transition-colors flex items-center justify-center text-gray-400 hover:text-white"
        >
          <Square size={14} />
        </button>
        <button
          onClick={handleClose}
          className="h-full px-4 hover:bg-destructive hover:text-white transition-colors flex items-center justify-center text-gray-400"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
