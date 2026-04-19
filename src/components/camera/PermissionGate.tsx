'use client';

import { ReactNode } from 'react';
import { usePermission } from '@/hooks/usePermission';
import { Camera } from 'lucide-react';

interface PermissionGateProps {
  children: ReactNode;
  onGrant?: () => void;
  isLoadingExt?: boolean;
}

export function PermissionGate({ children, onGrant, isLoadingExt }: PermissionGateProps) {
  const { permissionState } = usePermission();

  const handleGrant = () => {
    // Triggers parent to mount camera, thus prompting the user
    if (onGrant) onGrant();
  };

  if (permissionState === 'loading' || isLoadingExt) {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-black absolute inset-0 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // Modern browsers silently block the camera API if you are accessing it via 
  // HTTP instead of HTTPS (except for localhost). This tells the user exactly how to fix it locally.
  if (typeof window !== 'undefined' && !window.isSecureContext) {
    return (
      <div className="flex flex-col h-[100dvh] w-full items-center justify-center bg-black p-6 text-center absolute inset-0 z-50">
        <Camera className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Secure Connection Required</h2>
        <p className="text-gray-400 mb-6 text-sm max-w-sm mx-auto">
          Browsers automatically block camera access over insecure <code>http://</code> network IP addresses.
          <br /><br />
          <span className="text-white font-semibold">How to fix this:</span><br />
          1. Restart your <code>npm run dev</code> server.<br/>
          2. Use Chrome and go to <code className="bg-white/10 px-1 rounded">chrome://flags/#unsafely-treat-insecure-origin-as-secure</code>, enable it, and add your IP address to allow the camera to load.
        </p>
      </div>
    );
  }

  if (permissionState === 'denied') {
    return (
      <div className="flex flex-col h-[100dvh] w-full items-center justify-center bg-black p-6 text-center absolute inset-0 z-50">
        <Camera className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Camera Access Denied</h2>
        <p className="text-gray-400 mb-6 text-sm max-w-xs mx-auto">
          PosePerfect needs camera access to show you pose guides. Please enable it in your browser settings and refresh the page.
        </p>
      </div>
    );
  }

  // By rendering children when the state is 'prompt', the CameraView component 
  // will mount and execute getUserMedia(), causing the browser to natively prompt 
  // the user for camera access immediately on page load.
  return <>{children}</>;
}
