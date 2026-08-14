import React, { Suspense } from 'react';
import AppThemeProvider from './theme/AppThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/common/ToastProvider';
import { SocketProvider } from './context/SocketContext';
import { MediaProvider } from './context/MediaContext';
import { MeetingProvider } from './context/MeetingContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageLoader from './components/common/PageLoader';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <ErrorBoundary>
      <AppThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <SocketProvider>
              <MediaProvider>
                <MeetingProvider>
                  <Suspense fallback={<PageLoader />}>
                    <AppRoutes />
                  </Suspense>
                </MeetingProvider>
              </MediaProvider>
            </SocketProvider>
          </AuthProvider>
        </ToastProvider>
      </AppThemeProvider>
    </ErrorBoundary>
  );
};

export default App;