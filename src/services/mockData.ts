import { SmartBin, FleetTruck, BlockchainReceipt, CloudLog, Complaint, StaffMember, SystemNotification } from '../types';

export const initialSmartBins: SmartBin[] = [
  {
    id: 'BIN-DEL-101',
    name: 'Connaught Place Outer Circle',
    ward: 'Ward 1 - Connaught Place',
    area: 'Central Delhi',
    lat: 28.6315,
    lng: 77.2167,
    irSensorTriggered: true,
    moistureSensorValue: 820,
    isWetDetected: true,
    servoDirection: 'LEFT (WET BIN)',
    wetBinFillLevel: 92,
    wetDistanceCm: 8,
    dryBinFillLevel: 45,
    dryDistanceCm: 65,
    wetLedBuzzerOn: true, // Red LED + Buzzer Active
    dryLedBuzzerOn: false,
    status: 'Alert (≥85%)',
    lastPing: '2 mins ago',
    assignedTruckId: 'TRK-DEL-01'
  },
  {
    id: 'BIN-DEL-102',
    name: 'Chandni Chowk Main Market',
    ward: 'Ward 2 - Chandni Chowk',
    area: 'North Delhi',
    lat: 28.6506,
    lng: 77.2303,
    irSensorTriggered: false,
    moistureSensorValue: 190,
    isWetDetected: false,
    servoDirection: 'RIGHT (DRY BIN)',
    wetBinFillLevel: 35,
    wetDistanceCm: 75,
    dryBinFillLevel: 88,
    dryDistanceCm: 12,
    wetLedBuzzerOn: false,
    dryLedBuzzerOn: true, // Yellow LED + Buzzer Active
    status: 'Alert (≥85%)',
    lastPing: '1 min ago',
    assignedTruckId: 'TRK-DEL-02'
  },
  {
    id: 'BIN-DEL-103',
    name: 'Lajpat Nagar Central Market',
    ward: 'Ward 3 - Lajpat Nagar',
    area: 'South Delhi',
    lat: 28.5677,
    lng: 77.2433,
    irSensorTriggered: false,
    moistureSensorValue: 512,
    isWetDetected: true,
    servoDirection: 'CENTER (IDLE)',
    wetBinFillLevel: 42,
    wetDistanceCm: 68,
    dryBinFillLevel: 38,
    dryDistanceCm: 72,
    wetLedBuzzerOn: false,
    dryLedBuzzerOn: false,
    status: 'Normal (<85%)',
    lastPing: '5 mins ago'
  },
  {
    id: 'BIN-DEL-104',
    name: 'Cyber City Hub Gate 3',
    ward: 'Ward 4 - DLF Cyber City',
    area: 'Gurugram Sector 24',
    lat: 28.4950,
    lng: 77.0895,
    irSensorTriggered: true,
    moistureSensorValue: 180,
    isWetDetected: false,
    servoDirection: 'RIGHT (DRY BIN)',
    wetBinFillLevel: 55,
    wetDistanceCm: 50,
    dryBinFillLevel: 78,
    dryDistanceCm: 25,
    wetLedBuzzerOn: false,
    dryLedBuzzerOn: false,
    status: 'Normal (<85%)',
    lastPing: '3 mins ago'
  },
  {
    id: 'BIN-DEL-105',
    name: 'Hauz Khas Village Entrance',
    ward: 'Ward 5 - Hauz Khas',
    area: 'South Delhi',
    lat: 28.5494,
    lng: 77.2001,
    irSensorTriggered: true,
    moistureSensorValue: 890,
    isWetDetected: true,
    servoDirection: 'LEFT (WET BIN)',
    wetBinFillLevel: 98,
    wetDistanceCm: 3,
    dryBinFillLevel: 40,
    dryDistanceCm: 70,
    wetLedBuzzerOn: true, // Red LED + Buzzer Active
    dryLedBuzzerOn: false,
    status: 'Overflow (~100%)',
    lastPing: '4 mins ago',
    assignedTruckId: 'TRK-DEL-01'
  }
];

export const initialFleetTrucks: FleetTruck[] = [
  {
    id: 'TRK-DEL-01',
    plateNumber: 'DL-01-GA-4892',
    driverName: 'Rajesh Kumar Sharma',
    driverPhone: '+91 98765 43210',
    capacityTons: 8.5,
    currentPayloadTons: 5.8,
    fuelPercentage: 74,
    status: 'Collecting',
    currentLat: 28.6250,
    currentLng: 77.2100,
    assignedRoute: ['BIN-DEL-101', 'BIN-DEL-105'],
    speedKmH: 28
  },
  {
    id: 'TRK-DEL-02',
    plateNumber: 'DL-02-GB-9104',
    driverName: 'Suresh Chandra Pal',
    driverPhone: '+91 98123 87654',
    capacityTons: 10.0,
    currentPayloadTons: 7.2,
    fuelPercentage: 62,
    status: 'In-Transit',
    currentLat: 28.6480,
    currentLng: 77.2250,
    assignedRoute: ['BIN-DEL-102'],
    speedKmH: 36
  }
];

