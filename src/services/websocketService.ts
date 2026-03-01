type MessageHandler = (data: unknown) => void;
type EventMap = Map<string, Set<MessageHandler>>;

/**
 * Singleton WebSocket service.
 * Manages connection lifecycle, auto-reconnect, and typed pub/sub messaging.
 */
class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: EventMap = new Map();
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectDelay = 3000;
  private url = '';

  /** Open the WebSocket connection and set up event handlers */
  connect(url: string): void {
    this.url = url;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.info('[WS] Connected:', url);
      this.reconnectAttempts = 0;
    };

    // Route incoming messages to registered topic listeners
    this.socket.onmessage = (event: MessageEvent) => {
      try {
        const payload = JSON.parse(event.data) as { event: string; data: unknown };
        this.emit(payload.event, payload.data);
      } catch {
        console.warn('[WS] Failed to parse message:', event.data);
      }
    };

    this.socket.onerror = (err) => {
      console.error('[WS] Error:', err);
    };

    // Attempt reconnection on unexpected closure
    this.socket.onclose = (event) => {
      if (!event.wasClean) {
        this.scheduleReconnect();
      }
    };
  }

  /** Send a typed message to the server */
  send(event: string, data: unknown): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ event, data }));
    } else {
      console.warn('[WS] Cannot send — socket not open');
    }
  }

  /** Subscribe a handler to a specific event topic */
  on(event: string, handler: MessageHandler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  /** Unsubscribe a handler from a specific event topic */
  off(event: string, handler: MessageHandler): void {
    this.listeners.get(event)?.delete(handler);
  }

  /** Close the connection and prevent auto-reconnect */
  disconnect(): void {
    this.reconnectAttempts = this.maxReconnectAttempts; // prevent reconnect
    this.socket?.close(1000, 'Client disconnect');
    this.socket = null;
  }

  /** Dispatch an event to all registered handlers */
  private emit(event: string, data: unknown): void {
    this.listeners.get(event)?.forEach((handler) => handler(data));
  }

  /** Wait then attempt to re-open the connection */
  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[WS] Max reconnect attempts reached');
      return;
    }
    this.reconnectAttempts++;
    console.info(`[WS] Reconnecting in ${this.reconnectDelay}ms (attempt ${this.reconnectAttempts})`);
    setTimeout(() => this.connect(this.url), this.reconnectDelay);
  }
}

// Export a singleton instance for use across the application
export const websocketService = new WebSocketService();
