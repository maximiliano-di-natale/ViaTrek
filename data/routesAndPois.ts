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
    "id": "todas",
    "name": "Todo Cuyo",
    "icon": "🗺️",
    "province": "Cuyo",
    "description": "Red unificada de senderos y cumbres de Mendoza, San Juan y San Luis",
    "center": {
      "latitude": -32.8895,
      "longitude": -68.865
    },
    "latitudeDelta": 0.6,
    "longitudeDelta": 0.6
  },
  {
    "id": "challao_arco",
    "name": "El Challao & Arco",
    "icon": "⛰️",
    "province": "Mendoza (Las Heras)",
    "description": "Ascenso al Cerro Arco, Santo Tomás, Gateado y Quebrada de San Isidro",
    "center": {
      "latitude": -32.835,
      "longitude": -68.945
    },
    "latitudeDelta": 0.09,
    "longitudeDelta": 0.09
  },
  {
    "id": "chacras",
    "name": "Chacras & Pedemonte",
    "icon": "🌵",
    "province": "Mendoza (Luján)",
    "description": "Cerro Negro de Chacras, Cerro Peni, Teletubbies y El Álamo",
    "center": {
      "latitude": -33.0035,
      "longitude": -68.898
    },
    "latitudeDelta": 0.08,
    "longitudeDelta": 0.08
  },
  {
    "id": "frias_gloria",
    "name": "Gloria & Frías",
    "icon": "🌳",
    "province": "Mendoza (Capital / GC)",
    "description": "Monumento Cerro de la Gloria, Cerro Comisión, Parque y Dique Frías",
    "center": {
      "latitude": -32.887,
      "longitude": -68.885
    },
    "latitudeDelta": 0.07,
    "longitudeDelta": 0.07
  },
  {
    "id": "potrerillos",
    "name": "Potrerillos & Vallecitos",
    "icon": "🏔️",
    "province": "Mendoza (Cordón del Plata)",
    "description": "Perilago Dique Potrerillos, Cascada del Salto y Cerro Lomas Blancas (Vallecitos)",
    "center": {
      "latitude": -32.965,
      "longitude": -69.215
    },
    "latitudeDelta": 0.16,
    "longitudeDelta": 0.16
  },
  {
    "id": "san_rafael",
    "name": "San Rafael & Atuel",
    "icon": "🧗",
    "province": "Mendoza (San Rafael)",
    "description": "Cañón del Atuel, Valle Grande y circuitos de Los Reyunos",
    "center": {
      "latitude": -34.78,
      "longitude": -68.45
    },
    "latitudeDelta": 0.35,
    "longitudeDelta": 0.35
  },
  {
    "id": "san_juan_ullum",
    "name": "Ullum & Zonda",
    "icon": "☀️",
    "province": "San Juan",
    "description": "Ascenso a Cerro Tres Marías, Cerro Blanco y Quebrada de Zonda",
    "center": {
      "latitude": -31.545,
      "longitude": -68.685
    },
    "latitudeDelta": 0.14,
    "longitudeDelta": 0.14
  },
  {
    "id": "san_juan_barreal",
    "name": "Barreal & El Leoncito",
    "icon": "🔭",
    "province": "San Juan (Calingasta)",
    "description": "Cerro El Leoncito, Parque Nacional, CASLEO y Pampa del Leoncito",
    "center": {
      "latitude": -31.795,
      "longitude": -69.375
    },
    "latitudeDelta": 0.22,
    "longitudeDelta": 0.22
  },
  {
    "id": "san_luis_merlo",
    "name": "Merlo & Comechingones",
    "icon": "🦅",
    "province": "San Luis",
    "description": "Cerro de las Ovejas (Techo de San Luis), Filo Serrano y Salto del Tabaquillo",
    "center": {
      "latitude": -32.355,
      "longitude": -64.975
    },
    "latitudeDelta": 0.15,
    "longitudeDelta": 0.15
  },
  {
    "id": "san_luis_potrero",
    "name": "Potrero & Tomolasta",
    "icon": "🏞️",
    "province": "San Luis",
    "description": "Cerro Valle de Piedra, Salto de la Moneda y Cerro Tomolasta (La Carolina)",
    "center": {
      "latitude": -33.15,
      "longitude": -66.15
    },
    "latitudeDelta": 0.35,
    "longitudeDelta": 0.35
  }
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
        "isSummitAscent": true,
    "baseElevationM": 980,
    "summitElevationM": 1150,
    "basePointName": "Puesto Atamisqui (Base Chacras - 980 msnm)",
    "summitPointName": "Cumbre Cerro Peni (1.150 msnm)",
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
        "isSummitAscent": true,
    "baseElevationM": 1140,
    "summitElevationM": 1680,
    "basePointName": "Puerta de la Quebrada (Base El Challao - 1.140 msnm)",
    "summitPointName": "Cumbre Cerro Arco (Antenas 1.680 msnm)",
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
        "isSummitAscent": true,
    "baseElevationM": 1140,
    "summitElevationM": 2130,
    "basePointName": "Puerta de la Quebrada / San Isidro (1.140 msnm)",
    "summitPointName": "Cumbre Cerro Gateado (2.130 msnm)",
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
        "isSummitAscent": true,
    "baseElevationM": 810,
    "summitElevationM": 980,
    "basePointName": "Portones del Parque San Martín (810 msnm)",
    "summitPointName": "Monumento Cumbre Cerro de la Gloria (980 msnm)",
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
  },
  {
  "id": "sendero-ascenso-santo-tomas",
  "name": "Ascenso Base a Cumbre Cerro Santo Tomás (1.820 m)",
  "zone": "El Challao Precordillera / Las Heras",
  "regionId": "challao_arco",
  "type": "trekking",
  "distanceKm": 11.4,
  "elevationGainM": 680,
  "difficulty": "Técnico",
  "surface": "Ripio/Tierra",
  "strokeColor": "#FF6D00",
  "isSummitAscent": true,
  "baseElevationM": 1140,
  "summitElevationM": 1820,
  "basePointName": "Puerta de la Quebrada (Base El Challao - 1.140 msnm)",
  "summitPointName": "Cumbre Cerro Santo Tomás (1.820 msnm)",
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
      "latitude": -32.831,
      "longitude": -68.95
    },
    {
      "latitude": -32.827,
      "longitude": -68.958
    },
    {
      "latitude": -32.8245,
      "longitude": -68.965
    },
    {
      "latitude": -32.821,
      "longitude": -68.972
    }
  ],
  "elevationProfile": {
    "minElevM": 1140,
    "maxElevM": 1820,
    "elevationGainM": 680,
    "points": [
      1140,
      1260,
      1380,
      1510,
      1620,
      1710,
      1780,
      1820
    ]
  },
  "gpxFileName": "viatrek_ascenso_cerro_santo_tomas.gpx",
  "legality": {
    "status": "compartido_precaucion",
    "badgeText": "🏔️ Trekking Agreste: Filo Ventoso",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Sendero de altura con piedras sueltas y vientos fuertes. Se requiere abrigo y abundante agua.",
    "authority": "Municipalidad de Las Heras"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Puerta de la Quebrada",
      "icon": "🅿️",
      "latitude": -32.842,
      "longitude": -68.924,
      "description": "Inicio oficial del ascenso (1.140 msnm). Estacionamiento y cantina."
    },
    {
      "title": "Desvío Filo Santo Tomás",
      "icon": "🪧",
      "latitude": -32.831,
      "longitude": -68.95,
      "description": "Bifurcación que se separa de la huella al Arco rumbo norte."
    },
    {
      "title": "Filo Panorámico & Nido de Cóndores",
      "icon": "🦅",
      "latitude": -32.8245,
      "longitude": -68.965,
      "description": "Avistaje frecuente de cóndores andinos y vista a Uspallata."
    },
    {
      "title": "Cima: Cumbre Cerro Santo Tomás",
      "icon": "🏆",
      "latitude": -32.821,
      "longitude": -68.972,
      "description": "Llegada a la cumbre (1.820 msnm). Hito de piedras y vista 360°."
    }
  ],
  "description": "Ruta completa y continua desde la base en Puerta de la Quebrada hasta la cima del Cerro Santo Tomás por el filo norte.",
  "author": {
    "name": "Maxi Di Natale",
    "role": "Guía de Precordillera",
    "applauseCount": 124,
    "commentsCount": 16
  }
},
  {
  "id": "sendero-ascenso-cerro-aspero",
  "name": "Ascenso Base a Cumbre Cerro Áspero (1.450 m)",
  "zone": "El Challao / Quebrada San Isidro",
  "regionId": "challao_arco",
  "type": "trekking",
  "distanceKm": 5.6,
  "elevationGainM": 270,
  "difficulty": "Moderado",
  "surface": "Ripio/Tierra",
  "strokeColor": "#E040FB",
  "isSummitAscent": true,
  "baseElevationM": 1180,
  "summitElevationM": 1450,
  "basePointName": "Puesto San Isidro (Base Quebrada - 1.180 msnm)",
  "summitPointName": "Cumbre Cerro Áspero (1.450 msnm)",
  "coordinates": [
    {
      "latitude": -32.832,
      "longitude": -68.936
    },
    {
      "latitude": -32.836,
      "longitude": -68.9385
    },
    {
      "latitude": -32.841,
      "longitude": -68.9395
    },
    {
      "latitude": -32.845,
      "longitude": -68.9405
    },
    {
      "latitude": -32.848,
      "longitude": -68.941
    }
  ],
  "elevationProfile": {
    "minElevM": 1180,
    "maxElevM": 1450,
    "elevationGainM": 270,
    "points": [
      1180,
      1240,
      1310,
      1390,
      1450
    ]
  },
  "gpxFileName": "viatrek_ascenso_cerro_aspero.gpx",
  "legality": {
    "status": "libre",
    "badgeText": "🌟 Sendero Pedestre Tradicional",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Acarreo técnico empinado. Uso de calzado con buen agarre.",
    "authority": "Comunidad San Isidro"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Puesto San Isidro",
      "icon": "🅿️",
      "latitude": -32.832,
      "longitude": -68.936,
      "description": "Puesto ganadero tradicional (1.180 msnm)."
    },
    {
      "title": "Acarreo & Canaleta del Áspero",
      "icon": "🧗",
      "latitude": -32.841,
      "longitude": -68.9395,
      "description": "Tramo de mayor pendiente sobre roca partida."
    },
    {
      "title": "Cima: Cumbre Cerro Áspero",
      "icon": "🏆",
      "latitude": -32.848,
      "longitude": -68.941,
      "description": "Cumbre panorámica (1.450 msnm) frente al Cerro Arco."
    }
  ],
  "description": "Ascenso directo y exigente de pendiente sostenida hacia la cumbre del Cerro Áspero.",
  "author": {
    "name": "Comunidad Trail Challao",
    "role": "Exploradores",
    "applauseCount": 88,
    "commentsCount": 9
  }
},
  {
  "id": "sendero-ascenso-cerro-comision",
  "name": "Ascenso Base a Cumbre Cerro Comisión (1.890 m)",
  "zone": "Precordillera Central / Divisadero Largo",
  "regionId": "frias_gloria",
  "type": "trekking",
  "distanceKm": 13.8,
  "elevationGainM": 870,
  "difficulty": "Técnico",
  "surface": "Ripio/Tierra",
  "strokeColor": "#FF9100",
  "isSummitAscent": true,
  "baseElevationM": 1020,
  "summitElevationM": 1890,
  "basePointName": "Reserva Divisadero Largo (1.020 msnm)",
  "summitPointName": "Cumbre Cerro Comisión (1.890 msnm)",
  "coordinates": [
    {
      "latitude": -32.874,
      "longitude": -68.928
    },
    {
      "latitude": -32.8735,
      "longitude": -68.937
    },
    {
      "latitude": -32.8728,
      "longitude": -68.945
    },
    {
      "latitude": -32.872,
      "longitude": -68.953
    },
    {
      "latitude": -32.8715,
      "longitude": -68.961
    },
    {
      "latitude": -32.871,
      "longitude": -68.968
    }
  ],
  "elevationProfile": {
    "minElevM": 1020,
    "maxElevM": 1890,
    "elevationGainM": 870,
    "points": [
      1020,
      1180,
      1340,
      1510,
      1690,
      1890
    ]
  },
  "gpxFileName": "viatrek_ascenso_cerro_comision.gpx",
  "legality": {
    "status": "compartido_precaucion",
    "badgeText": "🛡️ Reserva Natural Protegida",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Registro previo en Seccional Guardaparques Divisadero Largo. Prohibido salirse de la huella.",
    "authority": "Dirección de Recursos Naturales Renovables"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Seccional Divisadero Largo",
      "icon": "🅿️",
      "latitude": -32.874,
      "longitude": -68.928,
      "description": "Centro de interpretación y registro de guardaparques (1.020 msnm)."
    },
    {
      "title": "Falla Geológica & Cañadón",
      "icon": "🪨",
      "latitude": -32.8728,
      "longitude": -68.945,
      "description": "Estratos fósiles del período Triásico."
    },
    {
      "title": "Filo Cumbrero de la Comisión",
      "icon": "⛰️",
      "latitude": -32.8715,
      "longitude": -68.961,
      "description": "Cresta con imponentes vistas al Gran Mendoza y Cordón del Plata."
    },
    {
      "title": "Cima: Hito Cumbre Cerro Comisión",
      "icon": "🏆",
      "latitude": -32.871,
      "longitude": -68.968,
      "description": "Punto culminante geodésico (1.890 msnm)."
    }
  ],
  "description": "La travesía precordillerana reina desde Divisadero Largo hasta el hito superior del Cerro Comisión.",
  "author": {
    "name": "Mendoza Mountain Club",
    "role": "Guías de Montaña",
    "applauseCount": 154,
    "commentsCount": 22
  }
},
  {
  "id": "sendero-ascenso-negro-chacras",
  "name": "Ascenso Base a Cumbre Cerro Negro de Chacras (1.320 m)",
  "zone": "Chacras de Coria / Pedemonte",
  "regionId": "chacras",
  "type": "trekking",
  "distanceKm": 6.2,
  "elevationGainM": 310,
  "difficulty": "Moderado",
  "surface": "Ripio/Tierra",
  "strokeColor": "#00E676",
  "isSummitAscent": true,
  "baseElevationM": 1010,
  "summitElevationM": 1320,
  "basePointName": "Puesto Atamisqui (Base Chacras - 1.010 msnm)",
  "summitPointName": "Cumbre Cerro Negro (1.320 msnm)",
  "coordinates": [
    {
      "latitude": -33.0062,
      "longitude": -68.8965
    },
    {
      "latitude": -33.004,
      "longitude": -68.904
    },
    {
      "latitude": -33.0015,
      "longitude": -68.912
    },
    {
      "latitude": -32.9985,
      "longitude": -68.921
    },
    {
      "latitude": -32.996,
      "longitude": -68.928
    }
  ],
  "elevationProfile": {
    "minElevM": 1010,
    "maxElevM": 1320,
    "elevationGainM": 310,
    "points": [
      1010,
      1080,
      1160,
      1240,
      1320
    ]
  },
  "gpxFileName": "viatrek_ascenso_cerro_negro_chacras.gpx",
  "legality": {
    "status": "compartido_precaucion",
    "badgeText": "🌟 Multimodal: Trekking & MTB",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": true,
      "moto": false
    },
    "priorityRule": "Peatones tienen prioridad. En bajada ceder paso a quienes suben.",
    "authority": "Municipio de Luján de Cuyo"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Puesto Atamisqui",
      "icon": "🅿️",
      "latitude": -33.0062,
      "longitude": -68.8965,
      "description": "Trailhead principal con estacionamiento y agua (1.010 msnm)."
    },
    {
      "title": "Mirador del Álamo",
      "icon": "👁️",
      "latitude": -33.0015,
      "longitude": -68.912,
      "description": "Vista a la Quebrada del Álamo y oasis precordillerano."
    },
    {
      "title": "Cima: Cumbre Cerro Negro de Chacras",
      "icon": "🏆",
      "latitude": -32.996,
      "longitude": -68.928,
      "description": "Cima con apacheta de piedras y vista completa al Valle de Luján (1.320 msnm)."
    }
  ],
  "description": "Ascenso cumbrero clásico del Pedemonte de Chacras desde Puesto Atamisqui hasta la cima del Cerro Negro.",
  "author": {
    "name": "Chacras Trail Runners",
    "role": "Comunidad MTB & Trail",
    "applauseCount": 112,
    "commentsCount": 14
  }
},
  {
  "id": "sendero-ascenso-vallecitos-lomas-blancas",
  "name": "Ascenso Base a Cumbre Cerro Lomas Blancas (3.650 m)",
  "zone": "Vallecitos / Cordón del Plata",
  "regionId": "potrerillos",
  "type": "trekking",
  "distanceKm": 7.8,
  "elevationGainM": 750,
  "difficulty": "Técnico",
  "surface": "Ripio/Tierra",
  "strokeColor": "#00E5FF",
  "isSummitAscent": true,
  "baseElevationM": 2900,
  "summitElevationM": 3650,
  "basePointName": "Refugios Vallecitos (San Bernardo - 2.900 msnm)",
  "summitPointName": "Cumbre Cerro Lomas Blancas (3.650 msnm)",
  "coordinates": [
    {
      "latitude": -32.973,
      "longitude": -69.375
    },
    {
      "latitude": -32.977,
      "longitude": -69.38
    },
    {
      "latitude": -32.981,
      "longitude": -69.385
    },
    {
      "latitude": -32.986,
      "longitude": -69.39
    },
    {
      "latitude": -32.992,
      "longitude": -69.395
    }
  ],
  "elevationProfile": {
    "minElevM": 2900,
    "maxElevM": 3650,
    "elevationGainM": 750,
    "points": [
      2900,
      3050,
      3220,
      3410,
      3650
    ]
  },
  "gpxFileName": "viatrek_ascenso_cerro_lomas_blancas.gpx",
  "legality": {
    "status": "compartido_precaucion",
    "badgeText": "🏔️ Alta Montaña Cordón del Plata",
    "tagColor": "#FF1744",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Parque Provincial Cordón del Plata. Registro obligatorio y equipo de alta montaña.",
    "authority": "Cuerpo de Guardaparques Vallecitos"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Refugios de Vallecitos",
      "icon": "🅿️",
      "latitude": -32.973,
      "longitude": -69.375,
      "description": "Centro de esquí histórico y refugios de montaña (2.900 msnm)."
    },
    {
      "title": "Campamento Las Veguitas & Arroyo",
      "icon": "💧",
      "latitude": -32.981,
      "longitude": -69.385,
      "description": "Vegas de altura con agua pura de deshielo (3.220 msnm)."
    },
    {
      "title": "Morena Frontal & Portezuelo",
      "icon": "🪨",
      "latitude": -32.986,
      "longitude": -69.39,
      "description": "Paso técnico hacia el filo cumbrero (3.410 msnm)."
    },
    {
      "title": "Cima: Cumbre Cerro Lomas Blancas",
      "icon": "🏆",
      "latitude": -32.992,
      "longitude": -69.395,
      "description": "Cumbre andina con cruz y vista colosal al Cerro Plata de 6.000 m (3.650 msnm)."
    }
  ],
  "description": "El bautismo clásico de alta montaña en el Cordón del Plata mendocino. Inicio en los refugios y cumbre a 3.650 msnm.",
  "author": {
    "name": "Escuela de Guías de Montaña",
    "role": "Alta Montaña",
    "applauseCount": 198,
    "commentsCount": 28
  }
},
  {
  "id": "sendero-ascenso-tres-marias-sanjuan",
  "name": "Ascenso Base a Cumbre Cerro Tres Marías (1.050 m)",
  "zone": "Dique de Ullum / San Juan",
  "regionId": "san_juan_ullum",
  "type": "trekking",
  "distanceKm": 5.4,
  "elevationGainM": 290,
  "difficulty": "Moderado",
  "surface": "Ripio/Tierra",
  "strokeColor": "#FFD600",
  "isSummitAscent": true,
  "baseElevationM": 760,
  "summitElevationM": 1050,
  "basePointName": "El Castillito / Paredón Dique de Ullum (760 msnm)",
  "summitPointName": "Cumbre Cerro Tres Marías (1.050 msnm)",
  "coordinates": [
    {
      "latitude": -31.543,
      "longitude": -68.681
    },
    {
      "latitude": -31.5442,
      "longitude": -68.686
    },
    {
      "latitude": -31.5455,
      "longitude": -68.6915
    },
    {
      "latitude": -31.547,
      "longitude": -68.698
    }
  ],
  "elevationProfile": {
    "minElevM": 760,
    "maxElevM": 1050,
    "elevationGainM": 290,
    "points": [
      760,
      830,
      920,
      990,
      1050
    ]
  },
  "gpxFileName": "viatrek_ascenso_tres_marias_sanjuan.gpx",
  "legality": {
    "status": "libre",
    "badgeText": "☀️ Clásico Sanjuanino: Dique de Ullum",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Sendero de filo expuesto al sol sanjuanino. Llevar abundante hidratación y protección solar.",
    "authority": "Secretaría de Deportes y Turismo San Juan"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: El Castillito / Dique Ullum",
      "icon": "🅿️",
      "latitude": -31.543,
      "longitude": -68.681,
      "description": "Estacionamiento y trailhead sobre la RP 60 (760 msnm)."
    },
    {
      "title": "Filo Panorámico sobre las Aguas de Ullum",
      "icon": "📷",
      "latitude": -31.5455,
      "longitude": -68.6915,
      "description": "Vistas al lago azul turquesa y al cordón de Zonda."
    },
    {
      "title": "Cima: Cumbre Cerro Tres Marías",
      "icon": "🏆",
      "latitude": -31.547,
      "longitude": -68.698,
      "description": "Cumbre emblemática con cruces del Vía Crucis (1.050 msnm)."
    }
  ],
  "description": "El ascenso más famoso de San Juan. Recorrido de filo sobre el Dique de Ullum con vistas panorámicas 360° al valle y las montañas.",
  "author": {
    "name": "Club Andino San Juan",
    "role": "Montañismo Sanjuanino",
    "applauseCount": 167,
    "commentsCount": 20
  }
},
  {
  "id": "sendero-ascenso-cerro-blanco-sanjuan",
  "name": "Ascenso Base a Cumbre Cerro Blanco (1.350 m)",
  "zone": "Quebrada de Zonda / Rivadavia",
  "regionId": "san_juan_ullum",
  "type": "trekking",
  "distanceKm": 7.2,
  "elevationGainM": 560,
  "difficulty": "Técnico",
  "surface": "Ripio/Tierra",
  "strokeColor": "#FF6D00",
  "isSummitAscent": true,
  "baseElevationM": 790,
  "summitElevationM": 1350,
  "basePointName": "Jardín de los Poetas / Camping Zonda (790 msnm)",
  "summitPointName": "Cumbre Cerro Blanco (1.350 msnm)",
  "coordinates": [
    {
      "latitude": -31.558,
      "longitude": -68.665
    },
    {
      "latitude": -31.562,
      "longitude": -68.669
    },
    {
      "latitude": -31.5665,
      "longitude": -68.6735
    },
    {
      "latitude": -31.57,
      "longitude": -68.677
    },
    {
      "latitude": -31.572,
      "longitude": -68.679
    }
  ],
  "elevationProfile": {
    "minElevM": 790,
    "maxElevM": 1350,
    "elevationGainM": 560,
    "points": [
      790,
      910,
      1040,
      1200,
      1350
    ]
  },
  "gpxFileName": "viatrek_ascenso_cerro_blanco_sanjuan.gpx",
  "legality": {
    "status": "compartido_precaucion",
    "badgeText": "☀️ Quebrada de Zonda: Exigente",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Acarreos calcáreos de fuerte pendiente. Prohibido arrojar residuos.",
    "authority": "Municipalidad de Rivadavia / Zonda"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Jardín de los Poetas",
      "icon": "🅿️",
      "latitude": -31.558,
      "longitude": -68.665,
      "description": "Acceso arbolado en la entrada a la Quebrada de Zonda (790 msnm)."
    },
    {
      "title": "Cañadón Calcáreo Blanco",
      "icon": "🪨",
      "latitude": -31.5665,
      "longitude": -68.6735,
      "description": "Paredones de caliza blanca que dan nombre al cerro."
    },
    {
      "title": "Cima: Cumbre Cerro Blanco",
      "icon": "🏆",
      "latitude": -31.572,
      "longitude": -68.679,
      "description": "Punto culminante con vista a toda la Quebrada y el Valle del Tulum (1.350 msnm)."
    }
  ],
  "description": "Ascenso continuo desde el Jardín de los Poetas por la quebrada y filo calcáreo hasta la cima del Cerro Blanco.",
  "author": {
    "name": "Guías de Zonda",
    "role": "Exploración Cuyo",
    "applauseCount": 94,
    "commentsCount": 11
  }
},
  {
  "id": "sendero-ascenso-el-leoncito-sanjuan",
  "name": "Ascenso Base a Cumbre Cerro El Leoncito (2.500 m)",
  "zone": "Parque Nacional El Leoncito / Calingasta",
  "regionId": "san_juan_barreal",
  "type": "trekking",
  "distanceKm": 6.8,
  "elevationGainM": 350,
  "difficulty": "Moderado",
  "surface": "Ripio/Tierra",
  "strokeColor": "#00E5FF",
  "isSummitAscent": true,
  "baseElevationM": 2150,
  "summitElevationM": 2500,
  "basePointName": "Centro de Visitantes Parque Nacional El Leoncito (2.150 msnm)",
  "summitPointName": "Cumbre Cerro El Leoncito (2.500 msnm)",
  "coordinates": [
    {
      "latitude": -31.798,
      "longitude": -69.352
    },
    {
      "latitude": -31.802,
      "longitude": -69.347
    },
    {
      "latitude": -31.807,
      "longitude": -69.341
    },
    {
      "latitude": -31.812,
      "longitude": -69.336
    },
    {
      "latitude": -31.815,
      "longitude": -69.332
    }
  ],
  "elevationProfile": {
    "minElevM": 2150,
    "maxElevM": 2500,
    "elevationGainM": 350,
    "points": [
      2150,
      2220,
      2310,
      2410,
      2500
    ]
  },
  "gpxFileName": "viatrek_ascenso_cerro_el_leoncito.gpx",
  "legality": {
    "status": "compartido_precaucion",
    "badgeText": "🛡️ Parque Nacional: Cielo Más Diáfano",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Área protegida nacional. Registro en Seccional Guardaparques. Prohibido circular de noche.",
    "authority": "Administración de Parques Nacionales"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Centro de Visitantes P.N. El Leoncito",
      "icon": "🅿️",
      "latitude": -31.798,
      "longitude": -69.352,
      "description": "Seccional de guardaparques y área de estacionamiento (2.150 msnm)."
    },
    {
      "title": "Cascada El Rincón & Oasis",
      "icon": "💧",
      "latitude": -31.807,
      "longitude": -69.341,
      "description": "Hermosa vertiente de agua pura en medio del monte andino."
    },
    {
      "title": "Cima: Cumbre Cerro El Leoncito",
      "icon": "🏆",
      "latitude": -31.815,
      "longitude": -69.332,
      "description": "Mirador privilegiado al Observatorio CASLEO y la imponente Cordillera de Ansilta (2.500 msnm)."
    }
  ],
  "description": "Ascenso dentro del Parque Nacional El Leoncito con cielos prístinos y vista directa a los seismiles de la Cordillera de Ansilta.",
  "author": {
    "name": "Guardaparques Nacionales",
    "role": "Conservación",
    "applauseCount": 142,
    "commentsCount": 19
  }
},
  {
  "id": "sendero-punta-negra-sanjuan",
  "name": "Circuito Panorámico Dique Punta Negra & Los Caracoles",
  "zone": "Ullum / Zonda / San Juan",
  "regionId": "san_juan_ullum",
  "type": "sendero_mtb",
  "distanceKm": 8.2,
  "elevationGainM": 220,
  "difficulty": "Fácil",
  "surface": "Mixto",
  "strokeColor": "#00E676",
  "coordinates": [
    {
      "latitude": -31.528,
      "longitude": -68.805
    },
    {
      "latitude": -31.532,
      "longitude": -68.812
    },
    {
      "latitude": -31.536,
      "longitude": -68.818
    },
    {
      "latitude": -31.539,
      "longitude": -68.824
    },
    {
      "latitude": -31.542,
      "longitude": -68.831
    }
  ],
  "elevationProfile": {
    "minElevM": 880,
    "maxElevM": 1100,
    "elevationGainM": 220,
    "points": [
      880,
      930,
      990,
      1050,
      1100
    ]
  },
  "gpxFileName": "viatrek_punta_negra_sanjuan.gpx",
  "legality": {
    "status": "compartido_precaucion",
    "badgeText": "🌟 Multimodal: Trekking & Ciclismo",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": true,
      "moto": false
    },
    "priorityRule": "Perilago escénico de gran atractivo turístico.",
    "authority": "Gobierno de San Juan"
  },
  "isCircular": true,
  "waypoints": [
    {
      "title": "Embarcadero Punta Negra",
      "icon": "⛵",
      "latitude": -31.528,
      "longitude": -68.805,
      "description": "Base recreativa y mirador del embalse."
    },
    {
      "title": "Mirador Los Caracoles",
      "icon": "📷",
      "latitude": -31.536,
      "longitude": -68.818,
      "description": "Vista aérea a la garganta del Río San Juan."
    }
  ],
  "description": "Circuito de postal bordeando las aguas cristalinas del Dique Punta Negra y sus curvas panorámicas.",
  "author": {
    "name": "San Juan Aventura",
    "role": "Turismo Activo",
    "applauseCount": 115,
    "commentsCount": 12
  }
},
  {
  "id": "sendero-pampa-leoncito-barreal",
  "name": "Travesía Pampa del Leoncito & Barreal",
  "zone": "Barreal / Valle de Calingasta",
  "regionId": "san_juan_barreal",
  "type": "trekking",
  "distanceKm": 10.5,
  "elevationGainM": 120,
  "difficulty": "Fácil",
  "surface": "Ripio/Tierra",
  "strokeColor": "#FFD600",
  "coordinates": [
    {
      "latitude": -31.65,
      "longitude": -69.41
    },
    {
      "latitude": -31.662,
      "longitude": -69.405
    },
    {
      "latitude": -31.675,
      "longitude": -69.4
    },
    {
      "latitude": -31.69,
      "longitude": -69.395
    }
  ],
  "elevationProfile": {
    "minElevM": 1850,
    "maxElevM": 1970,
    "elevationGainM": 120,
    "points": [
      1850,
      1880,
      1920,
      1950,
      1970
    ]
  },
  "gpxFileName": "viatrek_pampa_leoncito_barreal.gpx",
  "legality": {
    "status": "libre",
    "badgeText": "⛵ Tierra de Carrovelismo & Cordillera",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": true,
      "moto": false
    },
    "priorityRule": "Suelo de arcilla natural cuarteada. Prohibido ingresar con vehículos a motor cuando el suelo esté húmedo.",
    "authority": "Municipalidad de Calingasta"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Acceso Barreal Histórico",
      "icon": "🏁",
      "latitude": -31.65,
      "longitude": -69.41,
      "description": "Punto de partida en el oasis de Barreal."
    },
    {
      "title": "Plataforma del Barreal Blanco",
      "icon": "⛵",
      "latitude": -31.675,
      "longitude": -69.4,
      "description": "La planicie de 12 km de largo donde sopla el viento para el carrovelismo."
    }
  ],
  "description": "La mítica Pampa del Leoncito con la silueta de los siete picos de Ansilta recortándose contra el cielo.",
  "author": {
    "name": "Calingasta Outdoors",
    "role": "Comunidad Local",
    "applauseCount": 130,
    "commentsCount": 15
  }
},
  {
  "id": "sendero-ascenso-ovejas-sanluis",
  "name": "Ascenso Base a Cumbre Cerro de las Ovejas (2.294 m - Techo de San Luis)",
  "zone": "Villa de Merlo / Sierra de Comechingones",
  "regionId": "san_luis_merlo",
  "type": "trekking",
  "distanceKm": 8.5,
  "elevationGainM": 154,
  "difficulty": "Moderado",
  "surface": "Ripio/Tierra",
  "strokeColor": "#FFD700",
  "isSummitAscent": true,
  "baseElevationM": 2140,
  "summitElevationM": 2294,
  "basePointName": "Mirador del Sol / Filo Serrano Merlo (2.140 msnm)",
  "summitPointName": "Cumbre Cerro de las Ovejas - Techo de San Luis (2.294 msnm)",
  "coordinates": [
    {
      "latitude": -32.355,
      "longitude": -64.965
    },
    {
      "latitude": -32.361,
      "longitude": -64.96
    },
    {
      "latitude": -32.368,
      "longitude": -64.955
    },
    {
      "latitude": -32.374,
      "longitude": -64.951
    },
    {
      "latitude": -32.378,
      "longitude": -64.948
    }
  ],
  "elevationProfile": {
    "minElevM": 2140,
    "maxElevM": 2294,
    "elevationGainM": 154,
    "points": [
      2140,
      2180,
      2220,
      2260,
      2294
    ]
  },
  "gpxFileName": "viatrek_ascenso_cerro_ovejas_sanluis.gpx",
  "legality": {
    "status": "libre",
    "badgeText": "🦅 Cumbre Techo de San Luis",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Cumbre más alta de San Luis en el límite con Córdoba. Zona de alta exposición a niebla repentina y frío.",
    "authority": "Secretaría de Turismo Villa de Merlo"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Mirador del Sol / Filo Serrano",
      "icon": "🅿️",
      "latitude": -32.355,
      "longitude": -64.965,
      "description": "Fin del asfalto y confitería del Filo Serrano de Merlo (2.140 msnm)."
    },
    {
      "title": "Límite Interprovincial San Luis - Córdoba",
      "icon": "🧭",
      "latitude": -32.368,
      "longitude": -64.955,
      "description": "Hito limítrofe sobre los pastizales de altura de las Sierras de Comechingones."
    },
    {
      "title": "Cima: Cumbre Cerro de las Ovejas (2.294 m)",
      "icon": "🏆",
      "latitude": -32.378,
      "longitude": -64.948,
      "description": "Techo de la provincia de San Luis con monolito cumbrero y vistas al Valle del Conlara."
    }
  ],
  "description": "Travesía de altura por el filo de los Comechingones para alcanzar la cima máxima de la provincia de San Luis.",
  "author": {
    "name": "Merlo Trekking Club",
    "role": "Guías de Comechingones",
    "applauseCount": 178,
    "commentsCount": 23
  }
},
  {
  "id": "sendero-ascenso-tomolasta-sanluis",
  "name": "Ascenso Base a Cumbre Cerro Tomolasta (2.018 m)",
  "zone": "La Carolina / Sierras Centrales de San Luis",
  "regionId": "san_luis_potrero",
  "type": "trekking",
  "distanceKm": 5.2,
  "elevationGainM": 408,
  "difficulty": "Moderado",
  "surface": "Ripio/Tierra",
  "strokeColor": "#FF6D00",
  "isSummitAscent": true,
  "baseElevationM": 1610,
  "summitElevationM": 2018,
  "basePointName": "Pueblo Histórico La Carolina (1.610 msnm)",
  "summitPointName": "Cumbre Cerro Tomolasta (2.018 msnm)",
  "coordinates": [
    {
      "latitude": -32.819,
      "longitude": -66.102
    },
    {
      "latitude": -32.815,
      "longitude": -66.106
    },
    {
      "latitude": -32.811,
      "longitude": -66.11
    },
    {
      "latitude": -32.808,
      "longitude": -66.1125
    },
    {
      "latitude": -32.805,
      "longitude": -66.115
    }
  ],
  "elevationProfile": {
    "minElevM": 1610,
    "maxElevM": 2018,
    "elevationGainM": 408,
    "points": [
      1610,
      1710,
      1810,
      1920,
      2018
    ]
  },
  "gpxFileName": "viatrek_ascenso_cerro_tomolasta.gpx",
  "legality": {
    "status": "libre",
    "badgeText": "⛏️ Cerro de los Mineros de Oro",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Sendero histórico con estaciones del Vía Crucis. Cuidar el patrimonio minero.",
    "authority": "Municipio de La Carolina"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Plaza Pueblo La Carolina",
      "icon": "🅿️",
      "latitude": -32.819,
      "longitude": -66.102,
      "description": "Pueblo minero colonial de calles empedradas (1.610 msnm)."
    },
    {
      "title": "Mina Histórica Buena Esperanza",
      "icon": "⛏️",
      "latitude": -32.811,
      "longitude": -66.11,
      "description": "Túneles auríferos coloniales del siglo XVIII."
    },
    {
      "title": "Cima: Cumbre Cerro Tomolasta (2.018 m)",
      "icon": "🏆",
      "latitude": -32.805,
      "longitude": -66.115,
      "description": "Vértice cumbrero y cúpula del observatorio astronómico con panorama de 360° a San Luis."
    }
  ],
  "description": "Ascenso cargado de historia desde el pueblo minero de La Carolina hasta el cono del Cerro Tomolasta.",
  "author": {
    "name": "Comunidad La Carolina",
    "role": "Patrimonio San Luis",
    "applauseCount": 133,
    "commentsCount": 16
  }
},
  {
  "id": "sendero-ascenso-valle-piedra-sanluis",
  "name": "Ascenso Base a Cumbre Cerro Valle de Piedra (1.450 m)",
  "zone": "Potrero de los Funes / San Luis",
  "regionId": "san_luis_potrero",
  "type": "trekking",
  "distanceKm": 6.4,
  "elevationGainM": 470,
  "difficulty": "Moderado",
  "surface": "Ripio/Tierra",
  "strokeColor": "#00E676",
  "isSummitAscent": true,
  "baseElevationM": 980,
  "summitElevationM": 1450,
  "basePointName": "Circuito Potrero de los Funes (980 msnm)",
  "summitPointName": "Cumbre Cerro Valle de Piedra (1.450 msnm)",
  "coordinates": [
    {
      "latitude": -33.228,
      "longitude": -66.235
    },
    {
      "latitude": -33.232,
      "longitude": -66.239
    },
    {
      "latitude": -33.236,
      "longitude": -66.244
    },
    {
      "latitude": -33.2395,
      "longitude": -66.248
    },
    {
      "latitude": -33.242,
      "longitude": -66.252
    }
  ],
  "elevationProfile": {
    "minElevM": 980,
    "maxElevM": 1450,
    "elevationGainM": 470,
    "points": [
      980,
      1090,
      1200,
      1330,
      1450
    ]
  },
  "gpxFileName": "viatrek_ascenso_valle_de_piedra.gpx",
  "legality": {
    "status": "libre",
    "badgeText": "🌊 Sierras de Potrero de los Funes",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Ascenso entre pastizales y quebradas. Llevar calzado cerrado.",
    "authority": "Municipalidad de Potrero de los Funes"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Punto Base: Acceso Circuito Potrero",
      "icon": "🅿️",
      "latitude": -33.228,
      "longitude": -66.235,
      "description": "Inicio junto al perilago del lago de Potrero (980 msnm)."
    },
    {
      "title": "Cruce Quebrada Salto de la Moneda",
      "icon": "💧",
      "latitude": -33.236,
      "longitude": -66.244,
      "description": "Paso junto al arroyo de aguas cristalinas."
    },
    {
      "title": "Cima: Cumbre Cerro Valle de Piedra",
      "icon": "🏆",
      "latitude": -33.242,
      "longitude": -66.252,
      "description": "Cumbre serrana con balcón natural a todo el lago y el valle (1.450 msnm)."
    }
  ],
  "description": "El mirador cumbrero más espectacular sobre el lago de Potrero de los Funes y las sierras centrales.",
  "author": {
    "name": "Sierras Puntanas Trail",
    "role": "Exploradores de San Luis",
    "applauseCount": 104,
    "commentsCount": 12
  }
},
  {
  "id": "sendero-salto-moneda-potrero",
  "name": "Sendero a la Cascada Salto de la Moneda (Potrero de los Funes)",
  "zone": "Potrero de los Funes / San Luis",
  "regionId": "san_luis_potrero",
  "type": "trekking",
  "distanceKm": 4.8,
  "elevationGainM": 190,
  "difficulty": "Fácil",
  "surface": "Ripio/Tierra",
  "strokeColor": "#00E5FF",
  "coordinates": [
    {
      "latitude": -33.228,
      "longitude": -66.235
    },
    {
      "latitude": -33.231,
      "longitude": -66.2375
    },
    {
      "latitude": -33.2345,
      "longitude": -66.24
    },
    {
      "latitude": -33.238,
      "longitude": -66.242
    }
  ],
  "elevationProfile": {
    "minElevM": 980,
    "maxElevM": 1080,
    "elevationGainM": 100,
    "points": [
      980,
      1010,
      1040,
      1060,
      1080
    ]
  },
  "gpxFileName": "viatrek_salto_de_la_moneda.gpx",
  "legality": {
    "status": "libre",
    "badgeText": "🌊 Cascada & Pozones de Agua Cristalina",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Sendero familiar. Piedras húmedas resbaladizas cerca de la cascada.",
    "authority": "Turismo Potrero de los Funes"
  },
  "isCircular": true,
  "waypoints": [
    {
      "title": "Base del Sendero",
      "icon": "🅿️",
      "latitude": -33.228,
      "longitude": -66.235,
      "description": "Estacionamiento y acceso."
    },
    {
      "title": "Cascada Salto de la Moneda (15 m)",
      "icon": "🌊",
      "latitude": -33.238,
      "longitude": -66.242,
      "description": "Salto de agua natural que cae sobre una olla esmeralda de 5 m de profundidad."
    }
  ],
  "description": "Caminata fresca entre helechos y quebradas que culmina en la imponente caída de agua del Salto de la Moneda.",
  "author": {
    "name": "Comunidad Potrero",
    "role": "Guías Locales",
    "applauseCount": 160,
    "commentsCount": 18
  }
},
  {
  "id": "sendero-salto-tabaquillo-merlo",
  "name": "Quebrada de los Tabaquillos & Salto del Tabaquillo (Merlo)",
  "zone": "Rincón del Este / Villa de Merlo",
  "regionId": "san_luis_merlo",
  "type": "trekking",
  "distanceKm": 6,
  "elevationGainM": 340,
  "difficulty": "Moderado",
  "surface": "Ripio/Tierra",
  "strokeColor": "#00E676",
  "coordinates": [
    {
      "latitude": -32.348,
      "longitude": -64.978
    },
    {
      "latitude": -32.351,
      "longitude": -64.973
    },
    {
      "latitude": -32.3535,
      "longitude": -64.968
    },
    {
      "latitude": -32.356,
      "longitude": -64.964
    }
  ],
  "elevationProfile": {
    "minElevM": 1200,
    "maxElevM": 1540,
    "elevationGainM": 340,
    "points": [
      1200,
      1280,
      1370,
      1460,
      1540
    ]
  },
  "gpxFileName": "viatrek_salto_tabaquillo_merlo.gpx",
  "legality": {
    "status": "libre",
    "badgeText": "🌲 Bosque de Tabaquillos & Cascada",
    "tagColor": "#00E676",
    "allowedModes": {
      "trekking": true,
      "bicycle": false,
      "moto": false
    },
    "priorityRule": "Se recomienda guía para cruce de piedras grandes en la garganta.",
    "authority": "Reserva Municipal Mogote Bayo"
  },
  "isCircular": false,
  "waypoints": [
    {
      "title": "Base Rincón del Este",
      "icon": "🅿️",
      "latitude": -32.348,
      "longitude": -64.978,
      "description": "Balneario municipal y trailhead (1.200 msnm)."
    },
    {
      "title": "Bosque de Tabaquillos",
      "icon": "🌲",
      "latitude": -32.3535,
      "longitude": -64.968,
      "description": "Especie arbórea andina de corteza rojiza exfoliante."
    },
    {
      "title": "Cascada Salto del Tabaquillo (18 m)",
      "icon": "🌊",
      "latitude": -32.356,
      "longitude": -64.964,
      "description": "Caída de agua encerrada entre paredones de granito."
    }
  ],
  "description": "Aventura encañonada remontando el arroyo del Molino hasta el salto de agua de 18 metros en Merlo.",
  "author": {
    "name": "Guías de Merlo",
    "role": "Turismo Aventura",
    "applauseCount": 145,
    "commentsCount": 21
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
  {
  "id": "poi-vallecitos-base-refugios",
  "name": "Base Refugios Vallecitos (2.900 m)",
  "category": "trailhead",
  "icon": "🛖",
  "color": "#00E5FF",
  "latitude": -32.973,
  "longitude": -69.375,
  "altitudeM": 2900,
  "description": "Trailhead principal del Cordón del Plata. Estacionamiento, Refugio San Bernardo y Refugio Mausy."
},
  {
  "id": "poi-vallecitos-las-veguitas",
  "name": "Campamento Las Veguitas & Vertiente (3.220 m)",
  "category": "vertiente",
  "icon": "💧",
  "color": "#00E676",
  "latitude": -32.981,
  "longitude": -69.385,
  "altitudeM": 3220,
  "description": "Oasis andino con surgente de agua pura de glaciar y zona de acampe para aclimatación."
},
  {
  "id": "poi-cumbre-lomas-blancas",
  "name": "Cumbre Cerro Lomas Blancas (3.650 m)",
  "category": "cumbre",
  "icon": "🏆",
  "color": "#FFD700",
  "latitude": -32.992,
  "longitude": -69.395,
  "altitudeM": 3650,
  "description": "Cumbre clásica de iniciación en alta montaña con vista impresionante al Cerro Plata y Vallecitos."
},
  {
  "id": "poi-cumbre-cerro-negro-chacras",
  "name": "Cumbre Cerro Negro de Chacras (1.320 m)",
  "category": "cumbre",
  "icon": "⛰️",
  "color": "#FFD700",
  "latitude": -32.996,
  "longitude": -68.928,
  "altitudeM": 1320,
  "description": "Cima más alta del sistema de senderos de Chacras de Coria con vista a la Precordillera y viñedos."
},
  {
  "id": "poi-cumbre-cerro-aspero",
  "name": "Cumbre Cerro Áspero (1.450 m)",
  "category": "cumbre",
  "icon": "⚡",
  "color": "#FFD700",
  "latitude": -32.848,
  "longitude": -68.941,
  "altitudeM": 1450,
  "description": "Cumbre escarpada frente al Cerro Arco con pendientes técnicas y vista al Challao."
},
  {
  "id": "poi-cumbre-cerro-comision",
  "name": "Hito Cumbre Cerro Comisión (1.890 m)",
  "category": "cumbre",
  "icon": "🎖️",
  "color": "#FF1744",
  "latitude": -32.871,
  "longitude": -68.968,
  "altitudeM": 1890,
  "description": "Vértice geodésico superior sobre el Dique Frías y Divisadero Largo con panorama 360°."
},
  {
  "id": "poi-vertiente-quebrada-san-isidro",
  "name": "Vertiente Quebrada de San Isidro (1.250 m)",
  "category": "vertiente",
  "icon": "💧",
  "color": "#00E5FF",
  "latitude": -32.8335,
  "longitude": -68.9375,
  "altitudeM": 1250,
  "description": "Aguada natural permanente en el cauce de la Quebrada de San Isidro."
},
  {
  "id": "poi-base-el-castillito-ullum",
  "name": "Base El Castillito / Dique de Ullum (760 m)",
  "category": "trailhead",
  "icon": "🅿️",
  "color": "#00E5FF",
  "latitude": -31.543,
  "longitude": -68.681,
  "altitudeM": 760,
  "description": "Punto de partida del ascenso al Cerro Tres Marías. Estacionamiento sobre RP 60 y vista al lago."
},
  {
  "id": "poi-cumbre-tres-marias-sanjuan",
  "name": "Cumbre Cerro Tres Marías (1.050 m)",
  "category": "cumbre",
  "icon": "🏆",
  "color": "#FFD700",
  "latitude": -31.547,
  "longitude": -68.698,
  "altitudeM": 1050,
  "description": "Cumbre mítica de San Juan sobre el filo del Dique de Ullum con cruces de cima y vista panorámica."
},
  {
  "id": "poi-base-jardin-poetas-zonda",
  "name": "Base Jardín de los Poetas / Camping Zonda (790 m)",
  "category": "trailhead",
  "icon": "🏁",
  "color": "#00E676",
  "latitude": -31.558,
  "longitude": -68.665,
  "altitudeM": 790,
  "description": "Acceso arbolado y punto de partida a las rutas de la Quebrada de Zonda."
},
  {
  "id": "poi-cumbre-cerro-blanco-sanjuan",
  "name": "Cumbre Cerro Blanco (1.350 m)",
  "category": "cumbre",
  "icon": "⛰️",
  "color": "#FFD700",
  "latitude": -31.572,
  "longitude": -68.679,
  "altitudeM": 1350,
  "description": "Paredones calcáreos y cumbre panorámica con vista al Autódromo Eduardo Copello y el Valle del Tulum."
},
  {
  "id": "poi-mirador-punta-negra",
  "name": "Mirador Dique Punta Negra (880 m)",
  "category": "mirador",
  "icon": "📷",
  "color": "#E040FB",
  "latitude": -31.528,
  "longitude": -68.805,
  "altitudeM": 880,
  "description": "Vista panorámica al lago turquesa encañonado entre los cerros de San Juan."
},
  {
  "id": "poi-base-guardaparques-el-leoncito",
  "name": "Centro Guardaparques P.N. El Leoncito (2.150 m)",
  "category": "trailhead",
  "icon": "🛡️",
  "color": "#00E676",
  "latitude": -31.798,
  "longitude": -69.352,
  "altitudeM": 2150,
  "description": "Seccional de registro obligatorio, área de acampe y centro de interpretación."
},
  {
  "id": "poi-cascada-el-rincon-sanjuan",
  "name": "Cascada El Rincón (2.280 m)",
  "category": "cascada",
  "icon": "💧",
  "color": "#00E5FF",
  "latitude": -31.807,
  "longitude": -69.341,
  "altitudeM": 2280,
  "description": "Salto de agua cristalina entre formaciones rocosas y sauces criollos protegidos."
},
  {
  "id": "poi-cumbre-cerro-el-leoncito",
  "name": "Cumbre Cerro El Leoncito (2.500 m)",
  "category": "cumbre",
  "icon": "🏆",
  "color": "#FFD700",
  "latitude": -31.815,
  "longitude": -69.332,
  "altitudeM": 2500,
  "description": "Cumbre del Parque Nacional con vista privilegiada a la Cordillera de Ansilta y CASLEO."
},
  {
  "id": "poi-observatorio-casleo",
  "name": "Complejo Astronómico El Leoncito (CASLEO - 2.552 m)",
  "category": "mirador",
  "icon": "🔭",
  "color": "#FFD600",
  "latitude": -31.7985,
  "longitude": -69.2955,
  "altitudeM": 2552,
  "description": "Uno de los observatorios astronómicos más importantes de Sudamérica por la pureza de sus cielos."
},
  {
  "id": "poi-pampa-leoncito-barreal",
  "name": "Pampa del Leoncito / Barreal Blanco (1.900 m)",
  "category": "foto_spot",
  "icon": "⛵",
  "color": "#FF9100",
  "latitude": -31.675,
  "longitude": -69.4,
  "altitudeM": 1900,
  "description": "Superficie de arcilla seca perfectamente plana de 12 km de extensión, capital del carrovelismo."
},
  {
  "id": "poi-base-filo-serrano-merlo",
  "name": "Base Filo Serrano & Mirador del Sol (2.140 m)",
  "category": "trailhead",
  "icon": "🅿️",
  "color": "#00E5FF",
  "latitude": -32.355,
  "longitude": -64.965,
  "altitudeM": 2140,
  "description": "Punto culminante de la ruta asfaltada de Merlo, confitería y acceso al trekking de cumbre."
},
  {
  "id": "poi-cumbre-cerro-ovejas-sanluis",
  "name": "Cumbre Cerro de las Ovejas - Techo de San Luis (2.294 m)",
  "category": "cumbre",
  "icon": "🏆",
  "color": "#FFD700",
  "latitude": -32.378,
  "longitude": -64.948,
  "altitudeM": 2294,
  "description": "La máxima altitud geográfica de la provincia de San Luis sobre la Sierra de Comechingones."
},
  {
  "id": "poi-base-rincon-del-este-merlo",
  "name": "Base Rincón del Este / Reserva Mogote Bayo (1.200 m)",
  "category": "trailhead",
  "icon": "🌲",
  "color": "#00E676",
  "latitude": -32.348,
  "longitude": -64.978,
  "altitudeM": 1200,
  "description": "Punto de partida en Merlo para el trekking al Salto del Tabaquillo y arroyo del Molino."
},
  {
  "id": "poi-cascada-salto-tabaquillo-merlo",
  "name": "Cascada Salto del Tabaquillo (1.540 m)",
  "category": "cascada",
  "icon": "🌊",
  "color": "#00E5FF",
  "latitude": -32.356,
  "longitude": -64.964,
  "altitudeM": 1540,
  "description": "Impresionante cascada de 18 metros enmarcada por un bosque relicto de tabaquillos andinos."
},
  {
  "id": "poi-base-pueblo-la-carolina",
  "name": "Base Pueblo Histórico La Carolina (1.610 m)",
  "category": "trailhead",
  "icon": "🅿️",
  "color": "#FFD600",
  "latitude": -32.819,
  "longitude": -66.102,
  "altitudeM": 1610,
  "description": "Pueblo colonial minero de oro fundado en 1792. Trailhead al Cerro Tomolasta."
},
  {
  "id": "poi-cumbre-cerro-tomolasta",
  "name": "Cumbre Cerro Tomolasta (2.018 m)",
  "category": "cumbre",
  "icon": "🏆",
  "color": "#FFD700",
  "latitude": -32.805,
  "longitude": -66.115,
  "altitudeM": 2018,
  "description": "Cono volcánico cumbrero con observatorio astronómico y vista a todas las sierras de San Luis."
},
  {
  "id": "poi-mina-buena-esperanza-carolina",
  "name": "Mina Histórica de Oro Buena Esperanza (1.650 m)",
  "category": "refugio_almacen",
  "icon": "⛏️",
  "color": "#FF9100",
  "latitude": -32.811,
  "longitude": -66.11,
  "altitudeM": 1650,
  "description": "Galerías subterráneas de extracción de oro con visitas guiadas."
},
  {
  "id": "poi-base-circuito-potrero-funes",
  "name": "Base Circuito Potrero de los Funes (980 m)",
  "category": "trailhead",
  "icon": "🅿️",
  "color": "#00E676",
  "latitude": -33.228,
  "longitude": -66.235,
  "altitudeM": 980,
  "description": "Acceso al sendero serrano junto al lago de Potrero de los Funes."
},
  {
  "id": "poi-cascada-salto-de-la-moneda",
  "name": "Cascada Salto de la Moneda (1.080 m)",
  "category": "cascada",
  "icon": "🌊",
  "color": "#00E5FF",
  "latitude": -33.238,
  "longitude": -66.242,
  "altitudeM": 1080,
  "description": "Salto de 15 metros y olla de agua cristalina alimentada por arroyos de sierra."
},
  {
  "id": "poi-cumbre-cerro-valle-de-piedra",
  "name": "Cumbre Cerro Valle de Piedra (1.450 m)",
  "category": "cumbre",
  "icon": "🏆",
  "color": "#FFD700",
  "latitude": -33.242,
  "longitude": -66.252,
  "altitudeM": 1450,
  "description": "Cumbre serrana con balcón natural de piedra sobre el espejo de agua de Potrero."
}
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
    "id": "cerro-arco",
    "name": "Cerro Arco (Antenas)",
    "elevationM": 1680,
    "latitude": -32.828,
    "longitude": -68.956,
    "difficulty": "Moderado",
    "zone": "El Challao / Las Heras",
    "province": "Mendoza",
    "description": "El coloso clásico de los mendocinos. Coroná la cumbre junto a las antenas con vista panorámica de 360° al Gran Mendoza y el Cordón del Plata.",
    "badgeTitle": "Centinela del Challao",
    "badgeIcon": "🏹",
    "radiusMeters": 200
  },
  {
    "id": "cerro-de-la-gloria",
    "name": "Cerro de la Gloria",
    "elevationM": 980,
    "latitude": -32.8868,
    "longitude": -68.893,
    "difficulty": "Fácil",
    "zone": "Ciudad / Parque San Martín",
    "province": "Mendoza",
    "description": "Hito histórico y cumbre urbana por excelencia. Coroná en la cima del Monumento al Ejército de Los Andes.",
    "badgeTitle": "Corona de la Gloria",
    "badgeIcon": "🦅",
    "radiusMeters": 150
  },
  {
    "id": "cerro-santo-tomas",
    "name": "Cerro Santo Tomás",
    "elevationM": 1820,
    "latitude": -32.821,
    "longitude": -68.972,
    "difficulty": "Exigente",
    "zone": "Precordillera Profunda / Challao",
    "province": "Mendoza",
    "description": "Cumbre agreste al norte del Cerro Arco. Filo ventoso con avistaje frecuente de cóndores andinos y vistas a Uspallata.",
    "badgeTitle": "Guardián del Filo",
    "badgeIcon": "⛰️",
    "radiusMeters": 200
  },
  {
    "id": "cerro-aspero",
    "name": "Cerro Áspero",
    "elevationM": 1450,
    "latitude": -32.848,
    "longitude": -68.941,
    "difficulty": "Moderado",
    "zone": "El Challao / Quebrada San Isidro",
    "province": "Mendoza",
    "description": "Pendiente pronunciada con sendero técnico de acarreos y rocas sueltas. Gran reto de fuerza y entrenamiento para trail runners.",
    "badgeTitle": "Furia del Áspero",
    "badgeIcon": "⚡",
    "radiusMeters": 180
  },
  {
    "id": "cerro-comision",
    "name": "Cerro Comisión",
    "elevationM": 1890,
    "latitude": -32.871,
    "longitude": -68.968,
    "difficulty": "Exigente",
    "zone": "Precordillera Central / Frías",
    "province": "Mendoza",
    "description": "Una de las cumbres más emblemáticas de la precordillera mendocina, coronando el hito geodésico superior sobre el Dique Frías y Divisadero Largo.",
    "badgeTitle": "Cumbre de la Comisión",
    "badgeIcon": "🎖️",
    "radiusMeters": 200
  },
  {
    "id": "cerro-gateado",
    "name": "Cerro Gateado",
    "elevationM": 2130,
    "latitude": -32.811,
    "longitude": -68.972,
    "difficulty": "Exigente",
    "zone": "Precordillera Alta / Challao",
    "province": "Mendoza",
    "description": "Cumbre de más de 2.100 msnm con impresionante panorama de la Cordillera de los Andes.",
    "badgeTitle": "Señor del Gateado",
    "badgeIcon": "🏆",
    "radiusMeters": 220
  },
  {
    "id": "cerro-negro-chacras",
    "name": "Cerro Negro de Chacras",
    "elevationM": 1320,
    "latitude": -32.996,
    "longitude": -68.928,
    "difficulty": "Moderado",
    "zone": "Chacras de Coria / Pedemonte",
    "province": "Mendoza",
    "description": "Techo del sistema de senderos de Chacras de Coria con vista panorámica a la cordillera y los viñedos.",
    "badgeTitle": "Señor de Chacras",
    "badgeIcon": "🌵",
    "radiusMeters": 200
  },
  {
    "id": "cerro-lomas-blancas",
    "name": "Cerro Lomas Blancas (Vallecitos)",
    "elevationM": 3650,
    "latitude": -32.992,
    "longitude": -69.395,
    "difficulty": "Alta Montaña",
    "zone": "Cordón del Plata / Vallecitos",
    "province": "Mendoza",
    "description": "Bautismo clásico de alta montaña andina sobre los 3.600 metros con vista al Cerro Plata y los glaciares.",
    "badgeTitle": "Cóndor del Plata",
    "badgeIcon": "🏔️",
    "radiusMeters": 250
  },
  {
    "id": "cerro-tres-marias-sanjuan",
    "name": "Cerro Tres Marías (San Juan)",
    "elevationM": 1050,
    "latitude": -31.547,
    "longitude": -68.698,
    "difficulty": "Moderado",
    "zone": "Dique de Ullum",
    "province": "San Juan",
    "description": "Cumbre insignia de San Juan sobre el Dique de Ullum con cruces de cima y vistas a las aguas esmeralda.",
    "badgeTitle": "Centinela de Ullum",
    "badgeIcon": "☀️",
    "radiusMeters": 180
  },
  {
    "id": "cerro-blanco-sanjuan",
    "name": "Cerro Blanco (San Juan)",
    "elevationM": 1350,
    "latitude": -31.572,
    "longitude": -68.679,
    "difficulty": "Exigente",
    "zone": "Quebrada de Zonda",
    "province": "San Juan",
    "description": "Cima calcárea con vista imponente a la Quebrada de Zonda y el Valle del Tulum.",
    "badgeTitle": "Viento de Zonda",
    "badgeIcon": "💨",
    "radiusMeters": 180
  },
  {
    "id": "cerro-el-leoncito-sanjuan",
    "name": "Cerro El Leoncito (San Juan)",
    "elevationM": 2500,
    "latitude": -31.815,
    "longitude": -69.332,
    "difficulty": "Moderado",
    "zone": "Parque Nacional El Leoncito",
    "province": "San Juan",
    "description": "Cumbre astronómica con vista diáfana a la Cordillera de Ansilta y los telescopios de CASLEO.",
    "badgeTitle": "Guardián del Cielo Diáfano",
    "badgeIcon": "🔭",
    "radiusMeters": 200
  },
  {
    "id": "cerro-ovejas-sanluis",
    "name": "Cerro de las Ovejas (Techo de San Luis)",
    "elevationM": 2294,
    "latitude": -32.378,
    "longitude": -64.948,
    "difficulty": "Moderado",
    "zone": "Sierra de Comechingones / Merlo",
    "province": "San Luis",
    "description": "Techo geográfico de la provincia de San Luis en el límite con Córdoba, dominando el Valle del Conlara.",
    "badgeTitle": "Rey de Comechingones",
    "badgeIcon": "👑",
    "radiusMeters": 200
  },
  {
    "id": "cerro-tomolasta-sanluis",
    "name": "Cerro Tomolasta (San Luis)",
    "elevationM": 2018,
    "latitude": -32.805,
    "longitude": -66.115,
    "difficulty": "Moderado",
    "zone": "La Carolina / Sierras Centrales",
    "province": "San Luis",
    "description": "Cumbre volcánica aurífera sobre el pueblo minero de La Carolina con observatorio en la cima.",
    "badgeTitle": "Corona de Oro de Tomolasta",
    "badgeIcon": "⛏️",
    "radiusMeters": 200
  },
  {
    "id": "cerro-valle-piedra-sanluis",
    "name": "Cerro Valle de Piedra (San Luis)",
    "elevationM": 1450,
    "latitude": -32.242,
    "longitude": -66.252,
    "difficulty": "Moderado",
    "zone": "Potrero de los Funes",
    "province": "San Luis",
    "description": "Balcón granítico cumbrero con vista panorámica completa al lago de Potrero de los Funes.",
    "badgeTitle": "Centinela de Potrero",
    "badgeIcon": "🏞️",
    "radiusMeters": 180
  }
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
    "id": "badge-primera-cumbre",
    "title": "Bautismo de Cumbre",
    "description": "Conquistaste tu primera cima registrada en Cuyo.",
    "icon": "🥾",
    "unlocked": true,
    "unlockedAt": "Ayer",
    "requirement": "Hacer 1 cumbre"
  },
  {
    "id": "badge-gloria-urbana",
    "title": "Corona de la Gloria",
    "description": "Hiciste cumbre en el Monumento del Cerro de la Gloria.",
    "icon": "🦅",
    "unlocked": true,
    "unlockedAt": "Ayer",
    "requirement": "Hacer cumbre en Cerro de la Gloria"
  },
  {
    "id": "badge-centinela-arco",
    "title": "Cazador del Arco",
    "description": "Alcanzaste las míticas antenas del Cerro Arco (1.680 m).",
    "icon": "🏹",
    "unlocked": false,
    "requirement": "Hacer cumbre en Cerro Arco"
  },
  {
    "id": "badge-vallecitos-plata",
    "title": "Iniciación Cordón del Plata",
    "description": "Alcanzaste los 3.650 msnm en la cumbre del Cerro Lomas Blancas.",
    "icon": "🏔️",
    "unlocked": false,
    "requirement": "Hacer cumbre en Cerro Lomas Blancas"
  },
  {
    "id": "badge-sanjuan-tres-marias",
    "title": "Centinela de Ullum",
    "description": "Conquistaste el mítico filo del Cerro Tres Marías en San Juan.",
    "icon": "☀️",
    "unlocked": false,
    "requirement": "Hacer cumbre en Cerro Tres Marías"
  },
  {
    "id": "badge-techo-san-luis",
    "title": "Techo de San Luis",
    "description": "Hiciste cumbre en el Cerro de las Ovejas (2.294 m), punto más alto de San Luis.",
    "icon": "👑",
    "unlocked": false,
    "requirement": "Hacer cumbre en Cerro de las Ovejas"
  },
  {
    "id": "badge-minero-tomolasta",
    "title": "Corona de Oro de Tomolasta",
    "description": "Coronaste el Cerro Tomolasta sobre el pueblo minero de La Carolina.",
    "icon": "⛏️",
    "unlocked": false,
    "requirement": "Hacer cumbre en Cerro Tomolasta"
  },
  {
    "id": "badge-maestro-precordillera",
    "title": "Maestro de Cumbres Cuyanas",
    "description": "Conquistaste 3 o más cumbres del Pasaporte de Cuyo.",
    "icon": "🎖️",
    "unlocked": false,
    "requirement": "Hacer 3 cumbres"
  },
  {
    "id": "badge-desnivel-oro",
    "title": "Señor del Desnivel (+1.000m)",
    "description": "Superaste los 1.000 metros de desnivel vertical acumulado.",
    "icon": "📈",
    "unlocked": false,
    "requirement": "+1.000m de desnivel acumulado"
  }
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

