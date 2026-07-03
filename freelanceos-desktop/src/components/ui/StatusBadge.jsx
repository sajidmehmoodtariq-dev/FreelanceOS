import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function StatusBadge({ status, label, className }) {
  // A mapping of potential statuses to tailwind color schemes
  const colorMap = {
    // Project Statuses
    lead: 'bg-blue-100 text-blue-800 border-blue-200',
    active: 'bg-green-100 text-green-800 border-green-200',
    on_hold: 'bg-orange-100 text-orange-800 border-orange-200',
    completed: 'bg-purple-100 text-purple-800 border-purple-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    // Phase Statuses
    not_started: 'bg-gray-100 text-gray-800 border-gray-200',
    in_progress: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    review: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    // Default
    default: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  const statusKey = status ? status.toLowerCase() : 'default';
  const colorClass = colorMap[statusKey] || colorMap.default;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colorClass,
        className
      )}
    >
      {label || status}
    </span>
  );
}
