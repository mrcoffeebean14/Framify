import { useState, useEffect } from 'react';

export type PermissionState = 'prompt' | 'granted' | 'denied' | 'loading';

export function usePermission() {
  const [state, setState] = useState<PermissionState>('loading');

  useEffect(() => {
    // Check if the browser supports the Permissions API
    if (!navigator.permissions || !navigator.permissions.query) {
      // iOS Safari didn't support camera permissions query reliably until recently.
      // We start in 'prompt' state to just try calling getUserMedia directly
      setState('prompt');
      return;
    }

    navigator.permissions.query({ name: 'camera' as PermissionName })
      .then((res) => {
        setState(res.state as PermissionState);
        res.onchange = () => {
          setState(res.state as PermissionState);
        };
      })
      .catch(() => {
        // Fallback for browsers that throw errors when querying 'camera'
        setState('prompt');
      });
  }, []);

  // Expose a manual override in case we catch a NotAllowedError from getUserMedia later
  return { permissionState: state, setPermissionState: setState };
}
