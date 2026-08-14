import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

jest.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({ isAuthenticated: false, isLoading: false, loading: false }),
  useAuth: () => ({ isAuthenticated: false, isLoading: false, loading: false }),
}));

jest.mock('../components/layout/AppLayout', () => {
  const React = require('react');
  const { Outlet } = require('react-router-dom');

  return {
    __esModule: true,
    default: () => <div data-testid="app-layout"><Outlet /></div>,
  };
});

jest.mock('../pages/Landing', () => ({
  __esModule: true,
  default: () => <div>Landing Page</div>,
}));

jest.mock('../pages/Dashboard', () => ({
  __esModule: true,
  default: () => <div>Dashboard Page</div>,
}));

jest.mock('../pages/AiAssistant', () => ({
  __esModule: true,
  default: () => <div>AI Assistant Page</div>,
}));

jest.mock('../pages/Login', () => ({
  __esModule: true,
  default: () => <div>Login Page</div>,
}));

describe('AppRoutes public access', () => {
  test('renders the AI assistant page without redirecting to login', () => {
    render(
      <MemoryRouter initialEntries={['/ai-assistant']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('AI Assistant Page')).toBeInTheDocument();
  });

  test('renders the dashboard page without redirecting to login', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
  });
});
