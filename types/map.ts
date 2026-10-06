export interface Coordinate {
  latitude: number;
  longitude: number;
}

// Alias compatible con react-native-maps y utilidades
export type LatLng = Coordinate;

export type RouteType = 'ciclovia' | 'sendero_mtb' | 'moto_trail';

export interface RouteItem {
  id: string;
  name: string;
  zone: string;
  type: RouteType;
  distanceKm: number;
  elevationGainM: number;
  difficulty: 'Fácil' | 'Moderado' | 'Técnico';
  surface: 'Asfalto' | 'Ripio/Tierra' | 'Mixto';
  strokeColor: string;
  coordinates: Coordinate[];
}

export type POICategory = 'trailhead' | 'hidratacion' | 'mirador' | 'taller';

export interface POIItem {
  id: string;
  name: string;
  category: POICategory;
  latitude: number;
  longitude: number;
  description: string;
}

// Alias compatible
export type PointOfInterest = POIItem;

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export type MapTypeOption = 'standard' | 'satellite' | 'terrain' | 'high_contrast';

export type IncidentType =
  | 'landslide' // Derrumbe / Rocas sueltas
  | 'thorns'    // Rosetas / Espinas punzantes
  | 'water'     // Agua en huella / Vertiente / Cañadón
  | 'animals'   // Perros sueltos / Ganado
  | 'blocked'   // Paso cerrado / Tranquera / Obras
  | 'caution';  // Precaución general / Terreno erosionado

export type IncidentSeverity = 'baja' | 'media' | 'alta';

export interface TrailIncident {
  id: string;
  type: IncidentType;
  title: string;
  description: string;
  severity: IncidentSeverity;
  latitude: number;
  longitude: number;
  reportedAt: string;
  affectedModes: ('ciclovia' | 'sendero_mtb' | 'moto_trail')[];
  upvotes: number;
  resolvedVotes: number;
  author: string;
}

export interface SafetyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface MedicalProfile {
  fullName: string;
  bloodType: string;
  allergies: string;
  medicalNotes: string;
  emergencyContactPhone: string;
  healthInsurance: string;
}

export interface GuardianSession {
  isActive: boolean;
  destination: string;
  startedAt: number; // timestamp
  expectedReturnAt: number; // timestamp
  contactName: string;
  contactPhone: string;
}
