import React from 'react';
import { FileQuestion } from 'lucide-react';

export function EmptyState({ 
  icon: Icon = FileQuestion, 
  title = 'No Data Found', 
  description = 'There is currently nothing to display here.',
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center border border-white/10 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 mb-6 relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
        <Icon className="w-10 h-10 text-blue-400" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2 relative z-10">{title}</h3>
      <p className="text-sm text-gray-400 max-w-sm mb-8 relative z-10 leading-relaxed">{description}</p>
      {action && <div className="relative z-10">{action}</div>}
    </div>
  );
}
