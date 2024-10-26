import React from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { XCircle } from 'lucide-react';

interface QRScannerProps {
  onScanComplete: (result: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScanComplete, onClose }: QRScannerProps) {
  const handleDecode = (result: string) => {
    onScanComplete(result);
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <QrScanner
              onDecode={handleDecode}
              onError={handleError}
              containerStyle={{ padding: 0 }}
              videoStyle={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          
          {/* Scanning guide overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-indigo-500 animate-scan" />
          </div>
        </div>
        
        <div className="text-center mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Scan Container QR Code
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Point your camera at the container's QR code
          </p>
          <button
            onClick={onClose}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
          >
            <XCircle className="w-5 h-5" />
            <span>Close Scanner</span>
          </button>
        </div>
      </div>
    </div>
  );
}