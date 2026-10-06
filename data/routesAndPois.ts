import { RouteItem, POIItem, MapRegion, TrailIncident, MedicalProfile } from '../types/map';

export const INITIAL_MENDOZA_REGION: MapRegion = {
  latitude: -32.8895,
  longitude: -68.8650,
  latitudeDelta: 0.16,
  longitudeDelta: 0.16,
};

export const MENDOZA_ROUTES: RouteItem[] = [
  {
    id: 'ciclovia-troncal-central',
    name: 'Ciclovía Troncal Godoy Cruz - Mendoza Capital',
    zone: 'Gran Mendoza',
    type: 'ciclovia',
    distanceKm: 7.2,
    elevationGainM: 45,
    difficulty: 'Fácil',
    surface: 'Asfalto',
    strokeColor: '#00E676', // Verde neón ultra visible
    coordinates: [
      { latitude: -32.9341, longitude: -68.8472 }, // Estación Benegas
      { latitude: -32.9235, longitude: -68.8465 }, // Parque San Vicente
      { latitude: -32.9150, longitude: -68.8450 }, // Paso Los Andes / Pellegrini
      { latitude: -32.9032, longitude: -68.8441 }, // Límite Godoy Cruz - Capital
      { latitude: -32.8955, longitude: -68.8430 }, // Parque Central / Estación Belgrano
      { latitude: -32.8830, longitude: -68.8385 }, // Nave Cultural
    ],
  },
  {
    id: 'ciclovia-parque-general-san-martin',
    name: 'Circuito Parque General San Martín & El Rosedal',
    zone: 'Ciudad de Mendoza',
    type: 'ciclovia',
    distanceKm: 6.5,
    elevationGainM: 90,
    difficulty: 'Fácil',
    surface: 'Asfalto',
    strokeColor: '#00E676',
    coordinates: [
      { latitude: -32.8885, longitude: -68.8620 }, // Portones del Parque
      { latitude: -32.8892, longitude: -68.8745 }, // Fuente de los Continentes
      { latitude: -32.8851, longitude: -68.8790 }, // Lago / El Rosedal
      { latitude: -32.8810, longitude: -68.8825 }, // Estadio Malvinas Argentinas
      { latitude: -32.8860, longitude: -68.8912 }, // Subida Base Cerro de la Gloria
    ],
  },
  {
    id: 'sendero-chacras-dique-frias',
    name: 'Huellas de Chacras & Cruce Dique Frías (MTB / Trekking)',
    zone: 'Luján de Cuyo / Godoy Cruz Precordillera',
    type: 'sendero_mtb',
    distanceKm: 12.4,
    elevationGainM: 380,
    difficulty: 'Moderado',
    surface: 'Ripio/Tierra',
    strokeColor: '#FF6D00', // Naranja eléctrico de montaña
    coordinates: [
      { latitude: -33.0035, longitude: -68.8920 }, // Entrada Senderos de Chacras
      { latitude: -32.9920, longitude: -68.9055 }, // Cruce de cañadones
      { latitude: -32.9780, longitude: -68.9150 }, // Puesto El Chappel
      { latitude: -32.9550, longitude: -68.9080 }, // Filo precordillerano
      { latitude: -32.9210, longitude: -68.8890 }, // Quebrada del Dique Frías
      { latitude: -32.9080, longitude: -68.8820 }, // Mirador Dique Frías
    ],
  },
  {
    id: 'sendero-cerro-arco-cumbre',
    name: 'Ascenso Clásico Cerro Arco',
    zone: 'Las Heras Precordillera',
    type: 'sendero_mtb',
    distanceKm: 4.8,
    elevationGainM: 520,
    difficulty: 'Técnico',
    surface: 'Ripio/Tierra',
    strokeColor: '#FF6D00',
    coordinates: [
      { latitude: -32.8420, longitude: -68.9240 }, // Base Puerta de la Quebrada
      { latitude: -32.8445, longitude: -68.9310 }, // Curva del tanque
      { latitude: -32.8465, longitude: -68.9375 }, // Zetas del filo intermedio
      { latitude: -32.8482, longitude: -68.9440 }, // Filo oeste
      { latitude: -32.8498, longitude: -68.9485 }, // Antenas Cumbre Cerro Arco
    ],
  },
  {
    id: 'ruta-moto-villavicencio-caracoles',
    name: 'Ruta Histórica Caracoles de Villavicencio (RP 52)',
    zone: 'Las Heras / Precordillera Alta',
    type: 'moto_trail',
    distanceKm: 28.0,
    elevationGainM: 1100,
    difficulty: 'Moderado',
    surface: 'Mixto',
    strokeColor: '#2979FF', // Azul vibrante para motos/vehicular
    coordinates: [
      { latitude: -32.5310, longitude: -69.0180 }, // Hotel Termas de Villavicencio
      { latitude: -32.5220, longitude: -69.0350 }, // Inicio de Caracoles
      { latitude: -32.5110, longitude: -69.0520 }, // Mirador El Balcón
      { latitude: -32.4980, longitude: -69.0730 }, // Curvas de herradura
      { latitude: -32.4820, longitude: -69.0980 }, // Cruz de Paramillos (Punto más alto)
    ],
  },
];

