import React, { useEffect } from 'react';
import { Application, ApplicationManagerObject, ApplicationPrivateData, ConfigurationObject, VideoBroadcastObject } from '../types/hbbtv-typings';


const AppManagerContext = React.createContext<{
  buttonVisible: boolean;
  toggleButton: (value?: boolean) => void;
  setKeys: (mask: string) => void;
} | null>(null);

export const AppManagerProvider = ({ children }: { children: React.ReactNode }) => {

  const [buttonVisible, setButtonVisible] = React.useState(false);

  useEffect(() => {
    initializeApplication();
  }, []);

  const toggleButton = (value?: boolean): void => {
    if (typeof value === 'boolean') {
      setButtonVisible(value);
    } else {
      setButtonVisible(!buttonVisible);
    }
  }

  const initializeApplication = (): void => {
    try {
      const app = (document.getElementById("appmgr") as ApplicationManagerObject).getOwnerApplication(document);
      const broadcastVideo = document.getElementById("broadcastvideo") as VideoBroadcastObject;
      try {
        app.show();
      } catch (e) {
        // ignore
      }
      try {
        app.activate();
      } catch (e) {
        // ignore
      }
      try {
        broadcastVideo.setFullScreen(true);
      } catch (e) {

      }
      try {
        broadcastVideo.bindToCurrentChannel();
      } catch (e) {

      }
    } catch (e) {
      // ignore
    }
  }

  const setKeys = (mask: string): void => {

    let elemcfg: ConfigurationObject | null = null;

    try {
      elemcfg = document.getElementById('oipfcfg') as unknown as ApplicationPrivateData;
      // for HbbTV 0.5:
      (elemcfg!.keyset as any).value = mask;
    } catch (e) {
      /* In newer versions of HbbTV keyset.value is read-only, therefore this method throws an exception */
      // ignore
    }
    try {
      elemcfg = document.getElementById('oipfcfg') as ConfigurationObject;
      elemcfg!.keyset.setValue(mask);
    } catch (e) {
      /* In newer versions of HbbTV keyset.setValue only works on privateData of application, therefore this method throws an exception */
      // ignore
    }
    // for HbbTV 1.0:
    try {
      const app = (document.getElementById("appmgr") as unknown as ApplicationManagerObject).getOwnerApplication(document);
      app.privateData.keyset.setValue(mask);
    } catch (e) {

    }
  }


  return <AppManagerContext.Provider
    value={{ buttonVisible, toggleButton, setKeys }}
  >
    {children}
  </AppManagerContext.Provider>;
}

export const useAppManager = () => {
  const context = React.useContext(AppManagerContext);
  if (context === null) {
    throw new Error("useAppManager must be used within a AppManagerProvider");
  }
  const { buttonVisible, toggleButton, setKeys } = context;
  return { buttonVisible, toggleButton, setKeys };
}
