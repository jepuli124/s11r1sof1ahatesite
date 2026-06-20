// https://medium.com/@ilham.abdillah.alhamdi/eventbus-pattern-in-react-a-lightweight-alternative-to-context-and-redux-cc6e8a1dc9ca

type EventCallback = (...args: any[]) => void;

export class EventBus {
  private events: Record<string, EventCallback[]> = {};
  static instance: EventBus;

  constructor() {
        if (EventBus.instance) {
            return EventBus.instance;
        }
        EventBus.instance = this;
    }

  subscribe(event: string, callback: EventCallback): () => void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(cb => cb !== callback);
      
      if (this.events[event].length === 0) {
        delete this.events[event];
      }
    };
  }

  publish(event: string, ...args: any[]): void {
    if (!this.events[event]) return;
    
    this.events[event].forEach(callback => {
      callback(...args);
    });
  }
}

const eventBusHandler = new EventBus();
export default eventBusHandler;