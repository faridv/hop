import React, { useEffect, useState } from 'react';


export interface AppManager {
  buttonVisible: boolean;
  toggleButton: (value?: boolean) => void;
  setKeys: (mask: number) => void;
  destroy: () => void;
  appManager: OIPF.ApplicationManagerObject | null;
}

const AppManagerContext = React.createContext<AppManager | null>(null);

export const AppManagerProvider = ({ children }: { children: React.ReactNode }) => {

  const [buttonVisible, setButtonVisible] = useState<boolean>(false);

  const [appManager, setAppManager] = useState<OIPF.ApplicationManagerObject | null>(null);

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
      const app = (document.getElementById("appmgr") as OIPF.ApplicationManagerObject).getOwnerApplication(document);
      setAppManager(app!);
      const broadcastVideo = document.getElementById("broadcastvideo") as OIPF.VideoBroadcastObject;
      try {
        app!.show();
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

  const setKeys = (mask: number): void => {

    try {
      const elemcfg = document.getElementById('oipfcfg') as unknown as OIPF.ApplicationPrivateData;
      (elemcfg!.keyset as any).value = mask;
    } catch (e) {
      // ignore
    }
    try {
      const elemcfg = document.getElementById('oipfcfg') as unknown as OIPF.ApplicationPrivateData;
      elemcfg!.keyset.setValue(mask);
    } catch (e) {
      // ignore
    }
    try {
      const app = (document.getElementById("appmgr") as unknown as OIPF.ApplicationManagerObject).getOwnerApplication(document);
      app!.privateData.keyset.setValue(mask);
    } catch (e) {

    }
  }

  const destroy = (force: boolean = false): void => {
    if (force) {
      try {
        setKeys(0x1 + 0x2 + 0x4 + 0x8);
        (appManager as OIPF.Application).destroyApplication();
      } catch (e) {
        // could not force destroy the app
      }
    }
    try {
      appManager.hide();
    } catch (e) {
      // hide it by css
      try {
        document.getElementById('app').style.display = 'none';

      } catch (e) {
      }
    }
  }

  return <AppManagerContext.Provider
    value={{
      buttonVisible,
      appManager,
      toggleButton,
      setKeys,
      destroy,
    }}
  >
    {children}
  </AppManagerContext.Provider>;
}

export const useAppManager = (): AppManager => {
  const context: AppManager | null = React.useContext(AppManagerContext);
  if (context === null) {
    throw new Error("useAppManager must be used within a AppManagerProvider");
  }
  return context;
}
