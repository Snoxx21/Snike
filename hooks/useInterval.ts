import React from 'react';

export function useInterval(callback: () => void, delay: number | null) {
  // Fix: Initialize useRef with the callback to provide an initial value.
  // The no-argument version `useRef<() => void>()` was causing an error.
  const savedCallback = React.useRef(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
