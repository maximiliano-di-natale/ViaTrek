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
  SummitItem,
  SummitCheckIn,
  SummitBadge,
  TrailRegion,
  ElevationProfileData,
} from '../types/map';

export const INITIAL_MENDOZA_REGION: MapRegion = {
  latitude: -32.8895,
  longitude: -68.8650,
  latitudeDelta: 0.16,
  longitudeDelta: 0.16,
};

export const MENDOZA_REGIONS: TrailRegion[] = [
  {
    id: 'todas',
    name: 'Todo Mendoza',
    icon: '✨',
    province: 'Mendoza',
    description: 'Vista panorámica general de la provincia',
    center: { latitude: -32.8895, longitude: -68.8650 },
    latitudeDelta: 0.22,
    longitudeDelta: 0.22,
  },
  {
    id: 'chacras',
    name: 'Chacras de Coria',
    icon: '🌵',
    province: 'Luján de Cuyo',
    description: 'Laberinto de senderos MTB, Teletubbies, El Álamo y singletracks',
    center: { latitude: -33.0035, longitude: -68.8980 },
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  },
  {
    id: 'challao_arco',
    name: 'El Challao & Arco',
    icon: '⛰️',
    province: 'Las Heras',
    description: 'Ascenso al Cerro Arco, filo Santo Tomás y Quebrada de San Isidro',
    center: { latitude: -32.8350, longitude: -68.9450 },
    latitudeDelta: 0.09,
    longitudeDelta: 0.09,
  },
  {
    id: 'frias_gloria',
    name: 'Gloria & Dique Frías',
    icon: '🌳',
    province: 'Capital / Godoy Cruz',
    description: 'Monumento Cerro de la Gloria, Parque San Martín y cañadón del Frías',
    center: { latitude: -32.8870, longitude: -68.8850 },
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  },
  {
    id: 'potrerillos',
    name: 'Potrerillos & El Salto',
    icon: '🌊',
    province: 'Luján Alta Montaña',
    description: 'Perilago Dique Potrerillos, Cascada del Salto y Cordón del Plata',
    center: { latitude: -32.9650, longitude: -69.2150 },
    latitudeDelta: 0.14,
    longitudeDelta: 0.14,
  },
  {
    id: 'san_rafael',
    name: 'San Rafael & Atuel',
    icon: '🧗',
    province: 'San Rafael',
    description: 'Cañón del Atuel, Valle Grande y circuitos de Los Reyunos',
    center: { latitude: -34.7800, longitude: -68.4500 },
    latitudeDelta: 0.35,
    longitudeDelta: 0.35,
  },
];

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

// ============================================================================
// DATASET OFICIAL DE SENDEROS (28 RUTAS EN 5 ZONAS DE MENDOZA)
// ============================================================================

