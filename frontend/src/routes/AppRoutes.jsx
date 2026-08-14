import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout & Guards
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import Landing from '../pages/Landing';
import ProductsPage from '../pages/ProductsPage';
import SolutionsPage from '../pages/SolutionsPage';
import PricingPage from '../pages/PricingPage';
import ResourcesPage from '../pages/ResourcesPage';
import SupportPage from '../pages/SupportPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import OtpVerification from '../pages/OtpVerification';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// Protected Pages
import Dashboard from '../pages/Dashboard';
import Meetings from '../pages/Meetings';
import Calendar from '../pages/Calendar';
import History from '../pages/History';
import Recordings from '../pages/Recordings';
import Contacts from '../pages/Contacts';
import Chat from '../pages/Chat';
import SettingsPage from '../pages/SettingsPage';
import AiAssistant from '../pages/AiAssistant';
import AdminDashboard from '../pages/AdminDashboard';
import MeetingRoom from '../pages/MeetingRoom';
import PageNotFound from '../pages/PageNotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/plans" element={<PricingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/otp" element={<OtpVerification />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Full-Screen Meeting Room */}
      <Route path="/meeting/:id" element={<MeetingRoom />} />
      <Route path="/meet/:id" element={<MeetingRoom />} />

      {/* Protected Routes inside Main AppLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/history" element={<History />} />
          <Route path="/recordings" element={<Recordings />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings/*" element={<SettingsPage />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;