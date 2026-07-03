import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  return (
    <div className="w-[220px] h-full bg-[#0f0f0f] flex flex-col fixed left-0 top-0 text-gray-300 border-r border-border">
      <div className="h-12 flex items-center px-4 font-bold text-white text-lg draggable select-none">
        FreelanceOS
      </div>
      
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto no-drag">
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
              isActive
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-muted hover:text-white'
            )
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
      </div>

      <div className="p-4 text-xs text-gray-500 font-mono select-none no-drag">
        v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;
