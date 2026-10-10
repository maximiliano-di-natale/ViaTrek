import {
  RouteItem,
  POIItem,
  MapRegion,
  TrailIncident,
  MedicalProfile,
  ProtectedArea,
  ConvivenciaRuleItem,
  ZondaWeatherInfo,
  WineRouteInfo,
} from '../types/map';

export const INITIAL_MENDOZA_REGION: MapRegion = {
  latitude: -32.8895,
  longitude: -68.8650,
  latitudeDelta: 0.16,
  longitudeDelta: 0.16,
};

export const INITIAL_ZONDA_WEATHER: ZondaWeatherInfo = {
  alertLevel: 'amarillo_precaucion',
  windSpeedKmh: 35,
  gustSpeedKmh: 68,
  temperatureC: 29,
  humidityPercent: 12,
  fireRisk: 'Extremo',
  title: 'Alerta Preventiva por Viento Zonda en Precordillera',
  summary: 'Ráfagas descendentes registradas en Potrerillos y Uspallata. Se prevé descenso progresivo al llano y quebradas en las próximas horas.',
  recommendations: [
    'Descender de filos y cumbres expuestas (Cerro Arco, Santo Tomás) antes del pico de ráfagas.',
    'Evitar senderos bajo arboledas viejas (eucaliptos y álamos con ramas quebradizas).',
    'Llevar reserva doble de hidratación (la humedad del 12% deshidrata rápidamente).',
    'Prohibición total de cualquier tipo de fuego (Riesgo Extremo de Incendio Forestal).',
    'En bicicleta o moto: cuidado extremo con ráfagas cruzadas en tramos abiertos.',
  ],
  updatedAt: 'Hoy 16:30 • Red Estaciones SMN Mendoza',
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
    legality: {
      status: 'libre',
      badgeText: '🟢 Libre Multimodal',
      tagColor: '#00E676',
      allowedModes: { trekking: true, bicycle: true, moto: false },
      priorityRule: 'Peatones tienen paso prioritario en cruces señalizados. Bicis máx 25 km/h.',
      legalWarning: 'Prohibida la circulación de motos a combustión en carriles de ciclovía (Ley 9024).',
      authority: 'Municipios de Godoy Cruz y Ciudad de Mendoza',
    },
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
    legality: {
      status: 'libre',
      badgeText: '🟢 Parque Recreativo',
      tagColor: '#00E676',
      allowedModes: { trekking: true, bicycle: true, moto: false },
      priorityRule: 'Zona de paseo familiar: prioridad absoluta al peatón y deportistas a pie en Rosedal y Lago.',
      authority: 'Dirección de Parques y Paseos Públicos de Mendoza',
    },
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
    legality: {
      status: 'compartido_precaucion',
      badgeText: '🟡 Mixto: Peatón Prioritario',
      tagColor: '#FFD600',
      allowedModes: { trekking: true, bicycle: true, moto: false },
      priorityRule: 'Senderos angostos: la bicicleta debe descender velocidad a paso de hombre al toparse con caminantes.',
      legalWarning: 'Prohibido ingreso de motos de enduro para evitar la erosión hídrica de cañadones aluvionales.',
      authority: 'Municipio de Luján de Cuyo & Comunidad de Senderistas',
    },
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
    legality: {
      status: 'compartido_precaucion',
      badgeText: '🟡 Camino de Servicio Mixto',
      tagColor: '#FFD600',
      allowedModes: { trekking: true, bicycle: true, moto: true },
      priorityRule: 'Camino de mantenimiento: velocidad máx 20 km/h para motos/4x4. Prohibido salirse de la huella hacia las laderas.',
      legalWarning: 'Prohibido acelerar o derrapar en curvas; prioridad constante al senderista que sube a pie.',
      authority: 'Municipalidad de Las Heras',
    },
  },
  {
    id: 'sendero-divisadero-largo',
    name: 'Quebrada de Divisadero Largo (Reserva Protegida)',
    zone: 'Las Heras / Ciudad',
    type: 'sendero_mtb',
    distanceKm: 5.6,
    elevationGainM: 260,
    difficulty: 'Moderado',
    surface: 'Ripio/Tierra',
    strokeColor: '#FF1744', // Rojo alerta ecológica
    coordinates: [
      { latitude: -32.8760, longitude: -68.9020 }, // Centro de Informes Guardaparques
      { latitude: -32.8730, longitude: -68.9110 }, // Falla geológica Divisadero
      { latitude: -32.8705, longitude: -68.9190 }, // Mirador Cascada Seca
      { latitude: -32.8680, longitude: -68.9270 }, // Quebrada de los fósiles
      { latitude: -32.8650, longitude: -68.9340 }, // Límite oeste reserva
    ],
    legality: {
      status: 'prohibido_motor',
      badgeText: '🔴 Reserva Ecológica - Prohibido Motor',
      tagColor: '#FF1744',
      allowedModes: { trekking: true, bicycle: true, moto: false },
      priorityRule: 'Área Natural Protegida. Registro obligatorio en Centro de Guardaparques. Prohibido salirse del sendero.',
      legalWarning: 'Ley Provincial 6045: Totalmente prohibido el ingreso de motos, cuatriciclos y vehículos a combustión. Multas severas y secuestro vehicular.',
      authority: 'Cuerpo de Guardaparques de Mendoza (DRNR)',
    },
  },
  {
    id: 'circuito-enduro-el-challao',
    name: 'Circuito Enduro & Huellas El Challao / Puesto El Chulengo',
    zone: 'Las Heras Precordillera',
    type: 'moto_trail',
    distanceKm: 14.5,
    elevationGainM: 410,
    difficulty: 'Técnico',
    surface: 'Ripio/Tierra',
    strokeColor: '#2979FF',
    coordinates: [
      { latitude: -32.8360, longitude: -68.9260 }, // Entrada El Challao Puesto
      { latitude: -32.8290, longitude: -68.9340 }, // Cañadón de ripio
      { latitude: -32.8210, longitude: -68.9400 }, // Subida de piedras El Chulengo
      { latitude: -32.8140, longitude: -68.9460 }, // Filo precordillerano norte
      { latitude: -32.8080, longitude: -68.9540 }, // Bajada técnica
      { latitude: -32.8010, longitude: -68.9610 }, // Huella vehicular abierta
    ],
    legality: {
      status: 'circuito_enduro',
      badgeText: '🔵 Circuito Enduro Habilitado',
      tagColor: '#2979FF',
      allowedModes: { trekking: false, bicycle: true, moto: true },
      priorityRule: 'Circuito tradicional para entrenamiento de motociclismo. Bicis y peatones circular con extrema precaución.',
      legalWarning: 'Obligatorio uso de casco integral homologado y escape reglamentario. Respetar alambrados de puestos.',
      authority: 'Comunidad Enduro Mendoza / Las Heras',
    },
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
    legality: {
      status: 'circuito_enduro',
      badgeText: '🔵 Ruta Vehicular RP 52',
      tagColor: '#2979FF',
      allowedModes: { trekking: true, bicycle: true, moto: true },
      priorityRule: 'Ruta provincial de ripio. Vehículos en ascenso tienen prioridad de paso en las 365 curvas.',
      legalWarning: 'Reserva Natural Villavicencio: velocidad máx 40 km/h. Prohibido salir del camino hacia la flora protegida.',
      authority: 'Dirección Provincial de Vialidad & Reserva Villavicencio',
    },
  },
  {
    id: 'ruta-wine-chacras-vistalba',
    name: 'Circuito Wine & Trail: Viñedos de Chacras & Vistalba',
    zone: 'Luján de Cuyo (Tierra del Malbec)',
    type: 'wine_trail',
    distanceKm: 16.8,
    elevationGainM: 110,
    difficulty: 'Fácil',
    surface: 'Mixto',
    strokeColor: '#E91E63', // Rosa malbec vibrante
    coordinates: [
      { latitude: -33.0010, longitude: -68.8870 }, // Plaza Chacras de Coria
      { latitude: -33.0120, longitude: -68.8810 }, // Callejón de las Bodegas
      { latitude: -33.0240, longitude: -68.8750 }, // Bodega Nieto Senetiner
      { latitude: -33.0360, longitude: -68.8680 }, // Kaiken & Viñedos Vistalba
      { latitude: -33.0480, longitude: -68.8620 }, // Finca Las Compuertas
      { latitude: -33.0550, longitude: -68.8550 }, // Río Mendoza / Compuertas
    ],
    legality: {
      status: 'libre',
      badgeText: '🍷 Ruta Enoturística Abierta',
      tagColor: '#E91E63',
      allowedModes: { trekking: true, bicycle: true, moto: false },
      priorityRule: 'Cicloturismo y caminatas rurales entre viñedos. Prioridad al peatón en callejones vecinales.',
      authority: 'Municipalidad de Luján de Cuyo & Bodegas de Mendoza',
    },
    wineInfo: {
      wineries: ['Bodega Nieto Senetiner', 'Bodega Kaiken', 'Finca Las Compuertas', 'Pulmary Orgánica'],
      gravelType: 'Caminos Rurales y Alamedas',
      recommendedBike: 'Gravel / MTB / Urbana Paseo',
      tastingPoints: ['Espacio Kaiken Wine Garden', 'Almacén de Chacras'],
      bikeFriendly: true,
    },
  },
  {
    id: 'ruta-wine-maipu-caminos',
    name: 'Caminos del Vino de Maipú: Olivos & Bodegas Centenarias',
    zone: 'Maipú Primera Zona Vitivinícola',
    type: 'wine_trail',
    distanceKm: 14.2,
    elevationGainM: 40,
    difficulty: 'Fácil',
    surface: 'Asfalto',
    strokeColor: '#E91E63',
    coordinates: [
      { latitude: -32.9780, longitude: -68.7850 }, // Estación Gutiérrez / Metrotranvía
      { latitude: -32.9860, longitude: -68.7750 }, // Museo del Vino Giol
      { latitude: -32.9990, longitude: -68.7610 }, // Bodega Trapiche / Ozamis
      { latitude: -33.0110, longitude: -68.7520 }, // Olivícola Pasrai
      { latitude: -33.0220, longitude: -68.7450 }, // Bodega Cecchin Orgánica
    ],
    legality: {
      status: 'libre',
      badgeText: '🍷 Ciclovía del Vino Maipú',
      tagColor: '#E91E63',
      allowedModes: { trekking: true, bicycle: true, moto: false },
      priorityRule: 'Ciclovía turística y calzada compartida. Convivencia con cicloturistas y visitantes internacionales.',
      authority: 'Municipalidad de Maipú',
    },
    wineInfo: {
      wineries: ['Bodega Trapiche', 'Bodega Giol Histórica', 'Familia Cecchin', 'Olivícola Pasrai'],
      gravelType: 'Asfalto y Ripio Suave',
      recommendedBike: 'Gravel / MTB / Urbana Paseo',
      tastingPoints: ['Trapiche Wine Bar', 'Jardín de Olivos Pasrai'],
      bikeFriendly: true,
    },
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
  {
    id: 'poi-bodega-kaiken',
    name: 'Bodega Kaiken (Bicicletero & Jardín Enoturístico)',
    category: 'bodega_wine',
    latitude: -33.0360,
    longitude: -68.8680,
    description: 'Estación de recarga de agua para ciclistas, bicicleteros seguros, copas al paso y vista a la Cordillera de los Andes.',
  },
  {
    id: 'poi-bodega-trapiche',
    name: 'Bodega Trapiche (Edificio Histórico 1912 & Wine Bar)',
    category: 'bodega_wine',
    latitude: -32.9990,
    longitude: -68.7610,
    description: 'Parada clásica de cicloturismo en Maipú. Arquitectura florentina, estación de inflado y jardines con olivos.',
  },
  {
    id: 'poi-almacen-chacras',
    name: 'Pulpería & Almacén de Montaña El Puesto',
    category: 'refugio_almacen',
    latitude: -33.0020,
    longitude: -68.8890,
    description: 'Abastecimiento de frutas secas, empanadas mendocinas, agua mineral y bebidas isotónicas para deportistas.',
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

export const MENDOZA_PROTECTED_AREAS: ProtectedArea[] = [
  {
    id: 'reserva-divisadero-largo',
    name: 'Reserva Natural Divisadero Largo',
    shortName: 'Reserva Divisadero',
    category: 'reserva_natural',
    status: 'prohibido_motor',
    authority: 'Cuerpo de Guardaparques de Mendoza (DRNR)',
    contactRanger: '2614257065',
    description: 'Área natural protegida de alto valor geológico, paleontológico y botánico. Alberga fósiles de más de 200 millones de años.',
    rules: [
      '🚫 Terminantemente prohibido el ingreso de motos de enduro, cuatriciclos y vehículos a combustión (Ley 6045).',
      '🥾 Registro obligatorio en seccional de Guardaparques antes de iniciar el sendero.',
      '🗑️ Prohibido arrojar residuos o restos orgánicos.',
      '🔥 Prohibido encender fuego en toda la reserva.',
      '🐕 No se permite el ingreso con animales domésticos.',
    ],
    allowedModes: {
      trekking: true,
      bicycle: true,
      moto: false,
    },
    fillColor: 'rgba(255, 23, 68, 0.16)',
    strokeColor: '#FF1744',
    coordinates: [
      { latitude: -32.8620, longitude: -68.9480 },
      { latitude: -32.8610, longitude: -68.8980 },
      { latitude: -32.8800, longitude: -68.8940 },
      { latitude: -32.8840, longitude: -68.9450 },
    ],
  },
  {
    id: 'parque-san-martin',
    name: 'Parque General San Martín (Zona Recreativa)',
    shortName: 'Parque San Martín',
    category: 'parque_provincial',
    status: 'libre',
    authority: 'Dirección de Parques y Paseos Públicos de Mendoza',
    contactRanger: '2614495555',
    description: 'Principal pulmón verde urbano del Gran Mendoza con más de 17 km de ciclovías y paseos peatonales.',
    rules: [
      '🚴 Ciclovías exclusivas para bicicletas y monopatines no motorizados.',
      '🥾 Prioridad de paso peatonal en todos los cruces y rotondas.',
      '🚫 Motos a combustión prohibidas en senderos internos y ciclovías (solo calzadas vehiculares).',
      '🗑️ Utilizar los puntos limpios y cestos clasificadores.',
    ],
    allowedModes: {
      trekking: true,
      bicycle: true,
      moto: false,
    },
    fillColor: 'rgba(0, 230, 118, 0.12)',
    strokeColor: '#00E676',
    coordinates: [
      { latitude: -32.8780, longitude: -68.8600 },
      { latitude: -32.8790, longitude: -68.8950 },
      { latitude: -32.8940, longitude: -68.8950 },
      { latitude: -32.8930, longitude: -68.8600 },
    ],
  },
  {
    id: 'circuito-enduro-challao',
    name: 'Sector de Huellas y Enduro El Challao / Puesto El Chulengo',
    shortName: 'Enduro El Challao',
    category: 'circuito_enduro',
    status: 'circuito_enduro',
    authority: 'Comunidad Enduro Mendoza / Las Heras',
    contactRanger: '2614815460',
    description: 'Circuito tradicional sobre lechos secos y huellas precordilleranas autorizadas para entrenamiento deportivo de motos.',
    rules: [
      '🏍️ Tránsito motorizado autorizado únicamente sobre huellas abiertas y lechos secos.',
      '🚫 No abrir huellas nuevas que generen erosión sobre laderas vírgenes.',
      '🛡️ Uso obligatorio de casco homologado, pechera y botas de protección.',
      '🔇 Prohibido escape libre no reglamentario.',
      '🥾 Reducir la velocidad al cruzarse con senderistas o ciclistas.',
    ],
    allowedModes: {
      trekking: false,
      bicycle: true,
      moto: true,
    },
    fillColor: 'rgba(41, 121, 255, 0.14)',
    strokeColor: '#2979FF',
    coordinates: [
      { latitude: -32.7980, longitude: -68.9680 },
      { latitude: -32.8020, longitude: -68.9200 },
      { latitude: -32.8380, longitude: -68.9180 },
      { latitude: -32.8360, longitude: -68.9680 },
    ],
  },
];

export const MENDOZA_CONVIVENCIA_RULES: ConvivenciaRuleItem[] = [
  {
    id: 'regla-peaton-primero',
    icon: '🥾',
    title: '1. El Peatón Siempre Tiene Paso Prioritario',
    description: 'En senderos de montaña compartidos, la persona a pie o corriendo tiene derecho de paso sobre la bicicleta y la moto. En pasos ciegos o angostos, la bicicleta debe descender o bajar la velocidad a paso de hombre.',
  },
  {
    id: 'regla-no-huellas-clandestinas',
    icon: '🚫',
    title: '2. Prohibido Abrir Atajos y Huellas Clandestinas',
    description: 'Cortar las "zetas" de los cerros destruye la jarilla y el estrato vegetal. En tormentas de verano, esas líneas clandestinas se convierten en cárcavas aluvionales que arrasan la montaña.',
    penaltyNote: 'Ley Provincial 6045: multas económicas y sanciones ambientales por degradación del suelo.',
  },
  {
    id: 'regla-motos-circuitos-habilitados',
    icon: '🏍️',
    title: '3. Motos Solo en Circuitos y Huellas Autorizadas',
    description: 'El motocross y enduro están estrictamente prohibidos en Reservas Naturales (Divisadero Largo, Villavicencio, Cordón del Plata) y senderos de trekking de Chacras. Utilizar exclusivamente circuitos habilitados como El Challao o rutas provinciales de ripio (RP 52).',
    penaltyNote: 'Policía Rural y Guardaparques proceden al secuestro directo del rodado y multas severas.',
  },
  {
    id: 'regla-no-dejes-rastro',
    icon: '🎒',
    title: '4. Filosofía "No Dejes Rastro" (Basura Cero)',
    description: 'Todo lo que sube a la montaña, baja con vos. Envoltorios de geles energéticos, cámaras pinchadas, colillas y botellas deben regresar en tu mochila. No enterrar residuos.',
  },
  {
    id: 'regla-mascotas-correa',
    icon: '🐕',
    title: '5. Mascotas Controladas con Correa',
    description: 'En la precordillera mendocina habitan zorros grises, águilas moras y ofidios (yarará ñata). Llevar a los perros atados evita peleas con fauna autóctona y accidentes con otros deportistas.',
  },
];

export const MENDOZA_RANGER_CONTACTS = [
  {
    title: 'Cuerpo de Guardaparques de Mendoza (DRNR)',
    phone: '2614252090',
    address: 'Parque General San Martín, Mendoza',
    note: 'Consultas sobre permisos, estado de reservas y senderos habilitados',
  },
  {
    title: 'Destacamento Guardaparques Divisadero Largo',
    phone: '2614257065',
    address: 'Ruta Papagallos s/n, Las Heras',
    note: 'Registro de ingreso y emergencias en reserva Divisadero',
  },
  {
    title: 'Policía Rural de Mendoza (Control de Motos y Furtivismo)',
    phone: '2614815460',
    address: 'Destacamento El Challao',
    note: 'Denuncias de motos en áreas protegidas y caza furtiva',
  },
];
