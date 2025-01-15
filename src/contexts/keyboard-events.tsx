import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { HbbtvKeyEvents, specialKeyMap } from '../utils/keys-map';


type EventHandler = (event: KeyboardEvent) => void;

interface EventHandlerDetails {
  handler: EventHandler;
  componentId: string;
  handleCount: number;
}

interface EventsRegistry {
  [key: number]: EventHandlerDetails[];
}

const KeyboardEventsContext = createContext<{
  registerEvent: (key: string, handler: EventHandler, componentId: string, times?: number) => void;
  unregisterComponentEvents: (componentId: string) => void;
} | null>(null);

const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const KeyboardEventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eventsRegistry, setEventsRegistry] = useState<EventsRegistry>({});
  const eventsRegistryRef = useRef(eventsRegistry);

  useEffect(() => {
    eventsRegistryRef.current = eventsRegistry;
  }, [eventsRegistry]);

  const registerEvent = useCallback((
      key: string,
      handler: EventHandler,
      componentId: string,
      times: number = -1
    ) => {
      const keyCode = specialKeyMap[key] || HbbtvKeyEvents[key] || key.toUpperCase().charCodeAt(0);
      if (isNaN(keyCode)) {
        return;
      }


      setEventsRegistry(prevRegistry => {
        const existingHandlers = prevRegistry[keyCode] || [];
        const updatedRegistry = {
          ...prevRegistry,
          [keyCode]: [...existingHandlers, { handler, componentId, handleCount: times }]
        };
        return updatedRegistry;
      });
    },
    []
  );

  const unregisterComponentEvents = useCallback(
    (componentId: string) => {
      setEventsRegistry((prevRegistry: EventsRegistry) => {
        const updatedRegistry = { ...prevRegistry };
        Object.keys(updatedRegistry).forEach((key: string) => {
          const keyNumber = Number(key);
          updatedRegistry[keyNumber] = updatedRegistry[keyNumber]
            .filter((eventHandler: EventHandlerDetails) => eventHandler.componentId !== componentId);
          if (updatedRegistry[keyNumber].length === 0) {
            delete updatedRegistry[keyNumber];
          }
        });
        return updatedRegistry;
      });
    },
    []
  );

  const handleKeyDownRef = useRef<(event: KeyboardEvent) => void>(null);

  useEffect(() => {
    handleKeyDownRef.current = debounce((event: KeyboardEvent) => {
      const keyCode = event.keyCode;
      const handlers = eventsRegistryRef.current[keyCode];
      if (handlers && handlers.length > 0) {
        const handlerDetails = handlers[0];
        handlerDetails.handler(event);

        if (handlerDetails.handleCount > 0) {
          const updatedHandler = {
            ...handlerDetails,
            handleCount: handlerDetails.handleCount - 1
          };
          setEventsRegistry((prevRegistry: EventsRegistry) => {
            const updatedRegistry = { ...prevRegistry };
            const handlerIndex = updatedRegistry[keyCode].findIndex(
              (h) => h.componentId === handlerDetails.componentId
            );
            if (handlerIndex !== -1) {
              updatedRegistry[keyCode][handlerIndex] = updatedHandler;
              if (updatedHandler.handleCount === 0) {
                updatedRegistry[keyCode].splice(handlerIndex, 1);
              }
              if (updatedRegistry[keyCode].length === 0) {
                delete updatedRegistry[keyCode];
              }
            }
            return updatedRegistry;
          });
        }
      }
    }, 100); // Adjust the debounce delay as needed
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (handleKeyDownRef.current) {
        handleKeyDownRef.current(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const contextValue = useMemo(() => ({
    registerEvent: (key: string, handler: EventHandler, componentId: string, times?: number) => {
      registerEvent(key, handler, componentId, times);
    },
    unregisterComponentEvents
  }), [registerEvent, unregisterComponentEvents]);

  return (
    <KeyboardEventsContext.Provider value={contextValue}>
      {children}
    </KeyboardEventsContext.Provider>
  );
};

export const useKeyboardEvents = (componentId: string) => {
  const context = useContext(KeyboardEventsContext);
  if (!context) {
    throw new Error('useKeyboardEvents must be used within a KeyboardEventsProvider');
  }

  const { registerEvent, unregisterComponentEvents } = context;

  const register = useCallback((
    key: string,
    handler: EventHandler,
    times?: number) => {
    if (key.indexOf(',') !== -1) {
      const keys = key.split(',');
      keys.forEach((k: string) => {
        registerEvent(k, handler, componentId, times);
      });
      return;
    } else {
      registerEvent(key, handler, componentId, times);
    }
  }, [registerEvent, componentId]);

  useEffect(() => {
    return () => {
      unregisterComponentEvents(componentId);
    };
  }, [componentId, unregisterComponentEvents]);

  return { register };
};
