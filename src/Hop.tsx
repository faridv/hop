import React from 'react';
import { AppManagerProvider } from './contexts/app-manager';
import { KeyboardEventsProvider } from './contexts/keyboard-events';
import MainRouting from './router';
import { StyleSheetManager } from 'styled-components';
import isValidProp from "@emotion/is-prop-valid";


function HOP() {

  return (
    <React.StrictMode>
      <AppManagerProvider>
        <KeyboardEventsProvider>
          <StyleSheetManager shouldForwardProp={isValidProp}>
            <MainRouting/>
          </StyleSheetManager>
        </KeyboardEventsProvider>
      </AppManagerProvider>
    </React.StrictMode>
  );
}

export default HOP;
