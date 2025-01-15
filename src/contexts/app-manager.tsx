import React, { useEffect } from 'react';


export interface AppManager {
  buttonVisible: boolean;
  toggleButton: (value?: boolean) => void;
  setKeys: (mask: number) => void;
}

const AppManagerContext = React.createContext<AppManager | null>(null);

export const AppManagerProvider = ({ children }: { children: React.ReactNode }) => {

  const [buttonVisible, setButtonVisible] = React.useState<boolean>(false);

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

  return <AppManagerContext.Provider
    value={{
      buttonVisible,
      toggleButton,
      setKeys,
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