export const INITIAL_COMMUNITY_ROUTES: RouteItem[] = [
  {
    id: 'route-comunidad-filo-condores',
    name: 'Filo de los Cóndores & Vistas Potrerillos',
    zone: 'Potrerillos & El Salto',
    regionId: 'potrerillos',
    type: 'trekking',
    distanceKm: 6.8,
    elevationGainM: 420,
    difficulty: 'Moderado',
    surface: 'Ripio/Tierra',
    strokeColor: '#00E676',
    isCircular: true,
    isCommunityCreated: true,
    createdAt: 'Ayer',
    description: 'Sendero panorámico descubierto y documentado por senderistas de Mendoza. Remonta el filo pedemontano con vistas de 360° al espejo de agua de Potrerillos y al imponente Cordón del Plata nevado. Terreno de acarreo suave con avistaje frecuente de cóndores andinos.',
    recommendedSeason: 'Todo el año (en verano salir temprano antes de las 9:00 AM)',
    equipmentTips: 'Llevar mínimo 2 litros de agua, bastones de trekking recomendados para el descenso y protección solar completa.',
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
    ],
    author: {
      name: 'Valentina Rossi (Andinista)',
      role: 'Comunidad ViaTrek Mendoza',
      applauseCount: 42,
      commentsCount: 9,
      avatar: 'VR',
    },
    legality: {
      status: 'libre',
      badgeText: '🟢 Sendero Libre Multimodal',
      tagColor: '#00E676',
      allowedModes: { trekking: true, bicycle: true, moto: false },
      priorityRule: 'Peatón > Bici',
      authority: 'Municipalidad de Luján de Cuyo',
    },
    elevationProfile: {
      minElevM: 1420,
      maxElevM: 1840,
      elevationGainM: 420,
      points: [1420, 1480, 1560, 1650, 1740, 1820, 1840, 1750, 1630, 1510, 1420],
    },
    coordinates: [
      { latitude: -32.9650, longitude: -69.2150 },
      { latitude: -32.9680, longitude: -69.2190 },
      { latitude: -32.9710, longitude: -69.2240 },
      { latitude: -32.9750, longitude: -69.2290 },
      { latitude: -32.9790, longitude: -69.2330 },
      { latitude: -32.9820, longitude: -69.2380 },
      { latitude: -32.9860, longitude: -69.2420 },
      { latitude: -32.9810, longitude: -69.2370 },
      { latitude: -32.9730, longitude: -69.2270 },
      { latitude: -32.9650, longitude: -69.2150 },
    ],
    waypoints: [
      { title: 'Trailhead Filo', icon: '🏁', latitude: -32.9650, longitude: -69.2150, description: 'Inicio de huella sobre RP 89' },
      { title: 'Mirador del Cóndor', icon: '👁️', latitude: -32.9750, longitude: -69.2290, description: 'Punto panorámico sobre el dique' },
      { title: 'Cumbrecita Filo Alto', icon: '⛰️', latitude: -32.9860, longitude: -69.2420, description: 'Cota máxima a 1.840 msnm' },
    ],
  },
  {
    id: 'route-comunidad-quebrada-san-isidro',
    name: 'Quebrada de San Isidro & Cascadas Ocultas',
    zone: 'El Challao & Arco',
    regionId: 'challao_arco',
    type: 'trekking',
    distanceKm: 5.4,
    elevationGainM: 310,
    difficulty: 'Fácil',
    surface: 'Mixto',
    strokeColor: '#00E5FF',
    isCircular: false,
    isCommunityCreated: true,
    createdAt: 'Hace 3 días',
    description: 'Aventura clásica precordillerana por el lecho del arroyo San Isidro. Se transita entre paredones rojizos, pozas de agua clara y vegetación autóctona de jarillas y chañares. Ideal para ir con amigos o niños.',
    recommendedSeason: 'Todo el año (evitar días de pronóstico de tormenta aluvional en cuenca alta)',
    equipmentTips: 'Calzado que pueda mojarse o secado rápido, gorra y cámara de fotos.',
    photos: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    ],
    author: {
      name: 'Lucas Almada',
      role: 'Guía Trekker Precordillera',
      applauseCount: 37,
      commentsCount: 6,
      avatar: 'LA',
    },
    legality: {
      status: 'libre',
      badgeText: '🟢 Huella Recreativa Libre',
      tagColor: '#00E676',
      allowedModes: { trekking: true, bicycle: true, moto: false },
      priorityRule: 'Peatón prioritario',
      authority: 'Municipalidad de Las Heras',
    },
    elevationProfile: {
      minElevM: 1100,
      maxElevM: 1410,
      elevationGainM: 310,
      points: [1100, 1150, 1210, 1270, 1330, 1380, 1410],
    },
    coordinates: [
      { latitude: -32.8350, longitude: -68.9450 },
      { latitude: -32.8320, longitude: -68.9500 },
      { latitude: -32.8290, longitude: -68.9560 },
      { latitude: -32.8260, longitude: -68.9620 },
      { latitude: -32.8230, longitude: -68.9680 },
      { latitude: -32.8200, longitude: -68.9740 },
    ],
    waypoints: [
      { title: 'Puerta Quebrada San Isidro', icon: '🏁', latitude: -32.8350, longitude: -68.9450, description: 'Entrada desde el puesto base' },
      { title: 'Primer Pozón de Agua', icon: '💧', latitude: -32.8290, longitude: -68.9560, description: 'Pausa fresca y sombra' },
      { title: 'Salto de Agua Final', icon: '🌊', latitude: -32.8200, longitude: -68.9740, description: 'Cascada natural entre farallones' },
    ],
  },
  {
    id: 'route-comunidad-singletrack-secreto',
    name: 'Singletrack Flow del Álamo (MTB)',
    zone: 'Chacras de Coria',
    regionId: 'chacras',
    type: 'sendero_mtb',
    distanceKm: 7.2,
    elevationGainM: 290,
    difficulty: 'Técnico',
    surface: 'Ripio/Tierra',
    strokeColor: '#FF6D00',
    isCircular: true,
    isCommunityCreated: true,
    createdAt: 'Hace 1 semana',
    description: 'Circuito con excelente flow, peraltes de tierra arcillosa y curvas cerradas marcado por bikers mendocinos. Conecta la subida del Álamo con bajadas rápidas hacia la Chiara Yacopini.',
    recommendedSeason: 'Otoño, Invierno y Primavera. Evitar luego de lluvias intensas por barro arcilloso.',
    equipmentTips: 'Casco obligatorio, cubiertas tubeless antipinchazos por espinas de algarrobo y repuesto de cámara.',
    photos: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
    ],
    author: {
      name: 'Mariano Biker',
      role: 'MTB Chacras Club',
      applauseCount: 56,
      commentsCount: 14,
      avatar: 'MB',
    },
    legality: {
      status: 'compartido_precaucion',
      badgeText: '🟡 Sendero Compartido Bici / Peatón',
      tagColor: '#FFD600',
      allowedModes: { trekking: true, bicycle: true, moto: false },
      priorityRule: 'Ceder paso a senderistas que suben',
      authority: 'Municipalidad de Luján de Cuyo',
    },
    elevationProfile: {
      minElevM: 980,
      maxElevM: 1270,
      elevationGainM: 290,
      points: [980, 1040, 1120, 1210, 1270, 1220, 1130, 1050, 980],
    },
    coordinates: [
      { latitude: -33.0035, longitude: -68.8980 },
      { latitude: -33.0060, longitude: -68.9020 },
      { latitude: -33.0090, longitude: -68.9070 },
      { latitude: -33.0120, longitude: -68.9110 },
      { latitude: -33.0150, longitude: -68.9150 },
      { latitude: -33.0180, longitude: -68.9190 },
      { latitude: -33.0140, longitude: -68.9120 },
      { latitude: -33.0080, longitude: -68.9040 },
      { latitude: -33.0035, longitude: -68.8980 },
    ],
  },
];

