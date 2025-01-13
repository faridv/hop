import React from 'react';
import { AppManagerProvider } from './contexts/app-manager';
import { KeyboardEventsProvider } from './contexts/keyboard-events';
import MainRouting from './routers';

function HOP() {
  return (
    <React.StrictMode>
      <AppManagerProvider>
        <KeyboardEventsProvider>
          <MainRouting />
        </KeyboardEventsProvider>
      </AppManagerProvider>
    </React.StrictMode>
  );
}

export default HOP;
