import { useEffect } from 'preact/hooks';

import { startClock } from '#src/time';

// Starts the shared clock for the lifetime of the component.
export const useClock = () => {
  useEffect(() => startClock(), []);
};
