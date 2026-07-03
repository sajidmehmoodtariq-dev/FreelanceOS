import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ placeholder = 'Search...', onChange, delay = 300, className = '' }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(searchTerm);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay, onChange]);

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none transition-colors group-focus-within:text-blue-400">
        <Search className="w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full py-2.5 pl-10 pr-4 text-sm text-white bg-[#141414] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 placeholder:text-gray-500 transition-all shadow-sm hover:border-white/20"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
