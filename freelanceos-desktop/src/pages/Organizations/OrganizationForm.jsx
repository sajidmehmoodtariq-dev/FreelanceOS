import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationsApi } from '../../api/organizations';
import { DynamicDropdown } from '../../components/ui/DynamicDropdown';

const orgSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  contactPerson: z.string().optional().default(''),
  email: z.string().email('Invalid email').or(z.literal('')).optional().default(''),
  phone: z.string().regex(/^[0-9+\-() ]+$/, 'Invalid phone format').or(z.literal('')).optional().default(''),
  industry: z.string().optional().default(''),
  address: z.string().optional().default(''),
  notes: z.string().optional().default('')
});

export function OrganizationForm({ organization, onSuccess, onCancel }) {
  const queryClient = useQueryClient();
  const isEditing = !!organization;

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      industry: '',
      address: '',
      notes: ''
    }
  });

  useEffect(() => {
    if (organization) {
      reset({
        name: organization.name || '',
        contactPerson: organization.contactPerson || '',
        email: organization.email || '',
        phone: organization.phone || '',
        industry: organization.industry?._id || organization.industry || '',
        address: organization.address || '',
        notes: organization.notes || ''
      });
    } else {
      reset({
        name: '', contactPerson: '', email: '', phone: '', industry: '', address: '', notes: ''
      });
    }
  }, [organization, reset]);

  const saveMutation = useMutation({
    mutationFn: (data) => {
      if (isEditing) {
        return organizationsApi.update(organization._id, data);
      }
      return organizationsApi.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      if (isEditing) {
        queryClient.invalidateQueries({ queryKey: ['organization', organization._id] });
      }
      onSuccess?.();
    }
  });

  const onSubmit = (data) => {
    saveMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pr-2 space-y-5 custom-scrollbar">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Organization Name *</label>
          <input
            {...register('name')}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all shadow-sm"
            placeholder="Acme Corp"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Industry</label>
          <Controller
            control={control}
            name="industry"
            render={({ field }) => (
              <DynamicDropdown
                category="industry"
                value={field.value}
                onChange={field.onChange}
                placeholder="Select an industry..."
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Contact Person</label>
            <input
              {...register('contactPerson')}
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <input
              {...register('email')}
              className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all shadow-sm"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone</label>
          <input
            {...register('phone')}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all shadow-sm"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Address</label>
          <textarea
            {...register('address')}
            rows={2}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all shadow-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Notes</label>
          <textarea
            {...register('notes')}
            rows={4}
            className="w-full bg-[#141414] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all shadow-sm resize-none"
          />
        </div>
      </div>

      <div className="pt-5 border-t border-white/10 flex justify-end gap-3 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-white/10 bg-[#141414] rounded-lg text-sm font-medium text-gray-300 hover:bg-[#1f1f1f] hover:text-white transition-all shadow-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saveMutation.isPending}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all border border-white/10"
        >
          {saveMutation.isPending ? 'Saving...' : 'Save Organization'}
        </button>
      </div>
    </form>
  );
}
