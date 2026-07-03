import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, ChevronsUpDown, Plus, Loader2 } from 'lucide-react';
import { dropdownOptionsApi } from '../../api/dropdownOptions';
import { cn, StatusBadge } from './StatusBadge';
import './command.css'; // Minimal CSS for cmdk

export function DynamicDropdown({ category, value, onChange, placeholder = 'Select option...', allowCreate = true, disabled = false }) {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ['dropdownOptions', category],
    queryFn: () => dropdownOptionsApi.getByCategory(category)
  });

  const options = response?.data || [];
  const selectedOption = options.find(opt => opt.value === value);

  const createMutation = useMutation({
    mutationFn: (label) => dropdownOptionsApi.create({ category, label }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dropdownOptions', category] });
      onChange(data.data.value);
      setOpen(false);
      setIsCreating(false);
      setNewLabel('');
    }
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (newLabel.trim()) {
      createMutation.mutate(newLabel.trim());
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-[42px] w-full items-center justify-between rounded-lg border border-white/10 bg-[#141414] px-4 py-2 text-sm text-white ring-offset-[#141414] placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm hover:border-white/20",
            !value && "text-gray-400"
          )}
        >
          {selectedOption ? (
            <div className="flex items-center gap-2">
              {['project_status', 'phase_status'].includes(category) ? (
                <StatusBadge status={selectedOption.value} label={selectedOption.label} />
              ) : (
                selectedOption.label
              )}
            </div>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Content 
          align="start"
          className="z-50 w-[var(--radix-popover-trigger-width)] min-w-[200px] overflow-hidden rounded-lg border border-white/10 bg-[#141414] p-0 shadow-2xl animate-in fade-in-0 zoom-in-95"
        >
          <Command className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-[#141414] text-white">
            {!isCreating && (
              <Command.Input 
                placeholder={`Search ${placeholder.toLowerCase()}`}
                className="flex h-11 w-full rounded-t-lg bg-transparent py-3 px-4 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 border-b border-white/10 text-white"
              />
            )}
            
            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <Command.Empty className="py-6 text-center text-sm">No options found.</Command.Empty>
              
              {!isCreating && !isLoading && (
                <Command.Group className="p-1">
                  {options.map((opt) => (
                    <Command.Item
                      key={opt._id}
                      value={opt.value}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                      className={cn(
                        "relative flex cursor-default select-none items-center rounded-md px-2 py-2 text-sm outline-none aria-selected:bg-white/5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-white/5 transition-colors",
                        value === opt.value && "bg-white/5 font-medium text-blue-400"
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === opt.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {['project_status', 'phase_status'].includes(category) ? (
                        <StatusBadge status={opt.value} label={opt.label} />
                      ) : (
                        opt.label
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
              
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                </div>
              )}
            </Command.List>

            {allowCreate && (
              <div className="border-t border-white/10 p-1 bg-[#1a1a1a]">
                {isCreating ? (
                  <form onSubmit={handleCreate} className="flex items-center gap-2 p-1.5">
                    <input
                      autoFocus
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      placeholder="New option name..."
                      className="flex-1 h-8 px-2 text-sm border border-white/10 rounded-md bg-[#0a0a0a] text-white outline-none focus:border-blue-500/50"
                    />
                    <button
                      type="submit"
                      disabled={!newLabel.trim() || createMutation.isPending}
                      className="h-8 px-3 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-500 disabled:opacity-50 transition-colors"
                    >
                      {createMutation.isPending ? 'Saving...' : 'Add'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsCreating(false); setNewLabel(''); }}
                      className="h-8 px-2 text-gray-400 hover:text-white rounded-md text-xs font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsCreating(true)}
                    className="flex w-full cursor-default select-none items-center rounded-md px-2 py-2 text-sm text-blue-400 outline-none hover:bg-blue-500/10 hover:text-blue-300 transition-colors"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add new option
                  </button>
                )}
              </div>
            )}
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
