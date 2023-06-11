import { useEffect } from "react";

type EventHandler = (e: Event) => void;

const handlers: { [event: string]: Set<EventHandler> } = {};
const passiveEvents = ["scroll", "touchstart", "touchmove", "wheel"];

function addEventListener(event: string, callback: EventHandler) {
  if (!handlers[event]) {
    handlers[event] = new Set();
    window.addEventListener(
      event,
      (e) => handlers[event].forEach((cb) => cb(e)),
      {
        passive: passiveEvents.includes(event),
      }
    );
  }

  handlers[event].add(callback);

  return () => {
    handlers[event].delete(callback);
    if (!handlers[event].size) delete handlers[event];
  };
}

export function useEvent(event: string, callback: EventHandler) {
  useEffect(() => addEventListener(event, callback), [callback]);
}
