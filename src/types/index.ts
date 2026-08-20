export type BinStatus = 'Normal (<85%)' | 'Alert (≥85%)' | 'Overflow (~100%)' | 'Critical' | 'Warning' | 'Optimal';
export type ServoDirection = 'LEFT (WET BIN)' | 'RIGHT (DRY BIN)' | 'CENTER (IDLE)';

export interface SmartBin {
  id: string;
  name: string;
  ward: string;
  area: string;
  lat: number;
  lng: number;
  
  // Hardware Prototype Sensors
  irSensorTriggered: boolean; // Item detection at entry
  moistureSensorValue: number; // Wet / Dry detection (0-1024)
  moistureAnalog?: number;
  isWetDetected: boolean;
  servoDirection: ServoDirection;
  
  // Dual Ultrasonic Sensors for Wet & Dry Containers
  wetBinFillLevel: number; // % fill level (0-100%)
  wetDistanceCm: number; // Ultrasonic Sensor (Wet Bin)
  dryBinFillLevel: number; // % fill level (0-100%)
  dryDistanceCm: number; // Ultrasonic Sensor (Dry Bin)
  
  fillLevel?: number;
  distanceCm?: number;
  wetPercentage?: number;
  dryPercentage?: number;

  // Hardware Alerts (LED & Buzzer)
  wetLedBuzzerOn: boolean; // Red LED + Buzzer
  dryLedBuzzerOn: boolean; // Yellow LED + Buzzer
  
  status: BinStatus;
  lastPing: string;
  assignedTruckId?: string;
}

export interface FleetTruck {
  id: string;
  plateNumber: string;
  driverName: string;
  driverPhone: string;
  capacityTons: number;
  currentPayloadTons: number;
  fuelPercentage: number;
  status: 'In-Transit' | 'Idle' | 'Maintenance' | 'Collecting';
  currentLat: number;
  currentLng: number;
  assignedRoute: string[];
  speedKmH: number;
}

export interface BlockchainReceipt {
  hash: string;
  blockNumber: number;
  timestamp: string;
  binId: string;
  weightKg: number;
  wasteType: 'Wet Organic' | 'Dry Recyclable';
  citizenAddress: string;
  tokensEarned: number;
  contractMethod: string;
  verified: boolean;
}

export interface CloudLog {
  id: string;
  timestamp: string;
  provider: 'ESP32 MQTT Broker' | 'AWS IoT Core' | 'Azure IoT Hub' | 'GCP PubSub';
  topic: string;
  deviceId: string;
  payload: Record<string, any>;
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
  latencyMs: number;
}

export interface Complaint {
  id: string;
  citizenName: string;
  phone: string;
  ward: string;
  location: string;
  issueType: 'Overflowing Bin' | 'Foul Odor' | 'Missed Collection' | 'Damaged Bin' | 'Illegal Dumping';
  description: string;
  imageUrl?: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  timestamp: string;
  upvotes: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Driver' | 'Sanitation Officer' | 'IoT Hardware Engineer' | 'Supervisor';
  wardAssigned: string;
  shift: 'Morning' | 'Evening' | 'Night';
  status: 'Active' | 'On Leave' | 'Off Shift';
  phone: string;
  rating: number;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  read: boolean;
}
