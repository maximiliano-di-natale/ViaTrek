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