export const INITIAL_COMMUNITY_POIS: POIItem[] = [
  {
    id: 'poi-comunidad-cascada-el-salto',
    name: 'Cascada Secreta de la Angostura (El Salto)',
    category: 'cascada',
    icon: '🌊',
    color: '#00E5FF',
    latitude: -32.9980,
    longitude: -69.2550,
    altitudeM: 1850,
    isCommunityCreated: true,
    createdAt: 'Hace 2 días',
    description: 'Hermosa caída de agua de deshielo pura oculta entre los farallones de la quebrada alta de El Salto. Ideal para refrescarse y tomar fotografías del valle.',
    tips: 'El acceso final requiere pisar rocas húmedas. Llevar calzado con suela antideslizante y respetar el caudal.',
    photos: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    author: {
      name: 'Camila P. (Trekking Mendoza)',
      role: 'Comunidad ViaTrek',
      applauseCount: 29,
      avatar: 'CP',
    },
  },
  {
    id: 'poi-comunidad-mirador-cerro-negro',
    name: 'Mirador Ojo del Cóndor (Filo Challao)',
    category: 'mirador',
    icon: '👁️',
    color: '#FFD700',
    latitude: -32.8420,
    longitude: -68.9600,
    altitudeM: 1520,
    isCommunityCreated: true,
    createdAt: 'Ayer',
    description: 'Punto panorámico de cornisa con vista despejada a toda la ciudad de Mendoza y a la precordillera norte. Frecuente avistamiento de cóndores planeando en corrientes térmicas.',
    tips: 'Llevar binoculares o cámara con zoom. Al atardecer la vista de las luces del Gran Mendoza es imperdible.',
    photos: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    ],
    author: {
      name: 'Federico M.',
      role: 'Observador de Aves & Montañista',
      applauseCount: 21,
      avatar: 'FM',
    },
  },
  {
    id: 'poi-comunidad-vertiente-puesto-sauce',
    name: 'Vertiente Puesto El Sauce (Agua Fresca)',
    category: 'vertiente',
    icon: '💧',
    color: '#00E676',
    latitude: -33.0010,
    longitude: -68.9280,
    altitudeM: 1210,
    isCommunityCreated: true,
    createdAt: 'Hace 4 días',
    description: 'Vertiente natural de montaña protegida por sauces criollos con piletón de piedra rústica. Punto clave de hidratación para senderistas y ciclistas de Chacras.',
    tips: 'Agua pura y fresca. Filtrar o pastilla potabilizadora recomendada antes de consumir.',
    photos: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
    ],
    author: {
      name: 'Gonzalo Andino',
      role: 'Comunidad ViaTrek',
      applauseCount: 19,
      avatar: 'GA',
    },
  },
];

