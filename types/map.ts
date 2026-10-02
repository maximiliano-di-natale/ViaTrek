export type TransportMode = 'bike' | 'moto' | 'trekking';

export type MapTypeOption = 'standard' | 'satellite' | 'terrain';

export type DifficultyLevel = 'Fácil' | 'Moderado' | 'Difícil' | 'Experto';

export type SurfaceType = 'Pavimento' | 'Ripio / Grava' | 'Tierra / Huella' | 'Sendero Técnico';

export type PoiCategory = 'trailhead' | 'viewpoint' | 'water' | 'repair';

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface RouteItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  modes: TransportMode[];
  distanceKm: number;
  elevationGainM: number;
  estimatedTimeMin: number;
  difficulty: DifficultyLevel;
  surfaceType: SurfaceType;
  color: string;
  strokeWidth: number;
  coordinates: LatLng[];
}

export interface PointOfInterest {
  id: string;
  name: string;
  category: PoiCategory;
  description: string;
  coordinate: LatLng;
  modes: TransportMode[];
  elevationM?: number;
  parkingAvailable?: boolean;
  waterAvailable?: boolean;
  addressOrReference: string;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