export const MENDOZA_ROUTES: RouteItem[] = [
  {
    "id": "sendero-chacras-teletubbies",
    "name": "Sendero Los Teletubbies",
    "zone": "Chacras de Coria / Pedemonte",
    "regionId": "chacras",
    "type": "sendero_mtb",
    "distanceKm": 4.8,
    "elevationGainM": 140,
    "difficulty": "Fácil",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E676",
    "coordinates": [
      {
        "latitude": -33.0035,
        "longitude": -68.892
      },
      {
        "latitude": -33.0048,
        "longitude": -68.8972
      },
      {
        "latitude": -33.0065,
        "longitude": -68.903
      },
      {
        "latitude": -33.0082,
        "longitude": -68.9078
      },
      {
        "latitude": -33.0055,
        "longitude": -68.9112
      },
      {
        "latitude": -33.002,
        "longitude": -68.908
      },
      {
        "latitude": -33.001,
        "longitude": -68.9025
      },
      {
        "latitude": -33.0035,
        "longitude": -68.892
      }
    ],
    "elevationProfile": {
      "minElevM": 980,
      "maxElevM": 1120,
      "elevationGainM": 140,
      "points": [
        980,
        1010,
        1055,
        1120,
        1080,
        1030,
        995,
        980
      ]
    },
    "gpxFileName": "viatrek_chacras_teletubbies.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Trekking + MTB",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Singletrack compartido. Peatones y corredores tienen prioridad en curvas ciegas.",
      "legalWarning": "Prohibido ingreso de motos a combustión por degradación del estrato vegetal.",
      "authority": "Comunidad de Senderos de Chacras & Municipio de Luján"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.0035,
        "longitude": -68.892,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -33.0065,
        "longitude": -68.903,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Puesto El Manzano",
        "icon": "🥪",
        "latitude": -33.002,
        "longitude": -68.908,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-chacras-el-balcon",
    "name": "Sendero El Balcón de Abajo",
    "zone": "Chacras de Coria / Pedemonte",
    "regionId": "chacras",
    "type": "sendero_mtb",
    "distanceKm": 5.6,
    "elevationGainM": 190,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E5FF",
    "coordinates": [
      {
        "latitude": -33.0062,
        "longitude": -68.8965
      },
      {
        "latitude": -33.0085,
        "longitude": -68.901
      },
      {
        "latitude": -33.011,
        "longitude": -68.9045
      },
      {
        "latitude": -33.0135,
        "longitude": -68.909
      },
      {
        "latitude": -33.016,
        "longitude": -68.9135
      },
      {
        "latitude": -33.012,
        "longitude": -68.916
      },
      {
        "latitude": -33.009,
        "longitude": -68.911
      },
      {
        "latitude": -33.0062,
        "longitude": -68.8965
      }
    ],
    "elevationProfile": {
      "minElevM": 1010,
      "maxElevM": 1200,
      "elevationGainM": 190,
      "points": [
        1010,
        1045,
        1110,
        1165,
        1200,
        1140,
        1070,
        1010
      ]
    },
    "gpxFileName": "viatrek_chacras_el_balcon.gpx",
    "legality": {
      "status": "compartido_precaucion",
      "badgeText": "🌟 Multimodal: Trekking + MTB",
      "tagColor": "#00E5FF",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Sendero sobre cornisa con vista panorámica a viñedos. Bajar velocidad en tramos estrechos.",
      "authority": "Municipio de Luján de Cuyo"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.0062,
        "longitude": -68.8965,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador El Balcón",
        "icon": "📷",
        "latitude": -33.011,
        "longitude": -68.9045,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -33.012,
        "longitude": -68.916,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-chacras-los-chanares",
    "name": "Sendero Los Chañares (1 y 2)",
    "zone": "Chacras de Coria / Pedemonte",
    "regionId": "chacras",
    "type": "sendero_mtb",
    "distanceKm": 3.9,
    "elevationGainM": 110,
    "difficulty": "Fácil",
    "surface": "Ripio/Tierra",
    "strokeColor": "#76FF03",
    "coordinates": [
      {
        "latitude": -33.004,
        "longitude": -68.894
      },
      {
        "latitude": -33.0058,
        "longitude": -68.8985
      },
      {
        "latitude": -33.0075,
        "longitude": -68.902
      },
      {
        "latitude": -33.006,
        "longitude": -68.9055
      },
      {
        "latitude": -33.0032,
        "longitude": -68.9015
      },
      {
        "latitude": -33.004,
        "longitude": -68.894
      }
    ],
    "elevationProfile": {
      "minElevM": 990,
      "maxElevM": 1100,
      "elevationGainM": 110,
      "points": [
        990,
        1020,
        1070,
        1100,
        1045,
        990
      ]
    },
    "gpxFileName": "viatrek_chacras_los_chanares.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Trekking + MTB",
      "tagColor": "#76FF03",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Singletrack fluido entre vegetación autóctona de chañares. Respetar flora nativa.",
      "authority": "Senderos de Chacras"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.004,
        "longitude": -68.894,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -33.0058,
        "longitude": -68.8985,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -33.006,
        "longitude": -68.9055,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-chacras-la-cuyanita",
    "name": "Sendero La Cuyanita",
    "zone": "Chacras de Coria / Pedemonte",
    "regionId": "chacras",
    "type": "sendero_mtb",
    "distanceKm": 6.2,
    "elevationGainM": 220,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#FF9100",
    "coordinates": [
      {
        "latitude": -33.0062,
        "longitude": -68.8965
      },
      {
        "latitude": -33.009,
        "longitude": -68.905
      },
      {
        "latitude": -33.0115,
        "longitude": -68.913
      },
      {
        "latitude": -33.015,
        "longitude": -68.921
      },
      {
        "latitude": -33.018,
        "longitude": -68.927
      },
      {
        "latitude": -33.014,
        "longitude": -68.924
      },
      {
        "latitude": -33.01,
        "longitude": -68.915
      },
      {
        "latitude": -33.0062,
        "longitude": -68.8965
      }
    ],
    "elevationProfile": {
      "minElevM": 1010,
      "maxElevM": 1230,
      "elevationGainM": 220,
      "points": [
        1010,
        1060,
        1130,
        1180,
        1230,
        1190,
        1090,
        1010
      ]
    },
    "gpxFileName": "viatrek_chacras_la_cuyanita.gpx",
    "legality": {
      "status": "compartido_precaucion",
      "badgeText": "🌟 Multimodal: Trekking + MTB",
      "tagColor": "#FF9100",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Travesía técnica de huella estrecha. Precaución en zetas empinadas y cruces secos.",
      "authority": "Municipio de Luján de Cuyo"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.0062,
        "longitude": -68.8965,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -33.0115,
        "longitude": -68.913,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -33.014,
        "longitude": -68.924,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-chacras-quebrada-alamo",
    "name": "Sendero Quebrada del Álamo",
    "zone": "Chacras de Coria / Pedemonte",
    "regionId": "chacras",
    "type": "trekking",
    "distanceKm": 5.1,
    "elevationGainM": 175,
    "difficulty": "Fácil",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E676",
    "coordinates": [
      {
        "latitude": -33.0035,
        "longitude": -68.892
      },
      {
        "latitude": -33.001,
        "longitude": -68.8995
      },
      {
        "latitude": -32.9975,
        "longitude": -68.908
      },
      {
        "latitude": -32.993,
        "longitude": -68.922
      },
      {
        "latitude": -32.9955,
        "longitude": -68.914
      },
      {
        "latitude": -33,
        "longitude": -68.903
      },
      {
        "latitude": -33.0035,
        "longitude": -68.892
      }
    ],
    "elevationProfile": {
      "minElevM": 980,
      "maxElevM": 1155,
      "elevationGainM": 175,
      "points": [
        980,
        1020,
        1070,
        1155,
        1110,
        1040,
        980
      ]
    },
    "gpxFileName": "viatrek_chacras_quebrada_alamo.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Trekking + MTB",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Cañadón natural con sombra de álamos y vertiente. Apto para toda la familia.",
      "authority": "Dirección de Recursos Naturales Renovables"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.0035,
        "longitude": -68.892,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.9975,
        "longitude": -68.908,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.9955,
        "longitude": -68.914,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-chacras-los-olivillos",
    "name": "Sendero Los Olivillos Completo",
    "zone": "Chacras de Coria / Pedemonte",
    "regionId": "chacras",
    "type": "sendero_mtb",
    "distanceKm": 3.2,
    "elevationGainM": 75,
    "difficulty": "Fácil",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E5FF",
    "coordinates": [
      {
        "latitude": -33.002,
        "longitude": -68.89
      },
      {
        "latitude": -33.0035,
        "longitude": -68.894
      },
      {
        "latitude": -33.005,
        "longitude": -68.898
      },
      {
        "latitude": -33.0038,
        "longitude": -68.9015
      },
      {
        "latitude": -33.0018,
        "longitude": -68.896
      },
      {
        "latitude": -33.002,
        "longitude": -68.89
      }
    ],
    "elevationProfile": {
      "minElevM": 970,
      "maxElevM": 1045,
      "elevationGainM": 75,
      "points": [
        970,
        990,
        1020,
        1045,
        1005,
        970
      ]
    },
    "gpxFileName": "viatrek_chacras_los_olivillos.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Iniciación & Flow",
      "tagColor": "#00E5FF",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Sendero verde de iniciación. Ideal para principiantes, niños y caminatas suaves.",
      "authority": "Senderos de Chacras"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.002,
        "longitude": -68.89,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -33.0035,
        "longitude": -68.894,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -33.0038,
        "longitude": -68.9015,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-chacras-cerro-peni",
    "name": "Sendero Cumbre Cerro Peni (1.150 m)",
    "zone": "Chacras de Coria / Precordillera",
    "regionId": "chacras",
    "type": "trekking",
    "distanceKm": 4.5,
    "elevationGainM": 240,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#E040FB",
    "coordinates": [
      {
        "latitude": -33.0062,
        "longitude": -68.8965
      },
      {
        "latitude": -33.003,
        "longitude": -68.904
      },
      {
        "latitude": -32.9975,
        "longitude": -68.913
      },
      {
        "latitude": -32.989,
        "longitude": -68.916
      },
      {
        "latitude": -32.994,
        "longitude": -68.91
      },
      {
        "latitude": -33.0062,
        "longitude": -68.8965
      }
    ],
    "elevationProfile": {
      "minElevM": 1010,
      "maxElevM": 1250,
      "elevationGainM": 240,
      "points": [
        1010,
        1070,
        1140,
        1250,
        1160,
        1010
      ]
    },
    "gpxFileName": "viatrek_chacras_cerro_peni.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Cumbre Panorámica",
      "tagColor": "#E040FB",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Ascenso a cumbre destacada de la zona. Vistas 360° al pedemonte y Cordillera.",
      "authority": "Municipio de Luján de Cuyo"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.0062,
        "longitude": -68.8965,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -33.003,
        "longitude": -68.904,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.989,
        "longitude": -68.916,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-chacras-bajada-vertiente",
    "name": "Sendero Bajada Vertiente & Toboganes",
    "zone": "Chacras de Coria / Pedemonte",
    "regionId": "chacras",
    "type": "sendero_mtb",
    "distanceKm": 3.8,
    "elevationGainM": 95,
    "difficulty": "Técnico",
    "surface": "Ripio/Tierra",
    "strokeColor": "#FF3D00",
    "coordinates": [
      {
        "latitude": -33.008,
        "longitude": -68.908
      },
      {
        "latitude": -33.005,
        "longitude": -68.904
      },
      {
        "latitude": -33.0015,
        "longitude": -68.908
      },
      {
        "latitude": -32.998,
        "longitude": -68.903
      },
      {
        "latitude": -33.001,
        "longitude": -68.897
      }
    ],
    "elevationProfile": {
      "minElevM": 1020,
      "maxElevM": 1115,
      "elevationGainM": 95,
      "points": [
        1115,
        1090,
        1060,
        1040,
        1020
      ]
    },
    "gpxFileName": "viatrek_chacras_bajada_vertiente.gpx",
    "legality": {
      "status": "compartido_precaucion",
      "badgeText": "⚠️ Descenso Técnico MTB / Running",
      "tagColor": "#FF3D00",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Descenso rápido con peraltes naturales. Peatones deben circular con máxima atención.",
      "authority": "Senderos de Chacras"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.008,
        "longitude": -68.908,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -33.005,
        "longitude": -68.904,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.998,
        "longitude": -68.903,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -33.001,
        "longitude": -68.897,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-chacras-dique-frias",
    "name": "Cruce Precordillerano Chacras a Dique Frías",
    "zone": "Luján de Cuyo / Godoy Cruz Precordillera",
    "regionId": "chacras",
    "type": "sendero_mtb",
    "distanceKm": 12.4,
    "elevationGainM": 380,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#FF6D00",
    "coordinates": [
      {
        "latitude": -33.0035,
        "longitude": -68.892
      },
      {
        "latitude": -32.992,
        "longitude": -68.9055
      },
      {
        "latitude": -32.981,
        "longitude": -68.918
      },
      {
        "latitude": -32.973,
        "longitude": -68.924
      },
      {
        "latitude": -32.961,
        "longitude": -68.912
      },
      {
        "latitude": -32.952,
        "longitude": -68.899
      }
    ],
    "elevationProfile": {
      "minElevM": 980,
      "maxElevM": 1360,
      "elevationGainM": 380,
      "points": [
        980,
        1090,
        1220,
        1360,
        1210,
        1050
      ]
    },
    "gpxFileName": "viatrek_chacras_cruce_frias.gpx",
    "legality": {
      "status": "compartido_precaucion",
      "badgeText": "🌟 Multimodal: Travesía Precordillerana",
      "tagColor": "#FFD600",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Travesía de montaña entre cuencas. Prohibido motos a combustión fuera de caminos vecinales.",
      "authority": "Municipios de Godoy Cruz y Luján de Cuyo"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.0035,
        "longitude": -68.892,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.992,
        "longitude": -68.9055,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.973,
        "longitude": -68.924,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -32.952,
        "longitude": -68.899,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "ruta-wine-chacras-vistalba",
    "name": "Circuito Wine & Trail: Viñedos de Chacras & Vistalba",
    "zone": "Luján de Cuyo Enoturismo",
    "regionId": "chacras",
    "type": "wine_trail",
    "distanceKm": 8.8,
    "elevationGainM": 120,
    "difficulty": "Fácil",
    "surface": "Mixto",
    "strokeColor": "#E91E63",
    "coordinates": [
      {
        "latitude": -33.0035,
        "longitude": -68.892
      },
      {
        "latitude": -33.012,
        "longitude": -68.885
      },
      {
        "latitude": -33.024,
        "longitude": -68.878
      },
      {
        "latitude": -33.036,
        "longitude": -68.868
      },
      {
        "latitude": -33.029,
        "longitude": -68.855
      }
    ],
    "elevationProfile": {
      "minElevM": 940,
      "maxElevM": 1060,
      "elevationGainM": 120,
      "points": [
        980,
        1010,
        1035,
        1060,
        1020
      ]
    },
    "gpxFileName": "viatrek_wine_chacras_vistalba.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🍷 Enoturismo Gravel & Bici",
      "tagColor": "#E91E63",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Caminos rurales y callejones entre viñedos de Malbec.",
      "authority": "Enoturismo Mendoza / Luján de Cuyo"
    },
    "wineInfo": {
      "wineries": [
        "Bodega Kaiken",
        "Bodega Nieto Senetiner",
        "Bodega Vistalba",
        "Bodega Fabre Montmayou"
      ],
      "gravelType": "Caminos Rurales y Alamedas",
      "recommendedBike": "Gravel / MTB / Urbana Paseo",
      "tastingPoints": [
        "Wine Bar Kaiken",
        "Parada Gourmet Vistalba"
      ],
      "bikeFriendly": true
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.0035,
        "longitude": -68.892,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -33.012,
        "longitude": -68.885,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -33.036,
        "longitude": -68.868,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -33.029,
        "longitude": -68.855,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-cerro-arco-cumbre",
    "name": "Ascenso Clásico Cerro Arco (a las Antenas)",
    "zone": "El Challao / Las Heras",
    "regionId": "challao_arco",
    "type": "trekking",
    "distanceKm": 9.2,
    "elevationGainM": 540,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#FF6D00",
    "coordinates": [
      {
        "latitude": -32.842,
        "longitude": -68.924
      },
      {
        "latitude": -32.839,
        "longitude": -68.932
      },
      {
        "latitude": -32.836,
        "longitude": -68.938
      },
      {
        "latitude": -32.834,
        "longitude": -68.943
      },
      {
        "latitude": -32.8325,
        "longitude": -68.947
      },
      {
        "latitude": -32.8315,
        "longitude": -68.9485
      },
      {
        "latitude": -32.828,
        "longitude": -68.956
      }
    ],
    "elevationProfile": {
      "minElevM": 1140,
      "maxElevM": 1680,
      "elevationGainM": 540,
      "points": [
        1140,
        1220,
        1310,
        1420,
        1530,
        1610,
        1680
      ]
    },
    "gpxFileName": "viatrek_cerro_arco_clasico.gpx",
    "legality": {
      "status": "compartido_precaucion",
      "badgeText": "🌟 Multimodal: Trekking + MTB + E-Bike",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Peatones tienen paso prioritario en subida y bajada. Prohibido cortar zetas.",
      "legalWarning": "Prohibido ingreso de motos a combustión sobre la huella de ascenso (Ley 6045).",
      "authority": "Municipio de Las Heras y Guardaparques"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.842,
        "longitude": -68.924,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Curva de las Zetas",
        "icon": "📷",
        "latitude": -32.836,
        "longitude": -68.938,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Pista de Despegue Parapente",
        "icon": "🪂",
        "latitude": -32.8325,
        "longitude": -68.947,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -32.828,
        "longitude": -68.956,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-arco-despegue-parapente",
    "name": "Sendero de los Parapentistas (Despegue Arco)",
    "zone": "El Challao / Las Heras",
    "regionId": "challao_arco",
    "type": "trekking",
    "distanceKm": 5.4,
    "elevationGainM": 360,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E5FF",
    "coordinates": [
      {
        "latitude": -32.842,
        "longitude": -68.924
      },
      {
        "latitude": -32.839,
        "longitude": -68.932
      },
      {
        "latitude": -32.8365,
        "longitude": -68.939
      },
      {
        "latitude": -32.8335,
        "longitude": -68.944
      }
    ],
    "elevationProfile": {
      "minElevM": 1140,
      "maxElevM": 1500,
      "elevationGainM": 360,
      "points": [
        1140,
        1230,
        1340,
        1450,
        1500
      ]
    },
    "gpxFileName": "viatrek_arco_despegue_parapente.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Mirador & Despegue",
      "tagColor": "#00E5FF",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Zona de lanzamiento de parapentes. No obstruir la rampa de despegue.",
      "authority": "Club Mendoza de Vuelo Libre & Las Heras"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.842,
        "longitude": -68.924,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Curva de las Zetas",
        "icon": "📷",
        "latitude": -32.839,
        "longitude": -68.932,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Pista de Despegue Parapente",
        "icon": "🪂",
        "latitude": -32.8365,
        "longitude": -68.939,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -32.8335,
        "longitude": -68.944,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-arco-filo-santo-tomas",
    "name": "Travesía de Filo: Cerro Arco a Cerro Santo Tomás (1.820 m)",
    "zone": "El Challao Precordillera Profunda",
    "regionId": "challao_arco",
    "type": "trekking",
    "distanceKm": 7.8,
    "elevationGainM": 410,
    "difficulty": "Técnico",
    "surface": "Ripio/Tierra",
    "strokeColor": "#E040FB",
    "coordinates": [
      {
        "latitude": -32.828,
        "longitude": -68.956
      },
      {
        "latitude": -32.826,
        "longitude": -68.961
      },
      {
        "latitude": -32.824,
        "longitude": -68.966
      },
      {
        "latitude": -32.822,
        "longitude": -68.97
      },
      {
        "latitude": -32.821,
        "longitude": -68.972
      }
    ],
    "elevationProfile": {
      "minElevM": 1620,
      "maxElevM": 1820,
      "elevationGainM": 410,
      "points": [
        1680,
        1630,
        1710,
        1765,
        1820
      ]
    },
    "gpxFileName": "viatrek_filo_arco_santo_tomas.gpx",
    "legality": {
      "status": "compartido_precaucion",
      "badgeText": "⛰️ Filo Expuesto: Trekking Técnico",
      "tagColor": "#E040FB",
      "allowedModes": {
        "trekking": true,
        "bicycle": false,
        "moto": false
      },
      "priorityRule": "Filo aéreo ventoso con caída a ambos lados. Exclusivo senderismo a pie.",
      "authority": "Guardaparques de Mendoza"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.828,
        "longitude": -68.956,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Curva de las Zetas",
        "icon": "📷",
        "latitude": -32.826,
        "longitude": -68.961,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Pista de Despegue Parapente",
        "icon": "🪂",
        "latitude": -32.822,
        "longitude": -68.97,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -32.821,
        "longitude": -68.972,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-cumbre-cerro-gateado",
    "name": "Sendero Cumbre Cerro Gateado (2.130 m)",
    "zone": "El Challao Precordillera Alta",
    "regionId": "challao_arco",
    "type": "trekking",
    "distanceKm": 14.5,
    "elevationGainM": 820,
    "difficulty": "Técnico",
    "surface": "Ripio/Tierra",
    "strokeColor": "#FF1744",
    "coordinates": [
      {
        "latitude": -32.842,
        "longitude": -68.924
      },
      {
        "latitude": -32.836,
        "longitude": -68.938
      },
      {
        "latitude": -32.828,
        "longitude": -68.956
      },
      {
        "latitude": -32.821,
        "longitude": -68.972
      },
      {
        "latitude": -32.815,
        "longitude": -68.975
      },
      {
        "latitude": -32.811,
        "longitude": -68.972
      }
    ],
    "elevationProfile": {
      "minElevM": 1140,
      "maxElevM": 2130,
      "elevationGainM": 820,
      "points": [
        1140,
        1350,
        1680,
        1820,
        1990,
        2130
      ]
    },
    "gpxFileName": "viatrek_cumbre_cerro_gateado.gpx",
    "legality": {
      "status": "compartido_precaucion",
      "badgeText": "🏔️ Alta Montaña: Exclusivo Trekking",
      "tagColor": "#FF1744",
      "allowedModes": {
        "trekking": true,
        "bicycle": false,
        "moto": false
      },
      "priorityRule": "Ascenso exigente de jornada completa. Registro obligatorio y agua suficiente.",
      "authority": "Cuerpo de Guardaparques de Mendoza"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.842,
        "longitude": -68.924,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.836,
        "longitude": -68.938,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.821,
        "longitude": -68.972,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -32.811,
        "longitude": -68.972,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-quebrada-san-isidro-aspero",
    "name": "Circuito Quebrada de San Isidro & Cerro Áspero",
    "zone": "El Challao Quebradas",
    "regionId": "challao_arco",
    "type": "sendero_mtb",
    "distanceKm": 11,
    "elevationGainM": 320,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E676",
    "coordinates": [
      {
        "latitude": -32.842,
        "longitude": -68.924
      },
      {
        "latitude": -32.838,
        "longitude": -68.931
      },
      {
        "latitude": -32.832,
        "longitude": -68.936
      },
      {
        "latitude": -32.84,
        "longitude": -68.94
      },
      {
        "latitude": -32.848,
        "longitude": -68.941
      },
      {
        "latitude": -32.852,
        "longitude": -68.933
      },
      {
        "latitude": -32.842,
        "longitude": -68.924
      }
    ],
    "elevationProfile": {
      "minElevM": 1120,
      "maxElevM": 1450,
      "elevationGainM": 320,
      "points": [
        1120,
        1180,
        1260,
        1370,
        1450,
        1320,
        1120
      ]
    },
    "gpxFileName": "viatrek_quebrada_san_isidro_aspero.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Trekking + MTB",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Huella de cañadón y lecho seco. Respetar paso de animales y senderistas.",
      "authority": "Municipio de Las Heras"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.842,
        "longitude": -68.924,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.832,
        "longitude": -68.936,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.848,
        "longitude": -68.941,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-circuito-chapadmalal-enduro",
    "name": "Pistas de Enduro & Huellas El Challao",
    "zone": "El Challao Circuito Deportivo",
    "regionId": "challao_arco",
    "type": "moto_trail",
    "distanceKm": 15.6,
    "elevationGainM": 410,
    "difficulty": "Técnico",
    "surface": "Ripio/Tierra",
    "strokeColor": "#2979FF",
    "coordinates": [
      {
        "latitude": -32.825,
        "longitude": -68.92
      },
      {
        "latitude": -32.818,
        "longitude": -68.929
      },
      {
        "latitude": -32.811,
        "longitude": -68.938
      },
      {
        "latitude": -32.805,
        "longitude": -68.948
      },
      {
        "latitude": -32.815,
        "longitude": -68.955
      },
      {
        "latitude": -32.828,
        "longitude": -68.941
      },
      {
        "latitude": -32.825,
        "longitude": -68.92
      }
    ],
    "elevationProfile": {
      "minElevM": 1090,
      "maxElevM": 1510,
      "elevationGainM": 410,
      "points": [
        1090,
        1180,
        1310,
        1460,
        1510,
        1340,
        1090
      ]
    },
    "gpxFileName": "viatrek_enduro_el_challao.gpx",
    "legality": {
      "status": "circuito_enduro",
      "badgeText": "🏍️ Circuito Motos & Enduro Habilitado",
      "tagColor": "#2979FF",
      "allowedModes": {
        "trekking": false,
        "bicycle": true,
        "moto": true
      },
      "priorityRule": "Zona habilitada para motocross y enduro deportivo. Casco y pechera obligatorios.",
      "legalWarning": "Prohibido salirse de las huellas habilitadas hacia la Reserva Villavicencio.",
      "authority": "Comunidad Enduro Mendoza / Las Heras"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.825,
        "longitude": -68.92,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.811,
        "longitude": -68.938,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.815,
        "longitude": -68.955,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "ruta-moto-villavicencio-caracoles",
    "name": "Ruta Histórica Caracoles de Villavicencio (RP 52)",
    "zone": "Las Heras / Precordillera Norte",
    "regionId": "challao_arco",
    "type": "moto_trail",
    "distanceKm": 28.4,
    "elevationGainM": 890,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#2979FF",
    "coordinates": [
      {
        "latitude": -32.528,
        "longitude": -69.018
      },
      {
        "latitude": -32.518,
        "longitude": -69.025
      },
      {
        "latitude": -32.505,
        "longitude": -69.034
      },
      {
        "latitude": -32.492,
        "longitude": -69.048
      },
      {
        "latitude": -32.481,
        "longitude": -69.062
      }
    ],
    "elevationProfile": {
      "minElevM": 1750,
      "maxElevM": 3100,
      "elevationGainM": 890,
      "points": [
        1750,
        2040,
        2380,
        2750,
        3100
      ]
    },
    "gpxFileName": "viatrek_caracoles_villavicencio_rp52.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Cicloturismo, Moto & 4x4",
      "tagColor": "#2979FF",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": true
      },
      "priorityRule": "Ruta provincial de ripio. Máximo 40 km/h en caracoles. Prioridad al vehículo en subida.",
      "authority": "Dirección Provincial de Vialidad Mendoza"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.528,
        "longitude": -69.018,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.518,
        "longitude": -69.025,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.492,
        "longitude": -69.048,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -32.481,
        "longitude": -69.062,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-cerro-gloria-ecoparque",
    "name": "Circuito Monumento Cerro de la Gloria & Ecoparque",
    "zone": "Ciudad de Mendoza / Parque San Martín",
    "regionId": "frias_gloria",
    "type": "trekking",
    "distanceKm": 4.8,
    "elevationGainM": 120,
    "difficulty": "Fácil",
    "surface": "Mixto",
    "strokeColor": "#00E676",
    "coordinates": [
      {
        "latitude": -32.8885,
        "longitude": -68.878
      },
      {
        "latitude": -32.8872,
        "longitude": -68.884
      },
      {
        "latitude": -32.8845,
        "longitude": -68.889
      },
      {
        "latitude": -32.8868,
        "longitude": -68.893
      },
      {
        "latitude": -32.8895,
        "longitude": -68.8905
      },
      {
        "latitude": -32.8885,
        "longitude": -68.878
      }
    ],
    "elevationProfile": {
      "minElevM": 860,
      "maxElevM": 980,
      "elevationGainM": 120,
      "points": [
        860,
        890,
        930,
        980,
        920,
        860
      ]
    },
    "gpxFileName": "viatrek_cerro_gloria_ecoparque.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Peatonal & Bici Urbana",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Circuito recreativo y turístico. Peatones con paso prioritario en sendas.",
      "authority": "Dirección de Parques y Paseos Públicos"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.8885,
        "longitude": -68.878,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.8872,
        "longitude": -68.884,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.8868,
        "longitude": -68.893,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-dique-frias-papagayos",
    "name": "Cañadón Dique Frías & Quebrada de Papagayos",
    "zone": "Godoy Cruz / Capital Precordillera",
    "regionId": "frias_gloria",
    "type": "sendero_mtb",
    "distanceKm": 8.5,
    "elevationGainM": 210,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#FF6D00",
    "coordinates": [
      {
        "latitude": -32.9055,
        "longitude": -68.895
      },
      {
        "latitude": -32.898,
        "longitude": -68.902
      },
      {
        "latitude": -32.889,
        "longitude": -68.908
      },
      {
        "latitude": -32.879,
        "longitude": -68.905
      },
      {
        "latitude": -32.872,
        "longitude": -68.912
      }
    ],
    "elevationProfile": {
      "minElevM": 910,
      "maxElevM": 1120,
      "elevationGainM": 210,
      "points": [
        910,
        960,
        1020,
        1080,
        1120
      ]
    },
    "gpxFileName": "viatrek_dique_frias_papagayos.gpx",
    "legality": {
      "status": "compartido_precaucion",
      "badgeText": "🌟 Multimodal: Trekking + MTB",
      "tagColor": "#FF6D00",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Terreno aluvional seco. Precaución en época de tormentas de verano.",
      "authority": "Dirección de Hidráulica Mendoza"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.9055,
        "longitude": -68.895,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.898,
        "longitude": -68.902,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.879,
        "longitude": -68.905,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -32.872,
        "longitude": -68.912,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-divisadero-largo",
    "name": "Quebrada de Divisadero Largo (Reserva Protegida)",
    "zone": "Ciudad de Mendoza / Reserva Natural",
    "regionId": "frias_gloria",
    "type": "trekking",
    "distanceKm": 5.2,
    "elevationGainM": 160,
    "difficulty": "Fácil",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E676",
    "coordinates": [
      {
        "latitude": -32.874,
        "longitude": -68.928
      },
      {
        "latitude": -32.871,
        "longitude": -68.934
      },
      {
        "latitude": -32.868,
        "longitude": -68.941
      },
      {
        "latitude": -32.864,
        "longitude": -68.947
      },
      {
        "latitude": -32.87,
        "longitude": -68.937
      },
      {
        "latitude": -32.874,
        "longitude": -68.928
      }
    ],
    "elevationProfile": {
      "minElevM": 1020,
      "maxElevM": 1180,
      "elevationGainM": 160,
      "points": [
        1020,
        1060,
        1110,
        1180,
        1100,
        1020
      ]
    },
    "gpxFileName": "viatrek_divisadero_largo.gpx",
    "legality": {
      "status": "prohibido_motor",
      "badgeText": "🥾 Exclusivo Senderismo Protegido",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Reserva Natural Protegida. Registro en seccional de guardaparques obligatorio.",
      "legalWarning": "Prohibición estricta de vehículos a combustión y animales domésticos (Ley 6045).",
      "authority": "Cuerpo de Guardaparques de Mendoza (DRNR)"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.874,
        "longitude": -68.928,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.871,
        "longitude": -68.934,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.864,
        "longitude": -68.947,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "ciclovia-troncal-central",
    "name": "Ciclovía Troncal Godoy Cruz - Mendoza Capital",
    "zone": "Gran Mendoza",
    "regionId": "frias_gloria",
    "type": "ciclovia",
    "distanceKm": 7.2,
    "elevationGainM": 45,
    "difficulty": "Fácil",
    "surface": "Asfalto",
    "strokeColor": "#00E676",
    "coordinates": [
      {
        "latitude": -32.9341,
        "longitude": -68.8472
      },
      {
        "latitude": -32.9235,
        "longitude": -68.8465
      },
      {
        "latitude": -32.915,
        "longitude": -68.845
      },
      {
        "latitude": -32.9032,
        "longitude": -68.8441
      },
      {
        "latitude": -32.8955,
        "longitude": -68.843
      },
      {
        "latitude": -32.883,
        "longitude": -68.8385
      }
    ],
    "elevationProfile": {
      "minElevM": 740,
      "maxElevM": 785,
      "elevationGainM": 45,
      "points": [
        740,
        750,
        760,
        770,
        780,
        785
      ]
    },
    "gpxFileName": "viatrek_ciclovia_troncal_godoycruz.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🟢 Libre Multimodal Urbano",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Peatones tienen paso prioritario en cruces señalizados. Bicis máx 25 km/h.",
      "legalWarning": "Prohibida la circulación de motos a combustión en carriles de ciclovía (Ley 9024).",
      "authority": "Municipios de Godoy Cruz y Ciudad de Mendoza"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.9341,
        "longitude": -68.8472,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.9235,
        "longitude": -68.8465,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.9032,
        "longitude": -68.8441,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -32.883,
        "longitude": -68.8385,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "ciclovia-parque-general-san-martin",
    "name": "Circuito Parque General San Martín & El Rosedal",
    "zone": "Ciudad de Mendoza",
    "regionId": "frias_gloria",
    "type": "ciclovia",
    "distanceKm": 6.5,
    "elevationGainM": 90,
    "difficulty": "Fácil",
    "surface": "Asfalto",
    "strokeColor": "#00E676",
    "coordinates": [
      {
        "latitude": -32.8885,
        "longitude": -68.862
      },
      {
        "latitude": -32.8892,
        "longitude": -68.8745
      },
      {
        "latitude": -32.8851,
        "longitude": -68.879
      },
      {
        "latitude": -32.881,
        "longitude": -68.8825
      },
      {
        "latitude": -32.886,
        "longitude": -68.8912
      }
    ],
    "elevationProfile": {
      "minElevM": 810,
      "maxElevM": 900,
      "elevationGainM": 90,
      "points": [
        810,
        830,
        860,
        885,
        900
      ]
    },
    "gpxFileName": "viatrek_parque_san_martin.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🟢 Parque Recreativo Multimodal",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Zona de paseo familiar: prioridad absoluta al peatón y deportistas a pie.",
      "authority": "Dirección de Parques y Paseos Públicos de Mendoza"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.8885,
        "longitude": -68.862,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.8892,
        "longitude": -68.8745,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.881,
        "longitude": -68.8825,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -32.886,
        "longitude": -68.8912,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-potrerillos-perilago",
    "name": "Circuito Perilago Dique Potrerillos & Bahía de los Vientos",
    "zone": "Luján Alta Montaña / Dique Potrerillos",
    "regionId": "potrerillos",
    "type": "sendero_mtb",
    "distanceKm": 14.8,
    "elevationGainM": 190,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E5FF",
    "coordinates": [
      {
        "latitude": -32.962,
        "longitude": -69.198
      },
      {
        "latitude": -32.97,
        "longitude": -69.208
      },
      {
        "latitude": -32.978,
        "longitude": -69.215
      },
      {
        "latitude": -32.985,
        "longitude": -69.222
      },
      {
        "latitude": -32.975,
        "longitude": -69.231
      },
      {
        "latitude": -32.965,
        "longitude": -69.22
      },
      {
        "latitude": -32.962,
        "longitude": -69.198
      }
    ],
    "elevationProfile": {
      "minElevM": 1380,
      "maxElevM": 1570,
      "elevationGainM": 190,
      "points": [
        1380,
        1420,
        1480,
        1540,
        1570,
        1460,
        1380
      ]
    },
    "gpxFileName": "viatrek_potrerillos_perilago.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Trekking + MTB + Gravel",
      "tagColor": "#00E5FF",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Senderos ribereños de embalse. Respetar áreas de avistaje de aves y bañistas.",
      "authority": "Municipio de Luján de Cuyo & Náutica Mendoza"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -32.962,
        "longitude": -69.198,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -32.978,
        "longitude": -69.215,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -32.975,
        "longitude": -69.231,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-cascada-del-salto",
    "name": "Quebrada de la Cascada del Salto (Las Vegas)",
    "zone": "Potrerillos / Valle de Las Vegas",
    "regionId": "potrerillos",
    "type": "trekking",
    "distanceKm": 6.8,
    "elevationGainM": 310,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E676",
    "coordinates": [
      {
        "latitude": -33.005,
        "longitude": -69.262
      },
      {
        "latitude": -33.009,
        "longitude": -69.269
      },
      {
        "latitude": -33.0135,
        "longitude": -69.276
      },
      {
        "latitude": -33.018,
        "longitude": -69.284
      },
      {
        "latitude": -33.0135,
        "longitude": -69.276
      },
      {
        "latitude": -33.005,
        "longitude": -69.262
      }
    ],
    "elevationProfile": {
      "minElevM": 1850,
      "maxElevM": 2160,
      "elevationGainM": 310,
      "points": [
        1850,
        1920,
        2010,
        2160,
        2010,
        1850
      ]
    },
    "gpxFileName": "viatrek_cascada_del_salto.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🥾 Exclusivo Senderismo Pedestre",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": false,
        "moto": false
      },
      "priorityRule": "Sendero de quebrada por el lecho del arroyo. Calzado con buen agarre.",
      "authority": "Comunidad Vecinal El Salto & Guardaparques"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.005,
        "longitude": -69.262,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -33.009,
        "longitude": -69.269,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Cascada Natural de Vertiente",
        "icon": "🌊",
        "latitude": -33.018,
        "longitude": -69.284,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-bosque-valle-sol",
    "name": "Senderos del Bosque Las Carditas & Valle del Sol",
    "zone": "Potrerillos / El Salto",
    "regionId": "potrerillos",
    "type": "trekking",
    "distanceKm": 5.6,
    "elevationGainM": 150,
    "difficulty": "Fácil",
    "surface": "Ripio/Tierra",
    "strokeColor": "#76FF03",
    "coordinates": [
      {
        "latitude": -33.001,
        "longitude": -69.245
      },
      {
        "latitude": -33.0045,
        "longitude": -69.251
      },
      {
        "latitude": -33.008,
        "longitude": -69.258
      },
      {
        "latitude": -33.005,
        "longitude": -69.262
      },
      {
        "latitude": -33.001,
        "longitude": -69.245
      }
    ],
    "elevationProfile": {
      "minElevM": 1780,
      "maxElevM": 1930,
      "elevationGainM": 150,
      "points": [
        1780,
        1830,
        1890,
        1930,
        1780
      ]
    },
    "gpxFileName": "viatrek_bosque_valle_sol.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Trekking & MTB",
      "tagColor": "#76FF03",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Bosque de pinos de montaña. Prohibición estricta de fuego.",
      "authority": "Municipio de Luján de Cuyo"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -33.001,
        "longitude": -69.245,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -33.0045,
        "longitude": -69.251,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -33.005,
        "longitude": -69.262,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-canon-atuel-valle-grande",
    "name": "Quebrada del Cañón del Atuel & Mirador El Submarino",
    "zone": "San Rafael / Cañón del Atuel",
    "regionId": "san_rafael",
    "type": "trekking",
    "distanceKm": 16.2,
    "elevationGainM": 280,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#FF9100",
    "coordinates": [
      {
        "latitude": -34.811,
        "longitude": -68.482
      },
      {
        "latitude": -34.825,
        "longitude": -68.495
      },
      {
        "latitude": -34.838,
        "longitude": -68.504
      },
      {
        "latitude": -34.845,
        "longitude": -68.512
      },
      {
        "latitude": -34.855,
        "longitude": -68.52
      }
    ],
    "elevationProfile": {
      "minElevM": 820,
      "maxElevM": 1100,
      "elevationGainM": 280,
      "points": [
        820,
        890,
        970,
        1040,
        1100
      ]
    },
    "gpxFileName": "viatrek_canon_atuel_submarino.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Trekking, MTB & Moto",
      "tagColor": "#FF9100",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": true
      },
      "priorityRule": "Huella de cornisa geológica. Vehículos y deportistas comparten trazado.",
      "authority": "Turismo San Rafael & Vialidad Provincial"
    },
    "isCircular": false,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -34.811,
        "longitude": -68.482,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -34.825,
        "longitude": -68.495,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -34.845,
        "longitude": -68.512,
        "description": "Hito intermedio característico del sendero"
      },
      {
        "title": "Punto de Llegada / Cumbre",
        "icon": "🏁",
        "latitude": -34.855,
        "longitude": -68.52,
        "description": "Finalización del recorrido"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-costero-valle-grande",
    "name": "Circuito Costero Presa Valle Grande",
    "zone": "San Rafael / Valle Grande",
    "regionId": "san_rafael",
    "type": "sendero_mtb",
    "distanceKm": 7.4,
    "elevationGainM": 130,
    "difficulty": "Fácil",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E5FF",
    "coordinates": [
      {
        "latitude": -34.805,
        "longitude": -68.475
      },
      {
        "latitude": -34.811,
        "longitude": -68.482
      },
      {
        "latitude": -34.818,
        "longitude": -68.489
      },
      {
        "latitude": -34.822,
        "longitude": -68.492
      },
      {
        "latitude": -34.805,
        "longitude": -68.475
      }
    ],
    "elevationProfile": {
      "minElevM": 810,
      "maxElevM": 940,
      "elevationGainM": 130,
      "points": [
        810,
        850,
        910,
        940,
        810
      ]
    },
    "gpxFileName": "viatrek_costero_valle_grande.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Trekking + MTB",
      "tagColor": "#00E5FF",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Sendero de ribera de lago. Cuidado con turistas y embarcaderos.",
      "authority": "Municipio de San Rafael"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -34.805,
        "longitude": -68.475,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -34.811,
        "longitude": -68.482,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -34.822,
        "longitude": -68.492,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  },
  {
    "id": "sendero-los-reyunos-perilago",
    "name": "Circuito Presa Los Reyunos & Mirador Cañón del Diamante",
    "zone": "San Rafael / Presa Los Reyunos",
    "regionId": "san_rafael",
    "type": "sendero_mtb",
    "distanceKm": 11.5,
    "elevationGainM": 240,
    "difficulty": "Moderado",
    "surface": "Ripio/Tierra",
    "strokeColor": "#00E676",
    "coordinates": [
      {
        "latitude": -34.595,
        "longitude": -68.642
      },
      {
        "latitude": -34.588,
        "longitude": -68.649
      },
      {
        "latitude": -34.582,
        "longitude": -68.655
      },
      {
        "latitude": -34.576,
        "longitude": -68.662
      },
      {
        "latitude": -34.585,
        "longitude": -68.65
      },
      {
        "latitude": -34.595,
        "longitude": -68.642
      }
    ],
    "elevationProfile": {
      "minElevM": 960,
      "maxElevM": 1200,
      "elevationGainM": 240,
      "points": [
        960,
        1020,
        1110,
        1200,
        1080,
        960
      ]
    },
    "gpxFileName": "viatrek_los_reyunos_diamante.gpx",
    "legality": {
      "status": "libre",
      "badgeText": "🌟 Multimodal: Trekking + MTB",
      "tagColor": "#00E676",
      "allowedModes": {
        "trekking": true,
        "bicycle": true,
        "moto": false
      },
      "priorityRule": "Sendero perimetral de lago artificial y cañón del río Diamante.",
      "authority": "Club Náutico Los Reyunos & Municipio de San Rafael"
    },
    "isCircular": true,
    "waypoints": [
      {
        "title": "Punto de Salida & Parking",
        "icon": "🅿️",
        "latitude": -34.595,
        "longitude": -68.642,
        "description": "Estacionamiento y comienzo del recorrido"
      },
      {
        "title": "Mirador Fotográfico Panorámico",
        "icon": "📷",
        "latitude": -34.588,
        "longitude": -68.649,
        "description": "Punto panorámico para fotos y descanso"
      },
      {
        "title": "Paso Precordillerano & Vertiente",
        "icon": "💧",
        "latitude": -34.576,
        "longitude": -68.662,
        "description": "Hito intermedio característico del sendero"
      }
    ],
    "author": {
      "name": "Maxi Di Natale",
      "role": "Guía de Montaña • ViaTrek",
      "applauseCount": 18,
      "commentsCount": 6
    }
  }
];

// ============================================================================
// PUNTOS DE INTERÉS SATELITALES (30+ POIS EN TODAS LAS ZONAS)
// ============================================================================

export const MENDOZA_POIS: POIItem[] = [
  // --- CHACRAS DE CORIA ---
  {
    id: 'poi-chacras-entrada',
    name: 'Entrada Principal Senderos de Chacras (Calle Chiara Yacopini)',
    category: 'trailhead',
    icon: '🏁',
    color: '#00E5FF',
    latitude: -33.0035,
    longitude: -68.8920,
    altitudeM: 980,
    description: 'Acceso oficial desde RP 82 por calle Chiara Yacopini (ex Los Pozos). Portón de entrada al bike park.',
  },
  {
    id: 'poi-puesto-atamisqui',
    name: 'Puesto Atamisqui (Estacionamiento & Punto Seguro)',
    category: 'trailhead',
    icon: '🅿️',
    color: '#00E676',
    latitude: -33.0062,
    longitude: -68.8965,
    altitudeM: 1010,
    description: 'Punto neurálgico de encuentro, estacionamiento cuidado, recarga de agua y trailhead principal.',
  },
  {
    id: 'poi-puesto-manzano',
    name: 'Puesto El Manzano (Encuentro de Singletracks)',
    category: 'refugio_almacen',
    icon: '🏡',
    color: '#FFD600',
    latitude: -32.9975,
    longitude: -68.9130,
    altitudeM: 1140,
    description: 'Puesto histórico precordillerano donde confluyen Teletubbies, El Álamo y la travesía hacia Frías.',
  },
  {
    id: 'poi-mirador-balcon',
    name: 'Mirador El Balcón (Vista Valle de Luján)',
    category: 'mirador',
    icon: '👁️',
    color: '#E040FB',
    latitude: -33.0110,
    longitude: -68.9045,
    altitudeM: 1165,
    description: 'Mirador panorámico sobre la cornisa con vista espectacular a los viñedos de Chacras y Vistalba.',
  },
  {
    id: 'poi-cerro-peni',
    name: 'Cumbre Cerro Peni (1.150 m)',
    category: 'cumbre',
    icon: '⛰️',
    color: '#FFD700',
    latitude: -32.9890,
    longitude: -68.9160,
    altitudeM: 1150,
    description: 'Cumbre de baja altura con hito de piedras y vista panorámica 360° al pedemonte mendocino.',
  },
  {
    id: 'poi-quebrada-alamo',
    name: 'Vertiente & Bosque Quebrada del Álamo',
    category: 'vertiente',
    icon: '💧',
    color: '#00E5FF',
    latitude: -32.9930,
    longitude: -68.9220,
    altitudeM: 1155,
    description: 'Oasis natural con álamos centenarios y surgente de agua fresca en medio del paisaje desértico.',
  },
  {
    id: 'poi-almacen-chacras',
    name: 'Pulpería & Almacén de Montaña El Puesto',
    category: 'refugio_almacen',
    icon: '🥪',
    color: '#FF9100',
    latitude: -33.0020,
    longitude: -68.8890,
    altitudeM: 960,
    description: 'Abastecimiento de bebidas isotónicas, frutos secos, sándwiches de jamón crudo y frutas.',
  },
  {
    id: 'poi-bodega-kaiken',
    name: 'Bodega Kaiken (Bicicletero & Jardín Enoturístico)',
    category: 'bodega_wine',
    icon: '🍷',
    color: '#E91E63',
    latitude: -33.0360,
    longitude: -68.8680,
    altitudeM: 1050,
    description: 'Parada Wine & Trail con bicicleteros seguros, degustación al paso y recarga de caramañolas.',
  },

  // --- EL CHALLAO & CERRO ARCO ---
  {
    id: 'poi-puerta-quebrada',
    name: 'Base Cerro Arco (Puerta de la Quebrada)',
    category: 'trailhead',
    icon: '🏁',
    color: '#00E5FF',
    latitude: -32.8420,
    longitude: -68.9240,
    altitudeM: 1140,
    description: 'Estacionamiento, puesto de hidratación, cantina tradicional y punto de partida para Cerro Arco.',
  },
  {
    id: 'poi-cumbre-arco',
    name: 'Antenas Cumbre Cerro Arco (1.680 m)',
    category: 'cumbre',
    icon: '🏹',
    color: '#FFD700',
    latitude: -32.8280,
    longitude: -68.9560,
    altitudeM: 1680,
    description: 'Cumbre mítica de Mendoza con bosque de antenas repetidoras y mirador completo a la Cordillera.',
  },
  {
    id: 'poi-despegue-parapente',
    name: 'Plataforma de Despegue Parapente Cerro Arco',
    category: 'parapente',
    icon: '🪂',
    color: '#00E5FF',
    latitude: -32.8335,
    longitude: -68.9440,
    altitudeM: 1500,
    description: 'Pista natural de lanzamiento de parapentes y alas delta con vistas al Valle del Challao.',
  },
  {
    id: 'poi-cumbre-santo-tomas',
    name: 'Cumbre Cerro Santo Tomás (1.820 m)',
    category: 'cumbre',
    icon: '⛰️',
    color: '#FFD700',
    latitude: -32.8210,
    longitude: -68.9720,
    altitudeM: 1820,
    description: 'Filo ventoso de altura con avistaje frecuente de cóndores andinos y vista hacia Uspallata.',
  },
  {
    id: 'poi-cumbre-gateado',
    name: 'Cumbre Cerro Gateado (2.130 m)',
    category: 'cumbre',
    icon: '🏆',
    color: '#FF1744',
    latitude: -32.8110,
    longitude: -68.9720,
    altitudeM: 2130,
    description: 'Techo de la precordillera central del Challao. Desafío de trekking de alta exigencia.',
  },
  {
    id: 'poi-puesto-san-isidro',
    name: 'Puesto San Isidro (Quebrada Histórica)',
    category: 'refugio_almacen',
    icon: '🏡',
    color: '#FF9100',
    latitude: -32.8320,
    longitude: -68.9360,
    altitudeM: 1260,
    description: 'Puesto ganadero tradicional en el corazón de la Quebrada de San Isidro.',
  },
  {
    id: 'poi-puesto-chulengo',
    name: 'Puesto El Chulengo (Sector Enduro & Motos)',
    category: 'trailhead',
    icon: '🏍️',
    color: '#2979FF',
    latitude: -32.8250,
    longitude: -68.9200,
    altitudeM: 1090,
    description: 'Base de encuentro de motocross, enduro y vehículos todoterreno autorizados.',
  },

  // --- CERRO DE LA GLORIA, DIQUE FRÍAS & PARQUE ---
  {
    id: 'poi-portones-parque',
    name: 'Portones del Parque San Martín',
    category: 'trailhead',
    icon: '🏁',
    color: '#00E5FF',
    latitude: -32.8885,
    longitude: -68.8620,
    altitudeM: 810,
    description: 'Acceso principal fundacional a la red de ciclovías y senderos urbanos de Mendoza.',
  },
  {
    id: 'poi-mirador-cerro-gloria',
    name: 'Monumento al Ejército de Los Andes (Cerro de la Gloria)',
    category: 'mirador',
    icon: '🦅',
    color: '#FFD700',
    latitude: -32.8868,
    longitude: -68.8930,
    altitudeM: 980,
    description: 'Monumento escultórico cumbre con mirador de 360° a toda la Ciudad de Mendoza.',
  },
  {
    id: 'poi-portal-ecoparque',
    name: 'Portal Ecoparque Mendoza',
    category: 'mirador',
    icon: '🌳',
    color: '#00E676',
    latitude: -32.8845,
    longitude: -68.8890,
    altitudeM: 930,
    description: 'Acceso a los nuevos senderos perimetrales recuperados del paseo de flora autóctona.',
  },
  {
    id: 'poi-presa-dique-frias',
    name: 'Murallón & Aliviadero Dique Frías',
    category: 'mirador',
    icon: '🧱',
    color: '#FF9100',
    latitude: -32.9055,
    longitude: -68.8950,
    altitudeM: 910,
    description: 'Presa aluvional de contención con cañadón agreste para trail running y MTB.',
  },
  {
    id: 'poi-mirador-papagayos',
    name: 'Mirador Quebrada de los Papagayos',
    category: 'mirador',
    icon: '👁️',
    color: '#00E5FF',
    latitude: -32.8790,
    longitude: -68.9050,
    altitudeM: 1080,
    description: 'Mirador panorámico sobre la quebrada seca y el cordón de cerros precordilleranos.',
  },
  {
    id: 'poi-divisadero-guardaparques',
    name: 'Centro de Guardaparques Divisadero Largo',
    category: 'trailhead',
    icon: '🛡️',
    color: '#00E676',
    latitude: -32.8740,
    longitude: -68.9280,
    altitudeM: 1020,
    description: 'Seccional de registro obligatorio y punto de partida de los senderos geológicos.',
  },
  {
    id: 'poi-estacion-benegas',
    name: 'Estación Benegas (Punto Seguro & Servicios)',
    category: 'taller',
    icon: '🔧',
    color: '#FFD600',
    latitude: -32.9341,
    longitude: -68.8472,
    altitudeM: 785,
    description: 'Estación de inflado, hidratación gratuita y nodo central de la Ciclovía Troncal.',
  },

  // --- POTRERILLOS & EL SALTO ---
  {
    id: 'poi-potrerillos-bahia',
    name: 'Bahía de los Vientos & Embarcadero Potrerillos',
    category: 'trailhead',
    icon: '⛵',
    color: '#00E5FF',
    latitude: -32.9620,
    longitude: -69.1980,
    altitudeM: 1380,
    description: 'Punto de partida para el circuito perilago y deportes de viento sobre el lago turquesa.',
  },
  {
    id: 'poi-guardaparques-potrerillos',
    name: 'Puesto de Guardaparques & Mirador Perilago',
    category: 'mirador',
    icon: '👁️',
    color: '#00E676',
    latitude: -32.9780,
    longitude: -69.2150,
    altitudeM: 1480,
    description: 'Mirador elevado sobre el murallón del dique con vista al Cordón del Plata nevado.',
  },
  {
    id: 'poi-el-salto-parador',
    name: 'Parador Quebrada del Salto (Las Vegas)',
    category: 'trailhead',
    icon: '🏁',
    color: '#FF9100',
    latitude: -33.0050,
    longitude: -69.2620,
    altitudeM: 1850,
    description: 'Trailhead oficial para el ascenso a pie hacia la Cascada del Salto en Las Vegas.',
  },
  {
    id: 'poi-cascada-salto',
    name: 'Cascada Natural del Salto (Vertiente de Altura)',
    category: 'vertiente',
    icon: '🌊',
    color: '#00E5FF',
    latitude: -33.0180,
    longitude: -69.2840,
    altitudeM: 2160,
    description: 'Hermosa caída de agua pura de deshielo entre paredones andinos y bosques de altura.',
  },

  // --- SAN RAFAEL (ATUEL & REYUNOS) ---
  {
    id: 'poi-valle-grande-canon',
    name: 'Mirador El Submarino (Cañón del Atuel)',
    category: 'mirador',
    icon: '👁️',
    color: '#FF9100',
    latitude: -34.8250,
    longitude: -68.4950,
    altitudeM: 890,
    description: 'Formación rocosa emblemática esculpida por el viento y el agua en el Cañón del Atuel.',
  },
  {
    id: 'poi-presa-valle-grande',
    name: 'Presa & Murallón Valle Grande',
    category: 'trailhead',
    icon: '🏁',
    color: '#00E5FF',
    latitude: -34.8110,
    longitude: -68.4820,
    altitudeM: 820,
    description: 'Inicio del perilago y punto de encuentro para actividades náuticas y pedestres.',
  },
  {
    id: 'poi-reyunos-club',
    name: 'Club Náutico Los Reyunos & Embarcadero',
    category: 'trailhead',
    icon: '⛵',
    color: '#00E676',
    latitude: -34.5950,
    longitude: -68.6420,
    altitudeM: 960,
    description: 'Acceso a senderos costeros de la Presa Los Reyunos y tirolesa del cañón.',
  },
  {
    id: 'poi-mirador-diamante',
    name: 'Mirador Cañón del Río Diamante (Los Reyunos)',
    category: 'mirador',
    icon: '👁️',
    color: '#E040FB',
    latitude: -34.5820,
    longitude: -68.6550,
    altitudeM: 1110,
    description: 'Vista panorámica impresionante a las aguas esmeralda y los paredones de basalto.',
  },
];

// ============================================================================
// ALERTAS EN VIVO Y COMUNIDAD (WAZE DE LA MONTAÑA)
// ============================================================================

export const INITIAL_MENDOZA_INCIDENTS: TrailIncident[] = [
  {
    id: 'inc-1',
    type: 'landslide',
    title: 'Rocas y piedras sueltas en Zetas del Cerro Arco',
    description: 'Derrumbe leve en curva 4 de ascenso a las antenas tras lluvias recientes. Precaución al descender en bici.',
    severity: 'media',
    latitude: -32.8340,
    longitude: -68.9430,
    reportedAt: 'Hace 45 min',
    affectedModes: ['sendero_mtb', 'moto_trail', 'trekking'],
    upvotes: 7,
    resolvedVotes: 0,
    author: 'Martín (Biker)',
  },
  {
    id: 'inc-2',
    type: 'thorns',
    title: 'Rosetas y espinas vivas en Singletrack Teletubbies',
    description: 'Abundante roseta seca en la huella baja. Se aconseja líquido tubeless en cubiertas y polainas para corredores.',
    severity: 'baja',
    latitude: -33.0048,
    longitude: -68.8972,
    reportedAt: 'Hace 2 horas',
    affectedModes: ['sendero_mtb', 'trekking'],
    upvotes: 12,
    resolvedVotes: 1,
    author: 'Sofi (Trail Runner)',
  },
  {
    id: 'inc-3',
    type: 'animals',
    title: 'Ganado y perros pastores cerca de Puesto San Isidro',
    description: 'Cabras y perros pastores sueltos en el cruce de quebrada. Reducir velocidad y mantener mascotas con correa.',
    severity: 'media',
    latitude: -32.8320,
    longitude: -68.9360,
    reportedAt: 'Hace 3 horas',
    affectedModes: ['trekking', 'sendero_mtb'],
    upvotes: 9,
    resolvedVotes: 0,
    author: 'Gonzalo MTB',
  },
  {
    id: 'inc-4',
    type: 'water',
    title: 'Barro denso y vertiente activa en Cañadón Frías',
    description: 'Agua estancada con greda resbaladiza en el vado bajo del dique. Cruzar a pie para evitar derrapes.',
    severity: 'baja',
    latitude: -32.8980,
    longitude: -68.9020,
    reportedAt: 'Hace 5 horas',
    affectedModes: ['sendero_mtb', 'ciclovia', 'trekking'],
    upvotes: 4,
    resolvedVotes: 0,
    author: 'Lucía B.',
  },
  {
    id: 'inc-5',
    type: 'blocked',
    title: 'Obras de ensanche en Ciclovía Godoy Cruz / Belgrano',
    description: 'Desvío de 50 metros por calzada señalizada a la altura de calle Pellegrini. Precaución con peatones.',
    severity: 'media',
    latitude: -32.9150,
    longitude: -68.8450,
    reportedAt: 'Ayer',
    affectedModes: ['ciclovia', 'trekking'],
    upvotes: 18,
    resolvedVotes: 2,
    author: 'Guardia Urbana GC',
  },
];

// ============================================================================
// PERFIL MÉDICO SOS & SEGURIDAD (FASE 2)
// ============================================================================

export const DEFAULT_MEDICAL_PROFILE: MedicalProfile = {
  fullName: 'Maximiliano Di Natale',
  bloodType: 'O+',
  allergies: 'Ninguna conocida',
  medicalNotes: 'Sin antecedentes cardíacos. Deportista habitual.',
  emergencyContactPhone: '+5492615551234',
  healthInsurance: 'OSDE / Particular',
};

// ============================================================================
// ÁREAS PROTEGIDAS Y CONVIVENCIA (FASE 3)
// ============================================================================

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

// ============================================================================
// PASAPORTE DE CUMBRES & GAMIFICACIÓN (FASE 5)
// ============================================================================

export const MENDOZA_SUMMITS: SummitItem[] = [
  {
    id: 'cerro-arco',
    name: 'Cerro Arco (Antenas)',
    elevationM: 1680,
    latitude: -32.8280,
    longitude: -68.9560,
    difficulty: 'Moderado',
    zone: 'El Challao / Las Heras',
    description: 'El coloso clásico de los mendocinos. Coroná la cumbre junto a las antenas y contemplá una vista panorámica de 360° al Gran Mendoza y el Cordón del Plata.',
    badgeTitle: 'Centinela del Challao',
    badgeIcon: '🏹',
    radiusMeters: 200,
  },
  {
    id: 'cerro-de-la-gloria',
    name: 'Cerro de la Gloria',
    elevationM: 980,
    latitude: -32.8868,
    longitude: -68.8930,
    difficulty: 'Fácil',
    zone: 'Ciudad / Parque San Martín',
    description: 'Hito histórico y cumbre urbana por excelencia. Coroná en la cima del Monumento al Ejército de Los Andes con vista al Parque y la ciudad.',
    badgeTitle: 'Corona de la Gloria',
    badgeIcon: '🦅',
    radiusMeters: 150,
  },
  {
    id: 'cerro-santo-tomas',
    name: 'Cerro Santo Tomás',
    elevationM: 1820,
    latitude: -32.8210,
    longitude: -68.9720,
    difficulty: 'Exigente',
    zone: 'Precordillera Profunda / Challao',
    description: 'Cumbre agreste al norte del Cerro Arco. Filo ventoso con avistaje frecuente de cóndores andinos y vistas vírgenes hacia Uspallata.',
    badgeTitle: 'Guardián del Filo',
    badgeIcon: '⛰️',
    radiusMeters: 200,
  },
  {
    id: 'cerro-aspero',
    name: 'Cerro Áspero',
    elevationM: 1450,
    latitude: -32.8480,
    longitude: -68.9410,
    difficulty: 'Moderado',
    zone: 'El Challao / Quebrada San Isidro',
    description: 'Pendiente pronunciada con sendero técnico de acarreos y rocas sueltas. Gran reto de fuerza y entrenamiento para trail runners.',
    badgeTitle: 'Furia del Áspero',
    badgeIcon: '⚡',
    radiusMeters: 180,
  },
  {
    id: 'cerro-comision',
    name: 'Cerro Comisión',
    elevationM: 1890,
    latitude: -32.8710,
    longitude: -68.9680,
    difficulty: 'Exigente',
    zone: 'Precordillera Central',
    description: 'Una de las cumbres más emblemáticas de la precordillera mendocina, coronando el hito geodésico superior sobre el Dique Frías y San Isidro.',
    badgeTitle: 'Cumbre de la Comisión',
    badgeIcon: '🎖️',
    radiusMeters: 200,
  },
  {
    id: 'cerro-gateado',
    name: 'Cerro Gateado',
    elevationM: 2130,
    latitude: -32.8110,
    longitude: -68.9720,
    difficulty: 'Exigente',
    zone: 'Precordillera Alta / Challao',
    description: 'Cumbre de más de 2.100 msnm con impresionante panorama de la Cordillera de los Andes.',
    badgeTitle: 'Señor del Gateado',
    badgeIcon: '🏆',
    radiusMeters: 220,
  },
];

export const INITIAL_SUMMIT_CHECKINS: Record<string, SummitCheckIn> = {
  'cerro-de-la-gloria': {
    summitId: 'cerro-de-la-gloria',
    unlockedAt: 'Ayer 18:45',
    elevationGainM: 120,
  },
};

export const INITIAL_SUMMIT_BADGES: SummitBadge[] = [
  {
    id: 'badge-primera-cumbre',
    title: 'Bautismo de Cumbre',
    description: 'Conquistaste tu primera cima registrada en Mendoza.',
    icon: '🥾',
    unlocked: true,
    unlockedAt: 'Ayer',
    requirement: 'Hacer 1 cumbre',
  },
  {
    id: 'badge-gloria-urbana',
    title: 'Corona de la Gloria',
    description: 'Hiciste cumbre en el Monumento del Cerro de la Gloria.',
    icon: '🦅',
    unlocked: true,
    unlockedAt: 'Ayer',
    requirement: 'Hacer cumbre en Cerro de la Gloria',
  },
  {
    id: 'badge-centinela-arco',
    title: 'Cazador del Arco',
    description: 'Alcanzaste las míticas antenas del Cerro Arco (1.680 m).',
    icon: '🏹',
    unlocked: false,
    requirement: 'Hacer cumbre en Cerro Arco',
  },
  {
    id: 'badge-maestro-precordillera',
    title: 'Maestro Precordillerano',
    description: 'Conquistaste 3 o más cumbres del Pasaporte Mendocino.',
    icon: '👑',
    unlocked: false,
    requirement: 'Hacer 3 cumbres',
  },
  {
    id: 'badge-desnivel-oro',
    title: 'Señor del Desnivel (+1.000m)',
    description: 'Superaste los 1.000 metros de desnivel vertical acumulado.',
    icon: '📈',
    unlocked: false,
    requirement: '+1.000m de desnivel acumulado',
  },
];

export const INITIAL_INCIDENTS = INITIAL_MENDOZA_INCIDENTS;

export const MENDOZA_EMERGENCY_NUMBERS = [
  { name: '911 Emergencias Mendoza', number: '911', desc: 'Policía, Ambulancia y Bomberos' },
  { name: 'Patrulla de Rescate de Alta Montaña (UPRAM)', number: '2614444444', desc: 'Policía de Mendoza - Rescate en Cerros y Cordillera' },
  { name: 'Defensa Civil Mendoza', number: '103', desc: 'Emergencias climáticas, Zonda y aluviones' },
  { name: 'Bomberos Mendoza', number: '100', desc: 'Rescate urbano y forestal' },
];

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