export const MENDOZA_POIS: POIItem[] = [
  {
    id: 'poi-estacion-benegas',
    name: 'Estación Benegas (Punto Seguro & Servicios)',
    category: 'taller',
    latitude: -32.9341,
    longitude: -68.8472,
    description: 'Punto de hidratación, estación de inflado y encuentro de ciclovía.',
  },
  {
    id: 'poi-portones-parque',
    name: 'Portones del Parque San Martín',
    category: 'trailhead',
    latitude: -32.8885,
    longitude: -68.8620,
    description: 'Acceso principal al circuito de ciclovías y subida al Cerro de la Gloria.',
  },
  {
    id: 'poi-puerta-quebrada',
    name: 'Base Cerro Arco (Puerta de la Quebrada)',
    category: 'trailhead',
    latitude: -32.8420,
    longitude: -68.9240,
    description: 'Estacionamiento, puesto de hidratación y punto de inicio para Cerro Arco y Santo Tomás.',
  },
  {
    id: 'poi-chacras-entrada',
    name: 'Entrada Senderos de Chacras',
    category: 'trailhead',
    latitude: -33.0035,
    longitude: -68.8920,
    description: 'Punto de partida tradicional para circuitos de mountain bike y trail running.',
  },
  {
    id: 'poi-mirador-cerro-gloria',
    name: 'Mirador Monumento Cerro de la Gloria',
    category: 'mirador',
    latitude: -32.8868,
    longitude: -68.8930,
    description: 'Mirador panorámico con vista a la Ciudad de Mendoza y Parque San Martín.',
  },
];

// Estilo de mapa de alto contraste (Dark Neón) optimizado para Google Maps
export const HIGH_CONTRAST_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#10141d' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#10141d' }, { weight: 3 }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#f1f5f9' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#0d221c' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#34d399' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#0f172a' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#334155' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#0f172a' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#cbd5e1' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#081320' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#38bdf8' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#081320' }] },
];

export const INITIAL_INCIDENTS: TrailIncident[] = [
  {
    id: 'inc-cerro-arco-derrumbe',
    type: 'landslide',
    title: 'Derrumbe de piedras en curva 3',
    description: 'Piedras sueltas y desmoronamiento de ladera tras la lluvia. Precaución con motos de enduro y bicis en la bajada rápida.',
    severity: 'media',
    latitude: -32.8445,
    longitude: -68.9180,
    reportedAt: 'Hace 2 horas',
    affectedModes: ['sendero_mtb', 'moto_trail'],
    upvotes: 7,
    resolvedVotes: 1,
    author: 'Facundo MTB',
  },
  {
    id: 'inc-chacras-rosetas',
    type: 'thorns',
    title: 'Sector con rosetas / espinas abundantes',
    description: 'Mucho cadillo y espinas en el cañadón seco. Obligatorio líquido tubeless o sellador en cámaras.',
    severity: 'alta',
    latitude: -32.9880,
    longitude: -68.9080,
    reportedAt: 'Hace 4 horas',
    affectedModes: ['sendero_mtb'],
    upvotes: 14,
    resolvedVotes: 0,
    author: 'Mendoza Trail Club',
  },
  {
    id: 'inc-crucesita-vertiente',
    type: 'water',
    title: 'Vertiente natural activa con agua limpia',
    description: 'Caudal excelente y fresco en la bajada de la vertiente. Excelente para recargar botellas.',
    severity: 'baja',
    latitude: -32.9645,
    longitude: -68.9790,
    reportedAt: 'Hoy 09:30',
    affectedModes: ['sendero_mtb', 'moto_trail'],
    upvotes: 9,
    resolvedVotes: 0,
    author: 'Lucía Trekking',
  },
  {
    id: 'inc-ciclovia-obras',
    type: 'blocked',
    title: 'Obras de repavimentación y paso angosto',
    description: 'Vallas amarillas reduciendo el carril de ciclovía por poda y bacheo municipal. Reducir velocidad.',
    severity: 'media',
    latitude: -32.9030,
    longitude: -68.8442,
    reportedAt: 'Hace 1 hora',
    affectedModes: ['ciclovia'],
    upvotes: 5,
    resolvedVotes: 0,
    author: 'Seba Urbano',
  },
  {
    id: 'inc-challao-perros',
    type: 'animals',
    title: 'Perros de puesto sueltos en huella',
    description: 'Tres perros pastores ladrando a motociclistas y corredores en la entrada del puesto.',
    severity: 'alta',
    latitude: -32.8390,
    longitude: -68.9240,
    reportedAt: 'Ayer',
    affectedModes: ['sendero_mtb', 'moto_trail'],
    upvotes: 11,
    resolvedVotes: 2,
    author: 'Guille Enduro',
  },
];

export const MENDOZA_EMERGENCY_NUMBERS = [
  { name: '911 Emergencias Mendoza', number: '911', desc: 'Policía, Ambulancia y Bomberos' },
  { name: 'Patrulla de Rescate de Alta Montaña (UPRAM)', number: '2614444444', desc: 'Policía de Mendoza - Rescate en Cerros y Cordillera' },
  { name: 'Defensa Civil Mendoza', number: '103', desc: 'Emergencias climáticas, Zonda y aluviones' },
  { name: 'Bomberos Mendoza', number: '100', desc: 'Rescate urbano y forestal' },
];

export const DEFAULT_MEDICAL_PROFILE: MedicalProfile = {
  fullName: 'Maximiliano Di Natale',
  bloodType: 'O+',
  allergies: 'Ninguna conocida',
  medicalNotes: 'Sin antecedentes cardíacos. Deportista habitual.',
  emergencyContactPhone: '+5492615551234',
  healthInsurance: 'OSDE / Particular',
};
