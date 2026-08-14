// src/pages/Home.jsx
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import HomeContent from '../components/dashboard/HomeContent';

function Home() {
  return (
    <DashboardLayout>
      <HomeContent />
    </DashboardLayout>
  );
}

export default Home;