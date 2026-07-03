import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const MainLayout = ({ children, title }) => {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 relative z-0">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto ml-[220px] p-6 no-drag">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
