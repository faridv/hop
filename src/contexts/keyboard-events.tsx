import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type EventHandler = (event: KeyboardEvent) => void;

interface EventHandlerDetails {
  handler: EventHandler;
  componentId: string;
  handleCount: number;
}

interface EventsRegistry {
  [key: string]: EventHandlerDetails[];
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

  const registerEvent = useCallback(
    (key: string, handler: EventHandler, componentId: string, times: number = -1) => {
      setEventsRegistry(prevRegistry => {
        const existingHandlers = prevRegistry[key] || [];
        return {
          ...prevRegistry,
          [key]: [...existingHandlers, { handler, componentId, handleCount: times }]
        };
      });
    },
    []
  );

  const unregisterComponentEvents = useCallback(
    (componentId: string) => {
      setEventsRegistry(prevRegistry => {
        const updatedRegistry = { ...prevRegistry };
        Object.keys(updatedRegistry).forEach(key => {
          updatedRegistry[key] = updatedRegistry[key].filter(eh => eh.componentId !== componentId);
          if (updatedRegistry[key].length === 0) {
            delete updatedRegistry[key];
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
      const handlers = eventsRegistryRef.current[event.key];
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
            const handlerIndex = updatedRegistry[event.key].findIndex(
              (h) => h.componentId === handlerDetails.componentId
            );
            if (handlerIndex !== -1) {
              updatedRegistry[event.key][handlerIndex] = updatedHandler;
              if (updatedHandler.handleCount === 0) {
                updatedRegistry[event.key].splice(handlerIndex, 1);
              }
              if (updatedRegistry[event.key].length === 0) {
                delete updatedRegistry[event.key];
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
    registerEvent(key, handler, componentId, times);
  }, [registerEvent, componentId]);

  useEffect(() => {
    return () => {
      unregisterComponentEvents(componentId);
    };
  }, [componentId, unregisterComponentEvents]);

  return { register };
};
