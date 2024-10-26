import React, { useState } from 'react';
import { 
  Box, 
  QrCode, 
  ThermometerSun, 
  MapPin, 
  Shield, 
  View, 
  History,
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { QRScanner } from './components/QRScanner';

function App() {
  const [temperature, setTemperature] = useState(23.5);
  const [location, setLocation] = useState("Port of Singapore");
  const [isSecure, setIsSecure] = useState(true);
  const [showARView, setShowARView] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const events = [
    { timestamp: "2024-03-14 10:30:00", event: "Container sealed at origin", location: "Shanghai Port" },
    { timestamp: "2024-03-14 14:45:00", event: "Temperature check passed", location: "Shanghai Port" },
    { timestamp: "2024-03-14 18:20:00", event: "Departed port", location: "Shanghai Port" },
    { timestamp: "2024-03-15 09:15:00", event: "Arrived at checkpoint", location: "Port of Singapore" }
  ];

  const handleScanComplete = (result: string) => {
    setIsScanning(false);
    
    if (result && isSecure) {
      setShowARView(true);
      setTimeout(() => setShowARView(false), 3000);
      
      // Add scan event to blockchain log
      const newEvent = {
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        event: "QR Code verified successfully",
        location: location
      };
      events.unshift(newEvent);
    } else {
      alert("Access denied: Container tampering detected!");
    }
  };

  const simulateAlert = () => {
    const alerts = [
      "Temperature exceeded threshold: 28°C",
      "Unusual movement detected",
      "Container seal verification required"
    ];
    const newAlert = alerts[Math.floor(Math.random() * alerts.length)];
    setNotifications(prev => [newAlert, ...prev].slice(0, 5));
    setTemperature(prev => prev + 2);
    if (Math.random() > 0.5) {
      setIsSecure(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isScanning && (
        <QRScanner 
          onScanComplete={handleScanComplete}
          onClose={() => setIsScanning(false)}
        />
      )}

      {/* Header */}
      <header className="bg-indigo-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Box className="w-8 h-8" />
            <h1 className="text-2xl font-bold">SecureTrack™</h1>
          </div>
          <div className="relative">
            <Bell 
              className="w-6 h-6 cursor-pointer hover:text-indigo-200 transition-colors" 
              onClick={() => setNotifications([])}
            />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-center space-x-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                <p>{notification}</p>
              </div>
            ))}
          </div>
        )}

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
            <ThermometerSun className={`w-12 h-12 ${temperature > 25 ? 'text-red-500' : 'text-green-500'}`} />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Temperature</h2>
              <p className={`text-2xl font-bold ${temperature > 25 ? 'text-red-500' : 'text-green-500'}`}>
                {temperature.toFixed(1)}°C
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
            <MapPin className="w-12 h-12 text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Location</h2>
              <p className="text-2xl font-bold text-blue-500">{location}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
            <Shield className={`w-12 h-12 ${isSecure ? 'text-green-500' : 'text-red-500'}`} />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Security Status</h2>
              <div className="flex items-center space-x-2">
                {isSecure ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="text-green-500 font-semibold">Secure</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-500" />
                    <span className="text-red-500 font-semibold">Compromised</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AR View and Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Visual Verification</h2>
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              {showARView ? (
                <img 
                  src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800"
                  alt="AR View"
                  className="rounded-lg object-cover w-full h-full"
                />
              ) : (
                <View className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsScanning(true)}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <QrCode className="w-5 h-5" />
                <span>Scan QR Code</span>
              </button>
              <button
                onClick={simulateAlert}
                className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center space-x-2"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Simulate Alert</span>
              </button>
            </div>
          </div>

          {/* Blockchain Log */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <History className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-700">Blockchain Log</h2>
            </div>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="relative pl-4 pb-4 border-l-2 border-indigo-200 last:pb-0">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600" />
                  <p className="text-sm text-gray-500">{event.timestamp}</p>
                  <p className="font-medium text-gray-800">{event.event}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;