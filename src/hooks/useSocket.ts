import { useEffect, useCallback } from 'react';
import { websocketService } from '../services/websocketService';

type MessageHandler = (data: unknown) => void;

/** Connects to the WebSocket server and provides subscribe/send helpers */
export const useSocket = (url?: string) => {
  useEffect(() => {
    const wsUrl = url ?? import.meta.env.VITE_WS_URL;
    if (wsUrl) {
      websocketService.connect(wsUrl);
    }
    return () => {
      websocketService.disconnect();
    };
  }, [url]);

  // Subscribe to a named event topic; auto-unsubscribes on component unmount
  const subscribe = useCallback((event: string, handler: MessageHandler) => {
    websocketService.on(event, handler);
    return () => websocketService.off(event, handler);
  }, []);

  // Publish a message to the server
  const publish = useCallback((event: string, data: unknown) => {
    websocketService.send(event, data);
  }, []);

  return { subscribe, publish };
};