export const initialBlockchainReceipts: BlockchainReceipt[] = [
  {
    hash: '0x8f3c1a4e7b...9d01',
    blockNumber: 18492041,
    timestamp: '2026-08-18 23:20:15',
    binId: 'BIN-DEL-101',
    weightKg: 42.5,
    wasteType: 'Wet Organic',
    citizenAddress: '0x71C...39A2',
    tokensEarned: 425,
    contractMethod: 'recordRecyclingWeight',
    verified: true
  },
  {
    hash: '0x2b9f71c4d9...11e8',
    blockNumber: 18492038,
    timestamp: '2026-08-18 23:14:40',
    binId: 'BIN-DEL-102',
    weightKg: 18.0,
    wasteType: 'Dry Recyclable',
    citizenAddress: '0x39E...88B1',
    tokensEarned: 180,
    contractMethod: 'recordRecyclingWeight',
    verified: true
  }
];

export const initialCloudLogs: CloudLog[] = [
  {
    id: 'LOG-9901',
    timestamp: '23:28:45',
    provider: 'ESP32 MQTT Broker',
    topic: 'swachh/esp32/bin-101/telemetry',
    deviceId: 'BIN-DEL-101',
    payload: { 
      ir_detected: 1, 
      moisture_raw: 820, 
      servo_pos: "LEFT_WET", 
      wet_ultrasonic_cm: 8, 
      wet_fill_pct: 92, 
      dry_ultrasonic_cm: 65, 
      dry_fill_pct: 45, 
      red_led_buzzer: 1 
    },
    status: 'SUCCESS',
    latencyMs: 18
  },
  {
    id: 'LOG-9902',
    timestamp: '23:27:12',
    provider: 'ESP32 MQTT Broker',
    topic: 'swachh/esp32/bin-102/telemetry',
    deviceId: 'BIN-DEL-102',
    payload: { 
      ir_detected: 0, 
      moisture_raw: 190, 
      servo_pos: "RIGHT_DRY", 
      wet_ultrasonic_cm: 75, 
      wet_fill_pct: 35, 
      dry_ultrasonic_cm: 12, 
      dry_fill_pct: 88, 
      yellow_led_buzzer: 1 
    },
    status: 'SUCCESS',
    latencyMs: 24
  }
];

export const initialComplaints: Complaint[] = [
  {
    id: 'CMP-2026-081',
    citizenName: 'Priya Mukherjee',
    phone: '+91 98112 33445',
    ward: 'Ward 1 - Connaught Place',
    location: 'Near Block C Gate 2',
    issueType: 'Overflowing Bin',
    description: 'Smart bin BIN-DEL-101 Wet Bin Red LED & Buzzer active (92% full).',
    status: 'In Progress',
    timestamp: 'Today, 21:15',
    upvotes: 14
  }
];

export const initialNotifications: SystemNotification[] = [
  {
    id: 'NTF-1',
    title: 'CRITICAL OVERFLOW ALERT: Wet Bin BIN-DEL-101 (≥85%)',
    message: 'Wet Bin Ultrasonic measured 8 cm (92% Fill). Red LED & Buzzer ON! Emergency Truck TRK-DEL-01 dispatched.',
    timestamp: '23:25 PM',
    type: 'critical',
    read: false
  },
  {
    id: 'NTF-2',
    title: 'OVERFLOW ALERT: Dry Bin BIN-DEL-102 (≥85%)',
    message: 'Dry Bin Ultrasonic measured 12 cm (88% Fill). Yellow LED & Buzzer ON!',
    timestamp: '23:18 PM',
    type: 'warning',
    read: false
  }
];

export const initialStaff: StaffMember[] = [
  {
    id: 'EMP-101',
    name: 'Rajesh Kumar Sharma',
    role: 'Driver',
    wardAssigned: 'Ward 1 - Connaught Place',
    shift: 'Morning',
    status: 'Active',
    phone: '+91 98765 43210',
    rating: 4.9
  },
  {
    id: 'EMP-102',
    name: 'Pooja Rani',
    role: 'IoT Hardware Engineer',
    wardAssigned: 'All Wards (ESP32 & Sensors)',
    shift: 'Morning',
    status: 'Active',
    phone: '+91 98888 11223',
    rating: 5.0
  }
];
