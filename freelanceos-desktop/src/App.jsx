import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import { OrganizationsList } from './pages/Organizations/OrganizationsList';
import { OrganizationDetail } from './pages/Organizations/OrganizationDetail';

function App() {
  return (
    <BrowserRouter>
      <MainLayout title="FreelanceOS">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/organizations" element={<OrganizationsList />} />
          <Route path="/organizations/:id" element={<OrganizationDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
