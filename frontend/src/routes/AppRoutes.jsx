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
import PublicAiPage from '../pages/PublicAiPage';
import PublicMeetPage from '../pages/PublicMeetPage';
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

import Whiteboards from '../pages/Whiteboards';
import Notes from '../pages/Notes';
import Clips from '../pages/Clips';
import Canvas from '../pages/Canvas';
import PaperPage from '../pages/Paper';
import Sheets from '../pages/Sheets';
import Slides from '../pages/Slides';
import Tasks from '../pages/Tasks';

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
      <Route path="/ai" element={<PublicAiPage />} />
      <Route path="/meet" element={<PublicMeetPage />} />
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

          {/* Workspace Shell Routes */}
          <Route path="/whiteboards" element={<Whiteboards />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/clips" element={<Clips />} />
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/paper" element={<PaperPage />} />
          <Route path="/sheets" element={<Sheets />} />
          <Route path="/slides" element={<Slides />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;