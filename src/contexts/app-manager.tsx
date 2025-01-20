import React, { useEffect, useState } from "react";

interface AppManager {
  buttonVisible: boolean;
  appManager: Application | null;
  toggleButton: (value?: boolean) => void;
  setKeys: (mask: number) => void;
  destroy: (force?: boolean) => void;
}

  interface Application {
    destroyApplication(): void;

    show(): void;

    hide(): void;

    privateData: ApplicationPrivateData;
  }

  interface ApplicationManagerObject {
    getOwnerApplication(document: Document): Application;
  }

  interface ApplicationPrivateData {
    keyset: Keyset;
  }

  interface Keyset {
    setValue(mask: number): void;

    value?: number;
  }

  interface VideoBroadcastObject {
    setFullScreen(value: boolean): void;

    bindToCurrentChannel(): void;
  }


const AppManagerContext = React.createContext<AppManager | null>(null);

export const AppManagerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);

  const [appManager, setAppManager] =
    useState<Application | null>(null);

  useEffect(() => {
    initializeApplication();
  }, []);

  const toggleButton = (value?: boolean): void => {
    if (typeof value === "boolean") {
      setButtonVisible(value);
    } else {
      setButtonVisible(!buttonVisible);
    }
  };

  const initializeApplication = (): void => {
    try {
      const app = (
        document.getElementById("appmgr") as unknown as ApplicationManagerObject
      ).getOwnerApplication(document);
      setAppManager(app!);
      const broadcastVideo = document.getElementById(
        "broadcastvideo"
      ) as unknown as VideoBroadcastObject;
      try {
        app!.show();
      } catch (e) {
        // ignore
      }
      try {
        broadcastVideo.setFullScreen(true);
      } catch (e) {}
      try {
        broadcastVideo.bindToCurrentChannel();
      } catch (e) {}
    } catch (e) {
      // ignore
    }
  };

  const setKeys = (mask: number): void => {
    try {
      const elemcfg = document.getElementById(
        "oipfcfg"
      ) as unknown as ApplicationPrivateData;
      (elemcfg!.keyset as any).value = mask;
    } catch (e) {
      // ignore
    }
    try {
      const elemcfg = document.getElementById(
        "oipfcfg"
      ) as unknown as ApplicationPrivateData;
      elemcfg!.keyset.setValue(mask);
    } catch (e) {
      // ignore
    }
    try {
      const app = (
        document.getElementById(
          "appmgr"
        ) as unknown as ApplicationManagerObject
      ).getOwnerApplication(document);
      app!.privateData.keyset.setValue(mask);
    } catch (e) {}
  };

  const destroy = (force: boolean = false): void => {
    if (force) {
      try {
        setKeys(0x1 + 0x2 + 0x4 + 0x8);
        (appManager as unknown as Application).destroyApplication();
      } catch (e) {
        // could not force destroy the app
      }
    }
    try {
      appManager!.hide();
    } catch (e) {
      // hide it by css
      try {
        document.getElementById("app")!.style.display = "none";
      } catch (e) {}
    }
  };

  return (
    <AppManagerContext.Provider
      value={{
        buttonVisible,
        appManager,
        toggleButton,
        setKeys,
        destroy,
      }}
    >
      {children}
    </AppManagerContext.Provider>
  );
};

export const useAppManager = (): AppManager => {
  const context: AppManager | null = React.useContext(AppManagerContext);
  if (context === null) {
    throw new Error("useAppManager must be used within a AppManagerProvider");
  }
  return context;
};
