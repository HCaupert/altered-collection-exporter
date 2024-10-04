import { useEffect, useCallback, useRef } from "react";

type KeyPressOptions = {
  event?: KeyboardEvent["type"];
  target?: Window | HTMLElement | null;
  eventOptions?: boolean | AddEventListenerOptions;
};

export function useKeyDown(
  key: string,
  cb: (event: KeyboardEvent) => void,
  options: KeyPressOptions = {},
): void {
  const {
    event = "keydown",
    target = typeof window !== "undefined" ? window : null,
    eventOptions,
  } = options;

  // Use useRef to store the latest callback without causing effect to re-run
  const callbackRef = useRef(cb);

  // Update ref when callback changes
  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  // Memoize the handler to avoid unnecessary re-renders
  const handler: EventListener = useCallback(
    (event: Event) => {
      if (!(event instanceof KeyboardEvent)) return;
      if (event.key === key) {
        callbackRef.current(event);
      }
    },
    [key],
  );

  useEffect(() => {
    if (!target) return;

    target.addEventListener(event, handler, eventOptions);

    return () => {
      target.removeEventListener(event, handler, eventOptions);
    };
  }, [event, target, handler, eventOptions]);
}
