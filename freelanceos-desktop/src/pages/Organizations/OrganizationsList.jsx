import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Building2, Edit2, Trash2, Plus } from 'lucide-react';
import { organizationsApi } from '../../api/organizations';
import { DataTable } from '../../components/ui/DataTable';
import { SearchBar } from '../../components/ui/SearchBar';
import { DynamicDropdown } from '../../components/ui/DynamicDropdown';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/Sheet';
import { OrganizationForm } from './OrganizationForm';
import { EmptyState } from '../../components/ui/EmptyState';

export function OrganizationsList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  
  // Sheet state
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);

  // Delete Dialog state
  const [deleteOrgId, setDeleteOrgId] = useState(null);

  const { data: response, isLoading } = useQuery({
    queryKey: ['organizations', { page, search, industry }],
    queryFn: () => organizationsApi.getAll({ page, limit: 10, search, industry })
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => organizationsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    }
  });

  const orgs = response?.data || [];
  const pagination = response?.pagination || { page: 1, pages: 1 };

  const handleEdit = (e, org) => {
    e.stopPropagation();
    setEditingOrg(org);
    setIsSheetOpen(true);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setDeleteOrgId(id);
  };

  const confirmDelete = () => {
    if (deleteOrgId) {
      deleteMutation.mutate(deleteOrgId);
      setDeleteOrgId(null);
    }
  };

  const columns = [
    {
      header: 'Organization',
      accessorKey: 'name',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
            {row.name.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-medium text-white">{row.name}</span>
        </div>
      )
    },
    {
      header: 'Industry',
      cell: (row) => row.industry?.label || '-'
    },
    {
      header: 'Contact',
      accessorKey: 'contactPerson',
      cell: (row) => row.contactPerson || '-'
    },
    {
      header: 'Financials',
      cell: (row) => {
        const billed = row.totalBilled || 0;
        const received = row.totalReceived || 0;
        const pending = billed - received;
        return (
          <div className="flex flex-col text-xs">
            <span className="text-gray-600">Billed: ${billed.toLocaleString()}</span>
            <span className="text-green-600">Received: ${received.toLocaleString()}</span>
            {pending > 0 && <span className="text-red-600 font-medium">Pending: ${pending.toLocaleString()}</span>}
          </div>
        );
      }
    },
    {
      header: '',
      cell: (row) => (
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => handleEdit(e, row)}
            className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => handleDeleteClick(e, row._id)}
            className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
      cellClassName: 'text-right'
    }
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-[#0a0a0a]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Organizations</h1>
          <p className="text-gray-400 text-sm mt-2">Manage your clients and their projects.</p>
        </div>
        <button
          onClick={() => { setEditingOrg(null); setIsSheetOpen(true); }}
          className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 transition-all border border-white/10"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Organization
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <SearchBar 
          placeholder="Search organizations..." 
          onChange={setSearch} 
          className="w-80"
        />
        <div className="w-64">
          <DynamicDropdown
            category="industry"
            value={industry}
            onChange={setIndustry}
            placeholder="All Industries"
            allowCreate={false}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {!isLoading && orgs.length === 0 && !search && !industry ? (
          <EmptyState 
            icon={Building2}
            title="No organizations yet"
            description="Get started by adding your first client organization."
            action={
              <button
                onClick={() => { setEditingOrg(null); setIsSheetOpen(true); }}
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-5 border border-white/10 bg-[#141414] text-white hover:bg-[#1f1f1f] transition-all shadow-sm"
              >
                Add Organization
              </button>
            }
          />
        ) : (
          <DataTable
            columns={columns}
            data={orgs}
            isLoading={isLoading}
            onRowClick={(row) => navigate(`/organizations/${row._id}`)}
          />
        )}
      </div>

      {/* Pagination */}
      {!isLoading && pagination.pages > 1 && (
        <div className="flex items-center justify-between mt-6 border-t pt-4">
          <div className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.pages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
              disabled={page === pagination.pages}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>{editingOrg ? 'Edit Organization' : 'New Organization'}</SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100vh-8rem)]">
            <OrganizationForm 
              organization={editingOrg}
              onSuccess={() => setIsSheetOpen(false)}
              onCancel={() => setIsSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        open={!!deleteOrgId}
        onOpenChange={(open) => !open && setDeleteOrgId(null)}
        title="Delete Organization"
        description="Are you sure you want to delete this organization? All associated projects will also be soft-deleted."
        onConfirm={confirmDelete}
        confirmText="Delete"
      />
    </div>
  );
}
