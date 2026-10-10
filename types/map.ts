export interface Coordinate {
  latitude: number;
  longitude: number;
}

// Alias compatible con react-native-maps y utilidades
export type LatLng = Coordinate;

export type RouteType = 'ciclovia' | 'sendero_mtb' | 'moto_trail' | 'wine_trail';

export type LegalityLevel = 'libre' | 'compartido_precaucion' | 'prohibido_motor' | 'circuito_enduro';

export interface TrailLegality {
  status: LegalityLevel;
  badgeText: string;
  tagColor: string;
  allowedModes: {
    trekking: boolean;
    bicycle: boolean;
    moto: boolean;
  };
  priorityRule: string;
  legalWarning?: string;
  authority: string;
}

export interface WineRouteInfo {
  wineries: string[];
  gravelType: 'Asfalto y Ripio Suave' | 'Caminos Rurales y Alamedas' | 'Senderos entre Viñas';
  recommendedBike: 'Gravel / MTB / Urbana Paseo';
  tastingPoints: string[];
  bikeFriendly: boolean;
}

export type ZondaAlertLevel = 'verde_optimo' | 'amarillo_precaucion' | 'naranja_alerta' | 'rojo_zonda_severo';

export interface ZondaWeatherInfo {
  alertLevel: ZondaAlertLevel;
  windSpeedKmh: number;
  gustSpeedKmh: number;
  temperatureC: number;
  humidityPercent: number;
  fireRisk: 'Bajo' | 'Moderado' | 'Alto' | 'Extremo';
  title: string;
  summary: string;
  recommendations: string[];
  updatedAt: string;
}

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
  legality: TrailLegality;
  wineInfo?: WineRouteInfo;
}

export interface ProtectedArea {
  id: string;
  name: string;
  shortName: string;
  category: 'reserva_natural' | 'parque_provincial' | 'circuito_enduro' | 'recreativo';
  status: LegalityLevel;
  authority: string;
  contactRanger: string;
  description: string;
  rules: string[];
  allowedModes: {
    trekking: boolean;
    bicycle: boolean;
    moto: boolean;
  };
  coordinates: Coordinate[];
  fillColor: string;
  strokeColor: string;
}

export interface ConvivenciaRuleItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  penaltyNote?: string;
}

export type POICategory =
  | 'trailhead'
  | 'hidratacion'
  | 'mirador'
  | 'taller'
  | 'bodega_wine'
  | 'refugio_almacen';

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
  affectedModes: RouteType[];
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
