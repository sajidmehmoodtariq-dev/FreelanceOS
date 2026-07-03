import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Building2, Mail, Phone, MapPin, Edit2, ArrowLeft, Plus } from 'lucide-react';
import { organizationsApi } from '../../api/organizations';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DataTable } from '../../components/ui/DataTable';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/Sheet';
import { OrganizationForm } from './OrganizationForm';
import { EmptyState } from '../../components/ui/EmptyState';

export function OrganizationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const { data: response, isLoading } = useQuery({
    queryKey: ['organization', id],
    queryFn: () => organizationsApi.getSummary(id)
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!response?.data?.organization) {
    return (
      <div className="p-8">
        <EmptyState title="Organization not found" description="The organization you are looking for does not exist." />
      </div>
    );
  }

  const { organization, projects, financials } = response.data;

  const projectColumns = [
    {
      header: 'Project Name',
      accessorKey: 'name',
      cellClassName: 'font-medium text-gray-900'
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status?.value} label={row.status?.label} />
    },
    {
      header: 'Total Price',
      cell: (row) => `$${(row.totalPrice || 0).toLocaleString()}`
    },
    {
      header: 'Received',
      cell: (row) => `$${(row.totalReceived || 0).toLocaleString()}`
    }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <button 
        onClick={() => navigate('/organizations')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Organizations
      </button>

      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{organization.name}</h1>
            {organization.industry && (
              <StatusBadge status="default" label={organization.industry.label} />
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
            {organization.contactPerson && (
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-gray-400" />
                {organization.contactPerson}
              </div>
            )}
            {organization.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${organization.email}`} className="hover:text-blue-600">{organization.email}</a>
              </div>
            )}
            {organization.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${organization.phone}`} className="hover:text-blue-600">{organization.phone}</a>
              </div>
            )}
            {organization.address && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                {organization.address}
              </div>
            )}
          </div>
          
          {organization.notes && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm text-gray-700 max-w-3xl border">
              <p className="font-medium text-gray-900 mb-1">Notes</p>
              {organization.notes}
            </div>
          )}
        </div>
        
        <button
          onClick={() => setIsEditSheetOpen(true)}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border bg-white text-gray-700 hover:bg-gray-50"
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Edit Organization
        </button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded-xl bg-white shadow-sm border-l-4 border-l-blue-500">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Billed</p>
          <h3 className="text-3xl font-bold text-gray-900">${financials.totalBilled.toLocaleString()}</h3>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow-sm border-l-4 border-l-green-500">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Received</p>
          <h3 className="text-3xl font-bold text-green-600">${financials.totalReceived.toLocaleString()}</h3>
        </div>
        <div className="p-6 border rounded-xl bg-white shadow-sm border-l-4 border-l-red-500">
          <p className="text-sm font-medium text-gray-500 mb-1">Pending Amount</p>
          <h3 className="text-3xl font-bold text-red-600">${financials.totalPending.toLocaleString()}</h3>
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Projects</h2>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
            <Plus className="w-4 h-4 mr-1.5" />
            Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <EmptyState 
            title="No projects yet" 
            description="This organization does not have any projects attached to it."
          />
        ) : (
          <DataTable 
            columns={projectColumns} 
            data={projects} 
            onRowClick={(row) => navigate(`/projects/${row._id}`)}
          />
        )}
      </div>

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent>
          <SheetHeader className="mb-4">
            <SheetTitle>Edit Organization</SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100vh-8rem)]">
            <OrganizationForm 
              organization={organization}
              onSuccess={() => setIsEditSheetOpen(false)}
              onCancel={() => setIsEditSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
