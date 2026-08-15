import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

jest.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({ isAuthenticated: true, isLoading: false, loading: false }),
  useAuth: () => ({ isAuthenticated: true, isLoading: false, loading: false }),
}));

jest.mock('../components/layout/AppLayout', () => {
  const React = require('react');
  const { Outlet } = require('react-router-dom');

  return {
    __esModule: true,
    default: () => React.createElement('div', { 'data-testid': 'app-layout' }, React.createElement(Outlet)),
  };
});

jest.mock('../pages/Landing', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', null, 'Landing Page') };
});

jest.mock('../pages/PublicAiPage', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', null, 'Public AI Page') };
});

jest.mock('../pages/Dashboard', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', null, 'Dashboard Page') };
});

jest.mock('../pages/AiAssistant', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', null, 'AI Assistant Page') };
});

jest.mock('../pages/Login', () => {
  const React = require('react');
  return { __esModule: true, default: () => React.createElement('div', null, 'Login Page') };
});

describe('AppRoutes public and protected access', () => {
  test('renders the public AI page on /ai', () => {
    render(
      <MemoryRouter initialEntries={['/ai']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Public AI Page')).toBeInTheDocument();
  });

  test('renders the AI assistant workspace on /ai-assistant when authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/ai-assistant']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('AI Assistant Page')).toBeInTheDocument();
  });

  test('renders the dashboard page when authenticated', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
  });
});

